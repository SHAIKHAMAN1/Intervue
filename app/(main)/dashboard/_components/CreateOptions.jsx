'use client';
import React from 'react';
import Link from 'next/link'; // ✅ Import Link
import { CalendarDays, Phone, Video } from 'lucide-react'; // ✅ Import icons

function CreateOptions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Create New Interview */}
      <Link href="/dashboard/create-interview" passHref>
        <div className="p-4 bg-white shadow-md rounded-xl border hover:shadow-lg transition cursor-pointer">
          <div className="flex items-center gap-3 mb-2">
            <Video className="text-blue-500" />
            <h2 className="text-md font-medium">Create New Interview</h2>
          </div>
          <p className="text-sm text-gray-600">
            Create AI interviews and schedule them with candidates
          </p>
        </div>
      </Link>

      {/* Create Phone Screening Call */}
      <div className="p-4 bg-white shadow-md rounded-xl border hover:shadow-lg transition">
        <div className="flex items-center gap-3 mb-2">
          <Phone className="text-blue-500 cursor-pointer" />
          <h2 className="text-md font-medium">Create Phone Screening Call</h2>
        </div>
        <p className="text-sm text-gray-600">
          Schedule phone screening calls with potential candidates
        </p>
      </div>
    </div>
  );
}

export default CreateOptions;
