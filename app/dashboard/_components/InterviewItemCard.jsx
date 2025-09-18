import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({interview}) {
    const router=useRouter();

    const onStart=()=>{
        router.push('/dashboard/Interview/'+interview?.mock_id);
    }

    const feedbackHandler=()=>{
        router.push('/dashboard/Interview/'+interview?.mock_id+'/feedback');
    }
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className=' font-bold text-primary'>{interview?.job_position}</h2>
        <h2 className='text-sm text-gray-600'>{interview?.job_experience} Years of Experience</h2>
        <h2 className='text-xs text-gray-400'>Created at: {interview?.created_at}</h2>
        <div className='flex justify-between mt-2 gap-5'>
        <Button size="sm" variant="outline" className="w-full" onClick={feedbackHandler}>Feedback</Button>
        <Button size="sm" className="w-full" onClick={onStart}>Start</Button>
        </div>
    </div>
  )
}

export default InterviewItemCard
