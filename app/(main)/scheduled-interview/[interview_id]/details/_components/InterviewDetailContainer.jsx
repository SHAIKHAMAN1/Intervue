import { Calendar, Clock, MessageCircleQuestion } from 'lucide-react';
import React from 'react';
import moment from 'moment';

function InterviewDetailContainer({ interviewDetail }) {
  const typeArray = interviewDetail?.type ? JSON.parse(interviewDetail.type) : [];

  return (
    <div className="bg-white p-6 mt-4 rounded-2xl shadow-md space-y-6 border border-gray-100">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-900">
        {interviewDetail?.jobPosition || 'Untitled Interview'}
      </h2>

      {/* Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-600">
        <div className="space-y-1">
          <p className="text-gray-500">Duration</p>
          <div className="flex items-center gap-2 font-medium text-gray-800">
            <Clock className="w-4 h-4 text-indigo-500" />
            {interviewDetail?.duration || 'N/A'}
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-gray-500">Created On</p>
          <div className="flex items-center gap-2 font-medium text-gray-800">
            <Calendar className="w-4 h-4 text-green-500" />
            {moment(interviewDetail?.created_at).format('DD MMM YYYY')}
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-gray-500">Type</p>
          <div className="flex items-center gap-2 font-medium text-gray-800">
            <Clock className="w-4 h-4 text-blue-500" />
            {typeArray?.[0] || 'N/A'}
          </div>
        </div>
      </div>

      {/* Job Description */}
      <div className="pt-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Job Description</h3>
        <p className="text-gray-700 leading-6 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
          {interviewDetail?.jobDescription || 'No description provided.'}
        </p>
      </div>

      {/* Questions */}
      <div className="pt-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Interview Questions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {interviewDetail?.questionList?.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition border border-gray-100"
            >
              <MessageCircleQuestion className="w-4 h-4 text-indigo-600 mt-1" />
              <p className="text-sm text-gray-700 leading-5">
                <span className="font-medium mr-1">{index + 1}.</span> {item?.question}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InterviewDetailContainer;
