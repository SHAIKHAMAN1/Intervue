"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/Provider';
import InterviewCard from '../dashboard/_components/InterviewCard';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';

function ScheduledInterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      GetInterviewList();
    }
  }, [user]);

  const GetInterviewList = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Interviews")
      .select('jobPosition,duration,interview_id,created_at,interview-feedback(userEmail)')
      .eq('userEmail', user?.email)
      .order('id', { ascending: false })
      .limit(8)
    if (error) {
      console.error("Error fetching interview list:", error.message);
      setError(error.message);
      setInterviewList([]);
    } else {
      setInterviewList(data);
    }

    setLoading(false);
  };

  return (
    <div className='p-6 space-y-6 bg-gray-100 rounded-2xl'>
      <h2 className='font-semibold text-xl'>Interview List with Candidate Feedback</h2>

      {loading && (
        <p className="text-muted-foreground">Loading interviews...</p>
      )}

      {!loading && interviewList.length === 0 && (
        <div className="p-8 text-center border rounded-xl bg-muted/20">
          <Video className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">You don't have any interview created!</h2>
          <Button size="lg">Create New Interview</Button>
        </div>
      )}

      {!loading && interviewList.length > 0 && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
          {interviewList.map((interview, index) => (
            <InterviewCard interview={interview} key={index} showDetail={true} />
          ))}
        </div>
      )}

      {error && (
        <div className="text-red-500 mt-4">
          Error loading interviews: {error}
        </div>
      )}
    </div>
  );
}

export default ScheduledInterview;
