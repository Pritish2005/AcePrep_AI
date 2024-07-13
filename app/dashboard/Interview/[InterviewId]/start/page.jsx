'use client'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewQuestion from './_components/InterviewQuestion';
import RecordAnswer from './_components/RecordAnswer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function StartInterview({params}) {
  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestions, setMockInterviewQuestions] = useState([]);
  const [activeQuestion,setActiveQuestion]=useState(0);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const res = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.InterviewId));
    console.log(res);
    setInterviewData(res[0]);
    const jsonMockresponse=JSON.parse(res[0].jsonMockResp);
    console.log(jsonMockresponse);
    setMockInterviewQuestions(jsonMockresponse);
  };
  return (
    <div>

    <div className=' grid grid-cols-1 md:grid-cols-2 gap-10'>
      <InterviewQuestion
        mockInterviewQuestions={mockInterviewQuestions}
        activeQuestion={activeQuestion}
        />
       <RecordAnswer
          mockInterviewQuestions={mockInterviewQuestions}
          activeQuestion={activeQuestion}
          interviewData={interviewData}
          />
    </div>
    <div className=' flex justify-end items-center gap-6'>
      {activeQuestion>0 &&<Button onClick={()=>setActiveQuestion(activeQuestion-1)}>Previous Question</Button>}
      {activeQuestion!=mockInterviewQuestions?.length-1&&<Button onClick={()=>setActiveQuestion(activeQuestion+1)}>Next Question</Button>}
      <Link href={'/dashboard/Interview/'+interviewData?.mockId+'/feedback'}>
      {activeQuestion==mockInterviewQuestions?.length-1&&<Button variant="destructive">End Interview</Button>}
      </Link>
    </div>
  </div>
  )
}

export default StartInterview
