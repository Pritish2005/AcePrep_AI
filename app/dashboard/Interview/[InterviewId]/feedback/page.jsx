'use client'
import db from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect,useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronLeft, ChevronsUpDownIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
  

function page({params}) {
    const [overAllRating,setOverAllRating]=useState(0);
    const [feedbackList,setFeedbackList]=useState([]);
    const router=useRouter();
    useEffect(()=>{
        getFeedback();
    },[])
    const getFeedback=async()=>{
        const result=await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef,params.InterviewId))
        .orderBy(UserAnswer.id);

        // console.log(result)
        setFeedbackList(result);

        if (result.length > 0) {
          const totalRating = result.reduce((acc, item) => acc + parseFloat(item.rating), 0);
          const averageRating = (totalRating / result.length).toFixed(2);
          setOverAllRating(averageRating);
      }
    }
  return (
    <div className=' p-10'>

      {
        feedbackList.length==0?
        <h2 className=' font-bold text-xl text-gray-500'>No Interview | Record Found</h2>:
        <>
          <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
          <h2 className='text-2xl font-bold'>Here is your Interview Feedback!</h2>
          <h2 className='text-primary text-lg my-3'>Your overall rating <strong>{overAllRating}</strong></h2>
          <h2 className='text-sm text-gray-500'>Find below questions with correct Answers</h2>
          {
            feedbackList&&feedbackList.map((item,index)=>(
                <Collapsible key={index} className='mt-7'>
                    <CollapsibleTrigger className=' p-2 flex justify-between items-center bg-secondary rounded-lg my-2 text-left gap-4 w-full'>
                    {item.question} <ChevronsUpDownIcon/>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <div className='flex flex-col gap-2'>
                            <h2 className=' text-red-500 p-2 border rounded-lg'><strong>Rating: </strong>{item.rating}</h2>
                            <h2 className=' p-2 border rounded-lg bg-red-50 text-left text-red-900'><strong>Your Answer: </strong>{item.userAns}</h2>
                            <h2 className='p-2 border rounded-lg bg-green-50 text-left text-green-900'><strong>Correct Answer: </strong>{item.correctAns}</h2>
                            <h2 className='p-2 border rounded-lg bg-blue-50 text-left text-blue-900'><strong>Feedback: </strong>{item.feedback}</h2>
                        </div>
                    </CollapsibleContent>
                </Collapsible>

            ))
          }
        </>
      }
        <Button className="mt-5" onClick={()=>{router.replace('/dashboard')}}>Go Home</Button>
    </div>
  )
}

export default page
