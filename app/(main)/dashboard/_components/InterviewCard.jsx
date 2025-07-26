import React from 'react';
import moment from 'moment';
import { Button } from '@/components/ui/button';
import { Copy, Send, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { supabase } from '@/services/supabaseClient';

function InterviewCard({ interview, showDetail = false }) {
  const url = `${process.env.NEXT_PUBLIC_HOST_URL}/${interview?.interview_id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    toast('Interview link copied to clipboard');
  };

  const onSend = () => {
    window.location.href = `mailto:account@amaanahmed.com?subject=Intervue Interview Link&body=Interview Link: ${url}`;
  };

  return (
    <div className="p-5 border rounded-xl shadow-sm bg-white mb-4 space-y-4">
      {/* Header: Date and Dot */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="h-2 w-2 bg-green-500 rounded-full" />
        <span>{moment(interview?.created_at).format('DD MMM YYYY')}</span>
      </div>

      {/* Job Position */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800">
          {interview?.jobPosition || 'Untitled Interview'}
        </h3>

        {interview?.duration && (
          <div className="mt-1 flex justify-between text-sm text-gray-500">
            <p>{interview.duration}</p>
            {showDetail && (
              <p>
                {interview?.['interview-feedback']?.length || 0} Candidates
              </p>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      {showDetail && (
        <>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 flex items-center gap-2"
              onClick={copyLink}
            >
              <Copy className="h-4 w-4" />
              Copy Link
            </Button>
            <Button
              onClick={onSend}
              className="flex-1 flex items-center gap-2 bg-blue-600 hover:bg-white hover:font-black text-white hover:text-black"
            >
              <Send className="h-4 w-4" />
              Send
            </Button>
          </div>
          <Link href={`/scheduled-interview/${interview?.interview_id}/details`}>
            <Button variant="ghost" className="flex items-center gap-2 mt-2">
              View Detail
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </>
      )}
    </div>
  );
}

export default InterviewCard;
