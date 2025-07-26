"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

function InterviewComplete() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-200 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full text-center"
      >
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 animate-bounce" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Interview Completed</h1>
        <p className="text-gray-600 mb-6">
          Great job! Your virtual interview has been successfully completed.
          You’ll receive personalized feedback shortly.
        </p>
      </motion.div>
    </div>
  );
}

export default InterviewComplete;
