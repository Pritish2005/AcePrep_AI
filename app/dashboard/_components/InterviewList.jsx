'use client'
import {db} from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { asc, desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
    const {user}=useUser();
    const [interviewList,setInterviewList]=useState([]);

    useEffect(()=>{
        user&&getInterviewList();
    },[user])

    const getInterviewList=async()=>{
        const result=await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.created_by, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.created_at))

        // console.log(result);
        setInterviewList(result);
    }
  return (
    <div>
      <h2 className=' font-medium text-xl'>Previous Mock Interviews</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {interviewList&&interviewList.map((interview,index)=>(
            <InterviewItemCard key={index} interview={interview}/>
        ))}
      </div>
    </div>
  )
}

export default InterviewList
