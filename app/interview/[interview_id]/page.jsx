'use client';

import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { Clock, Info, Loader2Icon, Video } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { InterviewDataContext } from '@/context/InterviewDataContext';
import QuestionList from '@/app/(main)/dashboard/create-interview/_components/QuestionList';

function Interview() {
  const { interview_id } = useParams();
  const router = useRouter();
  const[userEmail,setUserEmail]=useState('')
  const [interviewDetails, setInterviewDetails] = useState(null);
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(true);

  const { setInterviewInfo } = useContext(InterviewDataContext);

  useEffect(() => {
    if (interview_id) {
      GetInterviewDetails();
    }
  }, [interview_id]);

  const GetInterviewDetails = async () => {
    setLoading(true);

    const { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('jobPosition, jobDescription, duration, type')
      .eq('interview_id', interview_id);

    if (error) {
      console.error('Supabase error:', error);
    } else if (Interviews && Interviews.length > 0) {
      setInterviewDetails(Interviews[0]);
    }

    setLoading(false);
  };

  const onJoinInterview = async () => {
    setLoading(true);

    const { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('*')
      .eq('interview_id', interview_id);

    if (error) {
      console.error('Supabase error:', error);
      setLoading(false);
      return;
    }

    const interviewData = Interviews?.[0];
    if (interviewData) {
      setInterviewInfo({
        userName:fullName,
        userEmail: userEmail,
        interviewData:interviewData
      }); // ✅ context setter
      router.push(`/interview/${interview_id}/start`);
    }
    console.log(interviewData)
    
    setLoading(false);
  };

  return (
    <div className="px-10 md:px-28 lg:px-48 xl:px-64 mt-20">
      <div className="flex flex-col justify-center items-center p-7 lg:px-33 xl:px-52 border-2 mb-40 rounded-2xl shadow-xl bg-white">
        <Image
          src="/logo.png"
          width={160}
          height={160}
          alt="logo"
          className="py-5"
          priority
        />

        <h2 className="font-semibold text-lg">AI-Powered Interview Platform</h2>

        <img
          src="/interview.png"
          alt="Interview"
          className="w-[300px] mt-3 rounded-lg"
          style={{ imageRendering: 'auto' }}
        />

        <h2 className="font-semibold text-xl mt-2">
          {loading ? 'Loading...' : interviewDetails?.jobPosition || 'Not Found'}
        </h2>

        <h2 className="flex gap-2 items-center mt-2 text-gray-600">
          <Clock className="h-4 w-4" />
          {loading ? '--' : interviewDetails?.duration || '--'} Minutes
        </h2>

        <div className="w-full mt-4">
          <h2 className="font-semibold mb-1">Enter your full name</h2>
          <Input
            placeholder="e.g John Wick"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="w-full mt-4">
          <h2 className="font-semibold mb-1">Enter your Email</h2>
          <Input
            placeholder="e.g john@gmail.com"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        <div className="bg-blue-200 p-4 mt-4 border border-blue-600 rounded-2xl w-full">
          <h2 className="font-bold flex gap-2">
            <Info /> Before you begin
          </h2>
          <ul className="px-2 mt-2 list-disc list-inside">
            <li>Ensure you have a stable internet connection</li>
            <li>Use a quiet environment</li>
            <li>Use a working microphone and webcam</li>
          </ul>
        </div>

        <Button
          onClick={onJoinInterview}
          disabled={loading || !fullName}
          className="mt-5 w-full text-white bg-gradient-to-r from-cyan-500 to-indigo-500 hover:opacity-90 transition"
        >
          <Video className="mr-2 h-4 w-4" />
          {loading ? <Loader2Icon className="animate-spin ml-2 h-4 w-4" /> : 'Join Interview'}
        </Button>
      </div>
    </div>
  );
}

export default Interview;
