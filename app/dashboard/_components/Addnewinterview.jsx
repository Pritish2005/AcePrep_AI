'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAiModel';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { uuid } from 'uuidv4'; 
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { MockInterview } from '@/utils/schema';
  

function Addnewinterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobDesc, setJobDesc] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [yearsOfExp, setYearsOfExp] = useState('');
    const [loading,setLoading]=useState(false);
    const [jsonResponse,setJsonResponse]=useState([]);
    const {user}=useUser();

    const handleSubmit = async(e) => {
      e.preventDefault();
      console.log(jobDesc, jobRole, yearsOfExp);
      const InputPrompt="Job Position:ML devoloper Job Role:Python,flask,tensorflow Years of Experience:1 create me a set of 5 question that can be asked in an interview based on these along with an answer in JSON format in one answer only"
      setLoading(true);
      const res=await chatSession.sendMessage(InputPrompt);
      const mockInterviewResponse=res.response.text().replace('```json','').replace('```','');
      console.log(JSON.parse(mockInterviewResponse));
      setJsonResponse(mockInterviewResponse);

      if(mockInterviewResponse){
        const resp=await db.insert(MockInterview)
        .values({
          mockId:uuidv4(),
          jobDesc:jobDesc,
          jobPosition:jobRole,
          jobExperience:yearsOfExp,
          jsonMockResp:mockInterviewResponse,
          createdBy:user?.primaryEmailAddress?.emailAddress,
          createdAt:moment().format('DD-MM-yyyy')
          }).returning({mockId:MockInterview.mockId});
  
          console.log('Inserted Id: ',resp);  
          if(resp){
            setOpenDialog(false);
          }
      }
      else{
        console.log('Error');
      }
      
      setLoading(false);
    }

    return (
        <div>
            <div onClick={() => setOpenDialog(true)} className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow transition-all'>
                <h2 className='font-bold text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle>Tell us more about your Interview</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={handleSubmit}>
                                <h2>Add description about your position/role, Job, etc.</h2>
                                <div className="mt-7 my-3 ">
                                    <label>Job Role/Job Position</label>
                                    <Input 
                                        placeholder='Ex. Machine Learning Developer' 
                                        required
                                        onChange={(e) => setJobRole(e.target.value)}
                                    />
                                </div>
                                <div className='my-3'>
                                    <label>Job Description/Tech Stacks</label>
                                    <Textarea 
                                        placeholder='Ex. Python, React, JavaScript, etc' 
                                        required
                                        onChange={(e) => setJobDesc(e.target.value)}
                                    />
                                </div>
                                <div className="my-3">
                                    <label>Years of Experience</label>
                                    <Input 
                                        placeholder='5' 
                                        type="number" 
                                        max='100' 
                                        required
                                        onChange={(e) => setYearsOfExp(e.target.value)}
                                    />
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" onClick={() => setOpenDialog(false)} variant="ghost">Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {(loading)?
                                        <><LoaderCircle className=' animate-spin'/> Generating from AI</>:'Start Interview'
                                        }
                                        </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Addnewinterview