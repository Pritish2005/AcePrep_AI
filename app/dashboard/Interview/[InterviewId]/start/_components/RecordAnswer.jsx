'use client'
import { Button } from '@/components/ui/button';
import db from '@/utils/db';
import { chatSession } from '@/utils/GeminiAiModel';
import { UserAnswer } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { Mic } from 'lucide-react';
import moment from 'moment';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam';
import { toast } from 'sonner';

function RecordAnswer({ mockInterviewQuestions, activeQuestion, interviewData }) {
  const [userAnswer, setUserAnswer] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    setResults,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length > 0) {
      const newTranscript = results.map(result => result.transcript).join(' ');
      setUserAnswer(prev => `${prev} ${newTranscript}`.trim());
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      updateAnswer();
    }
  }, [isRecording]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  const updateAnswer = async () => {
    setLoading(true);
    try {
      const feedbackPrompt = `Question: ${mockInterviewQuestions[activeQuestion]?.question}, User Answer: ${userAnswer} based on the question and answer please give a rating for answer and area of improvement. Please give in just 3 to 5 lines as in JSON format with rating field out of 10, as feedback:(then some feedback on the response in 3 to 5 lines), rating:(rating out of 10)`;
      const res = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = res.response.text().replace('```json', '').replace('```', '');
      const jsonFeedbackResponse = JSON.parse(mockJsonResp);
      
      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData?.mockId,
        question: mockInterviewQuestions[activeQuestion]?.question,
        correctAns: mockInterviewQuestions[activeQuestion]?.answer,
        userAns: userAnswer,
        feedback: jsonFeedbackResponse?.feedback,
        rating: jsonFeedbackResponse?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('DD-MM-yyyy'),
      });

      if (resp) {
        toast("User Answer Recorded successfully");
        setUserAnswer('');
        setResults([]);
      } else {
        toast('Error while saving your answer, please try again.');
      }
    } catch (error) {
      console.error('Error updating answer:', error);
      toast('Error while processing your answer, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col mt-20 justify-center items-center rounded-lg bg-black relative'>
        <Image className='absolute' src={'/webcam.png'} height={200} width={200} alt='cam' />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            zIndex: 10,
            width: '100%',
          }}
        />
      </div>
      <Button disabled={loading} variant='outline' className='my-10' onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className='flex text-red-600 items-center gap-2'>
            <Mic /> Stop Recording
          </h2>
        ) : (
          <h2 className='text-blue-800 text-center'>Record Answer</h2>
        )}
      </Button>
      {/* <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button> */}
    </div>
  );
}

export default RecordAnswer;
