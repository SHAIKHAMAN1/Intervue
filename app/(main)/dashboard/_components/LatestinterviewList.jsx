'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@/app/Provider';
import { Button } from '@/components/ui/button';
import { supabase } from '@/services/supabaseClient';
import { Video, Loader2 } from 'lucide-react';
import InterviewCard from './InterviewCard';
import { toast } from 'sonner';

function LatestInterviewsList() {
  const [interviewList, setInterviewList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      fetchInterviewList();
    }
  }, [user]);

  const fetchInterviewList = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Interviews')
      .select('*')
      .eq('userEmail', user?.email)
      .order('id', { ascending: false })
      .limit(6);

    if (error) {
      toast.error('Failed to load interviews.');
      console.error('Error fetching interviews:', error);
    } else {
      setInterviewList(data || []);
    }
    setLoading(false);
  };

  const handleCreateNew = () => {
    // You can navigate to the interview creation page
    toast.info("Redirect to interview creation page...");
    // Example: router.push('/create-interview')
  };

  return (
    <div className="my-8 bg-white rounded-2xl border shadow-sm p-6">
      <h2 className="font-semibold text-2xl mb-6 text-gray-800">Previously Created Interviews</h2>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-10">
          <Loader2 className="animate-spin w-10 h-10 text-primary mb-2" />
          <p className="text-sm text-muted-foreground">Loading your interviews...</p>
        </div>
      ) : interviewList.length === 0 ? (
        <div className="p-8 text-center border rounded-xl bg-muted/20">
          <Video className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">No interviews found</h2>
          <p className="mb-4 text-sm text-gray-600">Start by creating your first interview now.</p>
          <Button size="lg" onClick={handleCreateNew}>Create New Interview</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {interviewList.map((interview, index) => (
            <InterviewCard interview={interview} key={interview.id || index} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LatestInterviewsList;
