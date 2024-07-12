import React from 'react'

function About() {
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center text-primary mb-8">About Our AI Interview Application</h1>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-slate-700 mb-4">Create AI-Generated Interviews</h2>
        <p className="text-lg text-gray-700">
          Our application provides a user-friendly dashboard where you can effortlessly create customized interviews. With just a few clicks, you can generate a set of interview questions tailored to the specific job role you are hiring for. Leveraging advanced AI algorithms, the application crafts questions that are relevant, challenging, and designed to assess a wide range of skills and competencies.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-slate-700 mb-4">Record Responses Seamlessly</h2>
        <p className="text-lg text-gray-700">
          During the interview, candidates’ responses are recorded using integrated camera and audio functionalities. This ensures that every detail of the candidate’s answer is captured accurately. The seamless recording process is designed to be user-friendly, allowing candidates to focus on their responses without any technical distractions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-slate-700 mb-4">AI-Powered Evaluation</h2>
        <p className="text-lg text-gray-700">
          Once the interview is completed, our sophisticated AI system takes over. The recorded responses are analyzed for content, clarity, and relevance. The AI evaluates the answers against a set of predefined criteria and provides detailed feedback on each response. This includes highlighting strengths, identifying areas for improvement, and giving a comprehensive rating based on the quality of the answers.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-3xl font-semibold text-slate-700 mb-4">Comprehensive Feedback Page</h2>
        <p className="text-lg text-gray-700">
          After the evaluation, both the interviewer and the candidate can access a detailed feedback page. This page showcases all the interview questions, the candidate’s responses, the correct or model answers, and the AI-generated feedback and ratings. This transparency ensures that candidates understand their performance and can learn from the feedback provided.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-slate-700 mb-4">Benefits</h2>
        <p className="text-lg text-gray-700">
          Our AI interview application not only saves time but also ensures a fair and unbiased assessment of each candidate. It brings consistency to the interview process and provides actionable insights that help in making informed hiring decisions.
        </p>
        <p className="text-lg text-gray-700 mt-4">
          Experience the future of interviewing with our AI application, where technology meets efficiency, providing you with the tools to find the perfect candidate for your organization.
        </p>
      </section>
    </div>
  )
}

export default About
