"use client"
import { Button } from '@/components/ui/button'
import { Mic } from 'lucide-react';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';
import Webcam from 'react-webcam'

function RecordAnswer() {
  const [userAnswer, setUserAnswer] = useState('');
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  useEffect(() => {
    if (results.length > 0) {
      const newTranscript = results.map(result => result.transcript).join(' ');
      setUserAnswer(prev => `${prev} ${newTranscript}`.trim());
    }
  }, [results]);

  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col mt-20 justify-center items-center bg-black relative'>
        <Image className='absolute' src={'/webcam.png'} height={200} width={200} alt='cam' />
        <Webcam
          mirrored={true}
          style={{
            height: 300,
            zIndex: 10,
            width: '100%'
          }}
        />
      </div>
      <Button variant='outline' className='my-10' onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? (
          <h2 className='flex text-red-600 items-center gap-2'>
            <Mic /> Stop Recording
          </h2>
        ) : (
          'Record Answer'
        )}
      </Button>
      <Button onClick={() => console.log(userAnswer)}>Show User Answer</Button>
    </div>
  )
}

export default RecordAnswer;
