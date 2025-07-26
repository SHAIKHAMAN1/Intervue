'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle } from 'lucide-react';

function CandidateFeedbackDialog({ candidate }) {
  const feedback = candidate?.feedback?.feedback;

  if (!feedback) return null;

  const rating = feedback?.rating || {};
  const overall =
    (rating.technicalSkills +
      rating.communication +
      rating.problemSolving +
      rating.experience) /
    4;

  const getRatingColor = (score) => {
    if (score >= 7) return 'text-green-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Report</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Candidate Interview Report
          </DialogTitle>
          <DialogDescription asChild>
            <div className="mt-4 space-y-6 text-gray-700">

              {/* Candidate Header */}
              <div className="flex items-center justify-between bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 text-white flex items-center justify-center text-lg font-semibold">
                    {candidate?.userName?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {candidate?.userName || 'Unnamed Candidate'}
                    </h2>
                    <p className="text-sm text-gray-600">{candidate?.userEmail}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Overall Rating</div>
                  <div className="text-lg font-bold text-blue-600">
                    ★ {overall.toFixed(1)}/10
                  </div>
                </div>
              </div>

              {/* Skill Ratings */}
              <div className="space-y-4">
                {[
                  ['Technical Skills', rating.technicalSkills],
                  ['Communication Skills', rating.communication],
                  ['Problem Solving', rating.problemSolving],
                  ['Experience', rating.experience],
                ].map(([label, value]) => (
                  <div key={label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{label}</span>
                      <span className={`text-sm font-semibold ${getRatingColor(value)}`}>
                        {value}/10
                      </span>
                    </div>
                    <Progress value={value * 10} className="h-2 rounded-full" />
                  </div>
                ))}
              </div>

              {/* Summary */}
              {feedback.summary?.length > 0 && (
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl shadow-sm">
                  <h3 className="font-semibold mb-2 text-gray-800">Interview Summary</h3>
                  <p className="list-disc list-inside space-y-1 text-sm text-gray-700">
                    {feedback?.summary}
                  </p>
                </div>
              )}

              {/* Recommendation */}
              <div
                className={`p-4 rounded-xl border shadow-md flex flex-col gap-1 ${
                  feedback?.Recommendation === 'Yes'
                    ? 'bg-green-50 border-green-200 text-green-700'
                    : 'bg-red-50 border-red-200 text-red-700'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-lg">
                  {feedback?.Recommendation === 'Yes' ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Recommended
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-600" />
                      Not Recommended
                    </>
                  )}
                </div>
                <p className="text-sm">{feedback?.RecommendationMsg}</p>
              </div>

            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CandidateFeedbackDialog;
