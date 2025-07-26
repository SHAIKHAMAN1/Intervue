"use client"
import React, { useState } from 'react'
import InterviewHeader from './components/InterviewHeader'
import { InterviewDataContext } from '@/context/InterviewDataContext'
import { Toaster } from 'sonner';

function Interviewlayout({children}) {
  const [interviewInfo,setInterviewInfo] = useState();
  return (
    <InterviewDataContext.Provider value={{interviewInfo,setInterviewInfo}}>
    <div className='bg-secondary ' >
      <InterviewHeader/>
      {children}
      <Toaster/>
    </div>
    
    </InterviewDataContext.Provider>
  )
}

export default Interviewlayout
