'use client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress';
import FormContainer from './_components/FormContainer';
import QuestionList from './_components/QuestionList';
import { toast } from 'sonner';
import InterviewLink from './_components/InterviewLink';
import { useUser } from '@/app/Provider';
function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [interviewId, setInterviewId] = useState(null);
  const user = useUser();
  const onCreateLink = (interview_id) => {
    setInterviewId(interview_id);
    setStep(step+1); // Move to InterviewLink step
  };

  const onHandleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    console.log("formData", formData);
  };

  const onGoToNext = () => {
    if(user?.credits<=0){
      toast("Credits Limit Reached!!")
      return;
    }
    const { jobPosition, jobDescription, duration, type } = formData;

    if (!jobPosition?.trim()) {
      toast.error("Job Position is required!");
      return;
    }
    if (!jobDescription?.trim()) {
      toast.error("Job Description is required!");
      return;
    }
    if (!duration) {
      toast.error("Please select a Duration!");
      return;
    }
    if (!type || type.length === 0) {
      toast.error("Select at least one Interview Type!");
      return;
    }

    // Move to next step
    setStep(step + 1);
  };

  return (
    <div className='md:px-24 lg:px-44 xl:px-56 gap-4 mx-3'>
      <div className='flex items-center gap-2'>
        <ArrowLeft onClick={() => router.back()} className='my-1 cursor-pointer' />
        <h2 className='font-semibold text-xl'>Create New Interview</h2>
      </div>

      <Progress value={step * 33.33} className='my-5' />

      {step === 1 ? (
        <FormContainer
          onHandleInputChange={onHandleInputChange}
          GoToNext={onGoToNext}
        />
      ) : step === 2 ? (
        <QuestionList
          formData={formData}
          onCreateLink={onCreateLink}
        />
      ) : step === 3 ? (
        <InterviewLink interview_id={interviewId} formData={formData} />

      ) : null}
    </div>
  );
}

export default CreateInterview;
