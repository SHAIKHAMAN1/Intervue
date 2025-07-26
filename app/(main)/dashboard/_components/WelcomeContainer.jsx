'use client';
import React from 'react';
import Image from 'next/image';
import { useUser } from '@/app/Provider';

function WelcomeContainer() {
  const { user } = useUser();

  // Fallback avatar
  const profileImage =
    user?.picture && user.picture.trim() !== ''
      ? user.picture
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user?.name || user?.email || 'User'
        )}`;

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center bg-gray-100 p-5 rounded-2xl shadow-md w-full">
        <div>
          <h2 className="text-xl font-medium">
            {user
              ? `Welcome back! ${user.name || user.email}`
              : 'Loading...'}
          </h2>
          <h2 className="font-bold text-gray-700">
            AI-Driven Interviews, Hassle-Free Hiring
          </h2>
        </div>

        <div className="flex-shrink-0">
          {user && (
            <Image
              src={profileImage}
              alt="User Avatar"
              width={60}
              height={60}
              className="rounded-full border border-gray-300 shadow"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default WelcomeContainer;
