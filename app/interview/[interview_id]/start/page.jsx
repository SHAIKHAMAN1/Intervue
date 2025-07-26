"use client";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Mic, MicOff, Phone, Timer } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "../components/AlertConfirmation";
import { toast } from "sonner";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams, useRouter } from "next/navigation";

function StartInterview() {
  const { interviewInfo } = useContext(InterviewDataContext);
  const vapiRef = useRef(null);
  const feedbackSavedRef = useRef(false);
  const timerRef = useRef(null);

  const [conversation, setConversation] = useState([]);
  const [activeUser, setActiveUser] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const { interview_id } = useParams();
  const router = useRouter();

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  useEffect(() => {
    if (!interviewInfo) return;

    const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY;

    if (!publicKey) {
      console.error("Vapi public key is undefined.");
      toast.error("Vapi key missing. Interview cannot start.");
      return;
    }

    const vapi = new Vapi(publicKey);
    vapiRef.current = vapi;

    let questionList = "";
    interviewInfo?.interviewData?.questionList?.forEach((item) => {
      if (item?.question) questionList += item.question + ", ";
    });

    if (!questionList.trim()) {
      console.warn("Empty or undefined question list.");
      toast.error("No interview questions found.");
      return;
    }

    vapi.on("call-start", () => {
      toast("Call Connected");
      setIsInterviewActive(true);
      startTimer();
    });

    vapi.on("call-end", () => {
      setIsInterviewActive(false);
      stopTimer();

      if (!feedbackSavedRef.current) {
        feedbackSavedRef.current = true;
        generateFeedback();
      }
    });

    vapi.on("speech-start", () => setActiveUser(false));
    vapi.on("speech-end", () => setActiveUser(true));

    vapi.on("message", (message) => {
      if (message?.transcript || message?.conversation) {
        setConversation((prev) => [...prev, message]);
      }
    });

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
You are an AI recruiter interviewing candidates. Begin with a friendly intro. Ask each question from this list one at a time:

${questionList.trim()}

Be engaging, supportive, and provide positive feedback. Wrap up with a summary after 5–7 questions.
          `.trim(),
          },
        ],
      },
    };

    try {
      vapi.start(assistantOptions);
    } catch (error) {
      console.error("Error starting Vapi:", error);
      toast.error("Failed to start the interview.");
    }

    return () => {
      vapi.stop();
      vapi.removeAllListeners();
      stopTimer();
    };
  }, [interviewInfo]);

  const generateFeedback = async () => {
    try {
      setLoading(true);
      const result = await axios.post("/api/ai-feedback", {
        conversation: conversation,
      });

      const content = result?.data?.content;
      const match = content.match(/```json\s*([\s\S]*?)\s*```/);

      if (!match) {
        console.error("Could not extract JSON from response:", content);
        toast.error("Failed to parse feedback response");
        return;
      }

      const FINAL_CONTENT = match[1].trim();
      const parsedFeedback = JSON.parse(FINAL_CONTENT);

      const { error } = await supabase
        .from("interview-feedback")
        .insert([
          {
            userName: interviewInfo?.userName,
            userEmail: interviewInfo?.userEmail,
            interview_id: interview_id,
            feedback: parsedFeedback,
            recommended:
              parsedFeedback?.feedback?.recommendation === "Yes",
          },
        ]);

      if (error) {
        console.error("Supabase insert error:", error);
        toast.error("Failed to save interview feedback");
        return;
      }

      router.replace(`/interview/${interview_id}/completed`);
    } catch (err) {
      console.error("Error generating feedback:", err);
      toast.error("Something went wrong generating feedback");
    } finally {
      setLoading(false);
    }
  };

  const toggleMic = () => {
    if (isMicOn) {
      vapiRef.current?.mute();
      toast("Microphone muted");
    } else {
      vapiRef.current?.unmute();
      toast("Microphone unmuted");
    }
    setIsMicOn(!isMicOn);
  };

  const stopInterview = () => {
    vapiRef.current?.stop();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-gray-100 to-white text-gray-800">
      <header className="w-full px-6 py-4 flex justify-between items-center shadow bg-white border-b">
        <h1 className="text-2xl font-bold tracking-tight">AI Interview</h1>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Timer className="w-5 h-5" />
          {formatTime(elapsedTime)}
        </div>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 flex-grow">
        <section className="relative bg-white p-6 rounded-2xl shadow-md border text-center flex flex-col items-center justify-center space-y-4">
          <div className="relative w-20 h-20 flex items-center justify-center">
            {activeUser === false && isInterviewActive && (
              <span className="AI absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75 animate-ping"></span>
            )}
            <Image
              src="/ai.png"
              alt="AI Recruiter"
              width={80}
              height={80}
              className="rounded-full object-cover shadow z-10"
            />
          </div>
          <h3 className="text-lg font-semibold">AI Recruiter</h3>
          <span className="text-xs text-gray-500">Virtual Interview Assistant</span>
        </section>

        <section className="relative bg-white p-6 rounded-2xl shadow-md border text-center flex flex-col items-center justify-center space-y-4">
          <div className="relative w-20 h-20 flex items-center justify-center">
            {activeUser === true && isInterviewActive && (
              <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70 animate-ping"></span>
            )}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold shadow z-10">
              {interviewInfo?.userName?.[0]?.toUpperCase() || "U"}
            </div>
          </div>
          <h3 className="text-lg font-semibold">
            {interviewInfo?.userName || "User"}
          </h3>
          <span className="text-xs text-gray-500">
            {activeUser && isInterviewActive ? "Speaking..." : "Waiting..."}
          </span>
        </section>
      </main>

      <footer className="flex flex-col items-center justify-center py-6">
        <div className="flex gap-6 items-center">
          <button
            onClick={toggleMic}
            className={`h-14 w-14 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
              isMicOn
                ? "bg-green-100 text-green-700 hover:bg-green-200"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
            aria-label="Toggle Microphone"
          >
            {isMicOn ? <Mic /> : <MicOff />}
          </button>

          <AlertConfirmation stopInterview={stopInterview}>
            <div
              className={`h-14 w-14 rounded-full flex items-center justify-center shadow-md transition duration-300 cursor-pointer ${
                loading ? "bg-gray-400 animate-pulse" : "bg-red-500 hover:bg-red-600"
              } text-white`}
              aria-label="End Call"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Phone />
              )}
            </div>
          </AlertConfirmation>
        </div>
        <p className="mt-4 text-sm text-gray-500 italic">Interview in progress...</p>
      </footer>
    </div>
  );
}

export default StartInterview;
