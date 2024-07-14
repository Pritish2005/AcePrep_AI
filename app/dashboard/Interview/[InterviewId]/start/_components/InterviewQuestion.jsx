import { Lightbulb, Volume2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function InterviewQuestion({mockInterviewQuestions,activeQuestion}) {
    const textToSpeech=(text)=>{
        if('SpeechSynthesis' in window){
            const speech=new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech)
        }else{
            alert("Sorry, your browser does not support text-to-speech");
        }
    }
  return mockInterviewQuestions&&(
    <div className=' p-5 rounded-lg border my-10'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {mockInterviewQuestions && mockInterviewQuestions?.map((question,index)=>(
        <h2 key={index} className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${index==activeQuestion?'bg-primary text-white':'bg-secondary'}`}>question#{index+1}</h2>
      ))}
    </div>
      <h2 className=' my-5 text-md md:text-lg'>{mockInterviewQuestions[activeQuestion]?.question}</h2>
      <Volume2 onClick={()=>textToSpeech(mockInterviewQuestions[activeQuestion]?.question)} className='cursor-pointer'/>
      <div className='border rounded-lg p-5 bg-blue-100 mt-10'>
        <h2 className=' flex gap-2 items-center text-primary '>
        <Lightbulb/>
        <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-primary my-2'>Switch on your Video for a better interview experience, we do not record your video. Switch on your mic to record the Answer.</h2>
      </div>
    </div>
  )
}

export default InterviewQuestion
