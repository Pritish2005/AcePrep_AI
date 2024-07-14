'use client'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

function Interview({params}) {
    const [webcamEnable,setWebcamEnable]=useState(false);
    const [interviewData,setInterviewData]=useState([]);
    useEffect(()=>{
        getDetails();
    },[])
    const getDetails=async()=>{
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.InterviewId));

        // console.log(result)
        setInterviewData(result[0]);
    }
  return (
    <div className=' my-10'>
     <h2 className=' font-bold text-2xl'>Let's get started</h2>
     <div className=' grid grid-cols-1 md:grid-cols-2 gap-5'>
        <div className=' flex flex-col my-5 gap-5 '>
            <div className='flex flex-col p-5 rounded-lg border gap-5'>
            <h2 className=' text-lg'><strong>Job Role/Job Position: </strong>{interviewData.jobPosition}</h2>
            <h2 className=' text-lg'><strong>Job Desciption/Tech Stack: </strong>{interviewData.jobDesc}</h2>
            <h2 className=' text-lg'><strong>Years of Experience: </strong>{interviewData.jobExperience}</h2>
            </div>
        <div className=' p-5 bg-yellow-100 border-yellow-300 border rounded-lg'>
            <h2 className='flex gap-2 items-center text-yellow-500'><Lightbulb/><strong> Information</strong></h2>
            <h2 className='mt-7 text-yellow-500'>Switch on your Video for a better interview experience, We do not record your video. Switch on your microphone to record the Answer.</h2>
        </div>
        </div>
        <div>
            {
                webcamEnable?
                    <Webcam 
                    onUserMedia={()=>setWebcamEnable(true)}
                    onUserMediaError={()=>setWebcamEnable(false)}
                    style={{
                        height:400,
                        width:700
                    }}
                    />
                :
                <>
                    <WebcamIcon className=' w-full h-72 my-10 rounded-lg border bg-secondary p-10'/>
                    <Button variant="ghost" className="w-full" onClick={()=>setWebcamEnable(true)}>Enable Web Cam and Microphone</Button>
                </>
        }
        </div>
        
     </div>
     <div className=" flex justify-end items-end mt-10">
        <Link href={"/dashboard/Interview/"+params.InterviewId+"/start"}>
            <Button>Start Interview</Button>
        </Link>
     </div>
    </div>
  )
}

export default Interview
