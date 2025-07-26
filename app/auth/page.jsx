'use client'
import React from "react";
import Image from "next/image";
import { supabase } from "@/services/supabaseClient";

const Login = () => {
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    })
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4 relative overflow-hidden">
      {/* Decorative Background Blurs */}
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-200 rounded-full opacity-30 blur-[120px] z-0" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-purple-200 rounded-full opacity-30 blur-[120px] z-0" />

      <div className="relative z-10 w-full max-w-md bg-white rounded-3xl shadow-2xl p-10 border border-gray-100 backdrop-blur-sm">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="relative w-20 h-20">
            <Image
              src="/logo.png"
              alt="AiRecruiter Logo"
              fill
              className="object-contain"
            />
          </div>

        </div>

        {/* Illustration */}
        <div className="flex justify-center mb-4">
          <Image
            src="/login.png"
            alt="Login Illustration"
            width={300}
            height={180}
            className="object-contain"
          />
        </div>

        {/* Headings */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome to <span className="text-blue-600">INTERVUE</span>
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Sign in with your Google account to continue
        </p>

        {/* Google Button */}
        <button onClick={signInWithGoogle} className="w-full flex items-center justify-center gap-3 bg-black text-white border border-gray-300 hover:shadow-lg hover:scale-[1.02] active:scale-100 transition-all duration-200 py-2.5 rounded-lg font-medium">
          <img
            src="https://www.gstatic.com/marketing-cms/assets/images/82/9c/5e08f4b14c35b84be1821d200793/about-10things-google.png=s128-fcrop64=1,00000000ffffffff-rw"
            alt="Google Logo"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-6">
          © 2025 <span className="font-semibold text-gray-500">INTERVUE</span>. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
