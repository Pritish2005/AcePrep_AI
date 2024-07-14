# AcePrep AI- an AI Mock Interview Taker Application

## Problem Statement
In the competitive job market, candidates often find it challenging to prepare for interviews, especially when they don't have access to professional mock interviews. This application aims to provide an AI-powered mock interview platform that helps candidates practice and receive feedback on their interview performance based on their resume and skills.

## Tech Stack Used
- **Frontend:**
  - Next.js
  - React.js
  - Tailwind CSS
  - ShadcnUI
- **Backend:**
  - DrizzleORM
  - PostgreSQL
- **Authentication:**
  - Clerk
- **AI Services:**
  - Google Gemini API (via chatSession)
- **Miscellaneous:**
  - react-hook-speech-to-text
  - moment.js
  - react-webcam
  - lucide-react
  - sonner (for notifications)

## Application Flow Diagram
![image](https://github.com/user-attachments/assets/59c6132e-cf89-4607-96be-2dba8576c133)

## Description
This AI mock interview application simulates a real interview environment where candidates can:
1. **Sign Up and Log In:** Users can authenticate using Clerk.
2. **Dashboard:** View a personalized dashboard with options to add new mock interviews or review past ones.
3. **Create Mock Interview:** Input job role, job description, and years of experience to generate relevant interview questions using AI.
4. **Conduct Interview:** Enable webcam and microphone to simulate a real interview environment. Answer AI-generated questions, and the system records and analyzes responses.
5. **Feedback:** Receive detailed feedback on answers, including a rating and areas for improvement.
6. **Review Past Interviews:** View previous interviews and feedback for continuous improvement.

## Challenges Faced
- **Integrating AI with Real-time Feedback:** Ensuring the AI-generated questions and feedback are relevant and accurate.
- **Speech Recognition:** Implementing robust speech-to-text functionality to capture user responses effectively.
- **UI/UX Design:** Creating a user-friendly and intuitive interface that simulates a real interview environment.
- **Performance Optimization:** Managing real-time video and audio streams while maintaining application performance.
- **Data Persistence:** Ensuring user data, including interview responses and feedback, is securely stored and easily retrievable.
