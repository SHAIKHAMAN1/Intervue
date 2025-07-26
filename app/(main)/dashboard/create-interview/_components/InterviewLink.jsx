'use client';

import React from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Calendar, Clock, Copy, List, Mail, Send, ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function InterviewLink({ interview_id, formData }) {
  const GetInterviewUrl = () => {
    const url = process.env.NEXT_PUBLIC_HOST_URL + '/' + interview_id;
    return url;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(GetInterviewUrl());
    toast('Link copied')
  };

  return (
    <div className='flex flex-col items-center w-full justify-center'>
      {/* Use <video> to play animation once if needed */}
      <Image alt='check' src={'/check.gif'} width={100} height={100} className='w-[80px] h-[80px]' />

      <h2 className='font-semibold mt-2'>Your Interview is Ready!</h2>
      <p className='mt-2 text-center'>Share this link with your candidates to start the interview process</p>

      <div className='w-full p-7 mt-6 rounded-xl bg-gray-100 shadow-md flex flex-col max-w-xl'>
        <div className='flex justify-between items-center'>
          <h2 className='px-1 font-semibold'>Interview Link</h2>
          <h2 className='p-1 px-2 text-blue-400 bg-blue-50 rounded-md'>Valid for 30 days</h2>
        </div>

        <div className='mt-3 flex my-3 gap-3 items-center'>
          <Input defaultValue={GetInterviewUrl(interview_id)} disabled />
          <Button onClick={handleCopy}><Copy className='w-4 h-4 mr-1' /> Copy Link</Button>
        </div>

        <hr className='my-5' />

        <div className='flex gap-5'>
          <h2 className='text-xs text-gray-500 flex gap-2 items-center'>
            <Clock className='h-4 w-4' />
            Duration: {formData?.duration || '30 MIN'}
          </h2>
          <h2 className='text-xs text-gray-500 flex gap-2 items-center'>
            <List className='h-4 w-4' />
            Questions: {formData?.numberOfQuestions || '10'}
          </h2>
        </div>
      </div>

      <div className='mt-7 bg-gray-100 p-5 rounded-lg gap-5 w-full max-w-xl'>
        <div className='flex flex-col mb-4'>
          <h2 className='font-semibold flex gap-1 items-center'>
            Share via <Send className='w-4 h-4' />
          </h2>
        </div>

        <div className='flex gap-3 flex-wrap'>
          <Button variant='outline'><Mail className='w-4 h-4 mr-1' /> Email</Button>
          <Button variant='outline'><Mail className='w-4 h-4 mr-1' /> WhatsApp</Button>
          <Button variant='outline'><Mail className='w-4 h-4 mr-1' />LinkedIn</Button>
        </div>
      </div>
         <div className=' w-full flex justify-between mt-6'>
          <Button variant='outline'><ArrowLeft className='w-4 h-4 mr-1' /> Back to Dashboard</Button>
          <Button><Plus className='w-4 h-4 mr-1' /> Create New Interview</Button>
        </div>
      
    </div>
  );
}

export default InterviewLink;
