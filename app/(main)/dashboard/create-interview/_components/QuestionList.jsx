'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2Icon, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { useUser } from '@/app/Provider';
import { supabase } from '@/services/supabaseClient';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';

function QuestionList({ formData, onCreateLink }) {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState([]);
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      generateQuestionList();
    }
  }, [formData]);

  const generateQuestionList = async () => {
    setLoading(true);
    try {
      const result = await axios.post('/api/ai-model', { ...formData });

      const raw = result.data?.content || '';
      const jsonMatch = raw.match(/```json\s*([\s\S]*?)```/);

      if (jsonMatch) {
        const cleanJson = jsonMatch[1].trim();

        try {
          const parsed = JSON.parse(cleanJson);
          setQuestionList(parsed.interviewQuestions || []);
        } catch (parseError) {
          console.error('❌ JSON parse error:', parseError);
          console.log('⚠️ Raw JSON string:', cleanJson);
          toast.error('Invalid JSON returned from AI! Check formatting.');
        }
      } else {
        console.error('⚠️ No valid JSON block found in AI response');
        toast.error('Could not extract questions from AI response!');
      }
    } catch (e) {
      console.error('❌ Error:', e);
      toast.error('Server Error, Try Again!!');
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async () => {
    if (!user) {
      toast.error('User not authenticated!');
      return;
    }

    // ✅ Check for valid credits
    if (Number(user?.credits) <= 0) {
      toast.error('Insufficient credits to generate interview.');
      return;
    }

    setSaveLoading(true);

    try {
      const interview_id = uuidv4();

      // ✅ Step 1: Save interview
      const { data, error } = await supabase
        .from('Interviews')
        .insert([
          {
            ...formData,
            questionList,
            userEmail: user?.email,
            interview_id,
          },
        ])
        .select();

      if (error) {
        console.error('❌ Error saving interview:', error);
        toast.error('Error saving interview data!');
        setSaveLoading(false);
        return;
      }

      console.log('✅ Interview saved:', data);

      // ✅ Step 2: Deduct 1 credit
      const { data: updatedUser, error: creditError } = await supabase
        .from('Users')
        .update({ credits: Number(user?.credits) - 1 })
        .eq('email', user?.email)
        .select()
        .single();

      if (creditError) {
        console.error('❌ Error updating credits:', creditError);
        toast.error('Error updating user credits!');
      } else {
        console.log('✅ Credits updated:', updatedUser);
        toast.success('Interview saved and credits updated!');
      }

      // ✅ Step 3: Navigate to Interview Link
      onCreateLink(interview_id);
    } catch (e) {
      console.error('❌ Exception occurred:', e);
      toast.error('Something went wrong while saving!');
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div>
      {loading && (
        <div className='p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center'>
          <Loader2Icon className='animate-spin' />
          <div>
            <h2>Generating Interview Questions:</h2>
            <p>Our AI is crafting personalized questions based on your job position</p>
          </div>
        </div>
      )}

      {!loading && questionList.length > 0 && (
        <div>
          <QuestionListContainer questionList={questionList} />

          <div className='flex justify-end mt-6'>
            <Button
              onClick={onFinish}
              disabled={saveLoading}
              className={`px-6 py-2 font-medium rounded-xl transition ${
                saveLoading
                  ? 'bg-blue-400 text-white cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {saveLoading && <Loader2 className='animate-spin mr-2' />}
              {saveLoading ? 'Saving...' : 'Create InterviewLink & Finish'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionList;
