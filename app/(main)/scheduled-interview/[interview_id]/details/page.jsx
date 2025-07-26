"use client"
import { useUser } from '@/app/Provider';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { supabase } from '@/services/supabaseClient';
import InterviewDetailContainer from './_components/InterviewDetailContainer';
import CandidateList from './_components/CandidateList';
function interviewDetail() {
    const {interview_id}=useParams();
    const {user} = useUser();
    const [interviewDetail,setInterviewDetail]=useState();
    useEffect(()=>{
    user&&GetInterviewDetail();
    },[user])
   const GetInterviewDetail = async () => { 
       const result = await supabase
         .from("Interviews")
         .select(`jobPosition,jobDescription,type,questionList,duration,interview_id,created_at,interview-feedback(userEmail,userName,feedback,created_at)`)
         .eq('userEmail', user?.email)
         .eq('interview_id',interview_id)
         setInterviewDetail(result?.data[0])
         console.log(result)
     };
  return (
    <div className='p-6  bg-gray-100 rounded-2xl'>
      <h2 className='font-semibold text-xl'>Interview Detail</h2>
      <InterviewDetailContainer interviewDetail={interviewDetail} />
      <CandidateList candidateList={interviewDetail?.['interview-feedback']} />
    </div>
  )
}

export default interviewDetail
