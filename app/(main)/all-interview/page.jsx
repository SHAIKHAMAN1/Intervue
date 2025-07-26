'use client';

import { useUser } from '@/app/Provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { Video } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import InterviewCard from '../dashboard/_components/InterviewCard';
import { toast } from 'sonner';

function AllInterview() {
  const [interviewList, setInterviewList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    let { data: Interviews, error } = await supabase
      .from('Interviews')
      .select('*')
      .eq('userEmail', user?.email)
      .order('id', { ascending: false });
      
    if (error) {
      toast.error('Failed to load interviews');
    }

    setInterviewList(Interviews);
  };

  return (
    <div className="p-6 space-y-6 bg-gray-100 rounded-2xl">
      <h2 className="font-semibold text-xl">All Previously Created Interviews</h2>

      {interviewList?.length === 0 ? (
        <div className="p-8 text-center border rounded-xl bg-muted/20">
          <Video className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">
            You don't have any interview created!
          </h2>
          <Button size="lg">Create New Interview</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {interviewList.map((interview, index) => (
            <InterviewCard interview={interview} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AllInterview;
