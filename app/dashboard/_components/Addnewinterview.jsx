'use client'
import React, { useState, useEffect } from 'react'
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
import { model, generationConfig } from '@/utils/GeminiAiModel'
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { MockInterview } from '@/utils/schema';
import { useRouter } from 'next/navigation';  

function Addnewinterview() {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobDesc, setJobDesc] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [yearsOfExp, setYearsOfExp] = useState('');
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([]);
    const { user } = useUser();
    // console.log(user)
    const router = useRouter();

    useEffect(() => {
        // console.log(jsonResponse); // Log jsonResponse to ensure it's updated correctly
    }, [jsonResponse]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(jobDesc, jobRole, yearsOfExp);
        const InputPrompt = `
You are an interview question generator.

Input:
- Job Position: ${jobRole}
- Job Description: ${jobDesc}
- Years of Experience: ${yearsOfExp}

Instructions:
1. If the input is valid and related to a job interview, output EXACTLY 5 question-answer pairs.
2. The output must be a JSON array ONLY (not wrapped in any object, no property names). Example:
[
  { "question": "What is the difference between a function and a method?", "answer": "A function is a block of code that returns a value, a method is associated with an object." },
  { "question": "Explain the concept of OOP?", "answer": "OOP is based on encapsulation, inheritance, polymorphism, and abstraction." }
]
3. If the input is irrelevant, meaningless, or not job-related, return the exact string:
Not in context

Rules:
- No object wrappers (like {"interviewQuestions": [...]}) — only a raw JSON array.
- No markdown, no explanation, no text outside the JSON array or the string Not in context.
`;
;
        setLoading(true);
        const res = await model.generateContent(InputPrompt);;
        const mockInterviewResponse = res.response.text().replace('```json', '').replace('```', '');
        if(mockInterviewResponse === 'Not in context'){
            return new Error('Not in context');
        }
        console.log(mockInterviewResponse);
    //    const mockInterviewResponse = `[
    //     {
    //         "question": "What is the difference between React and Angular?",
    //         "answer": "React is a library focused on UI rendering while Angular is a full-fledged framework."
    //     },
    //     {
    //         "question": "What is state management in frontend development?",
    //         "answer": "State management is the handling of application data across components, often with tools like Redux or Context API."
    //     },
    //     {
    //         "question": "What are the advantages of component-based architecture?",
    //         "answer": "It promotes reusability, easier testing, and better maintainability."
    //     },
    //     {
    //         "question": "What is the difference between controlled and uncontrolled components in React?",
    //         "answer": "Controlled components rely on React state while uncontrolled components store data in the DOM."
    //     },
    //     {
    //         "question": "How would you ensure accessibility in a web application?",
    //         "answer": "By using semantic HTML, ARIA roles, proper contrast ratios, and keyboard navigation support."
    //     }
    //     ]`;

        try {
            const parsedResponse = JSON.parse(mockInterviewResponse);
            console.log(parsedResponse);
            setJsonResponse(parsedResponse);

            if (parsedResponse) {
                // console.log('saving to db...')
                const resp = await db.insert(MockInterview)
                .values({
                    mock_id: uuidv4(),
                    job_desc: jobDesc,
                    job_position: jobRole,
                    job_experience: yearsOfExp,
                    json_mock_resp: JSON.stringify(parsedResponse),
                    created_by: user?.primaryEmailAddress?.emailAddress,
                    created_at: moment().format('DD-MM-yyyy')
                })
                .returning({ mock_id: MockInterview.mock_id });

                console.log('Inserted Id: ', resp[0]);
                if (resp) {
                    setOpenDialog(false);
                    router.push('/dashboard/Interview/' + resp[0]?.mock_id);
                }
            } else {
                console.log('Error in generating mock interview response.');
            }
        } catch (error) {
            console.error('Error parsing JSON response:', error);
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
                                        {loading ?
                                        <><LoaderCircle className='animate-spin'/> Generating from AI</> : 'Start Interview'}
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
