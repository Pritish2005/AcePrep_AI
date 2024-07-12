'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewQuestion from './_components/InterviewQuestion';
import RecordAnswer from './_components/RecordAnswer';

function StartInterview({params}) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestion,setActiveQuestion]=useState(0);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const res = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.InterviewId));
    // console.log(res);
    setInterviewData(res[0]);
    const jsonMockresponse=JSON.parse(res[0].jsonMockResp);
    // console.log(jsonMockresponse);
    setMockInterviewQuestions(jsonMockresponse);
  };
  return (
    <div className=' grid grid-cols-1 md:grid-cols-2 gap-10'>
      <InterviewQuestion
        mockInterviewQuestions={mockInterviewQuestions}
        activeQuestion={activeQuestion}
       />
       <RecordAnswer/>
    </div>
  )
}

export default StartInterview
