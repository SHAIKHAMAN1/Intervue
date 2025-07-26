import React from 'react';
import { Button } from '@/components/ui/button';
import CandidateFeedbackDialog from './CandidateFeedbackDialog';

function CandidateList({ candidateList }) {
  const getRatingColor = (score) => {
    if (score >= 7) return 'text-green-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px] rounded-xl mt-4">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Candidates ({candidateList?.length || 0})
        </h2>

        <div className="space-y-4">
          {candidateList?.map((candidate, index) => {
            const rating = candidate?.feedback?.feedback?.rating || {};
            const hasFeedback = Object.keys(rating).length > 0;
            const overall = hasFeedback
              ? (rating.technicalSkills +
                  rating.communication +
                  rating.problemSolving +
                  rating.experience) /
                4
              : null;

            return (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition p-4 rounded-lg"
              >
                {/* Left: Avatar + Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-600 text-white flex items-center justify-center font-bold text-lg">
                    {candidate?.userName?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div className="text-gray-800 text-sm font-medium">
                    <h2 className="text-base">{candidate?.userName || 'Unnamed Candidate'}</h2>
                    <p className="text-gray-500 text-sm">
                      {candidate?.userEmail}
                    </p>
                  </div>
                </div>

                {/* Right: Report Button */}
                <div className="flex gap-3 items-center">
                  {hasFeedback && (
                    <h2 className={`${getRatingColor(overall)} font-semibold`}>
                      ★ {overall.toFixed(1)}/10
                    </h2>
                  )}
                  <CandidateFeedbackDialog candidate={candidate} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CandidateList;
