'use client'
import { useState } from "react";
import { SignUp } from "@clerk/nextjs";

function randomString(len = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [creds, setCreds] = useState(null);

  function generateCreds(forceNew = false) {
    if (creds && !forceNew) {
      // creds already exist, just show modal again
      setShowModal(true);
      return;
    }

    const email = `${randomString(8)}@example.com`;
    const password = `A${randomString(5)}!${Math.floor(Math.random() * 9000 + 1000)}`;
    const newCreds = { email, password };
    setCreds(newCreds);

    // auto copy to clipboard
    navigator.clipboard?.writeText(`${email}\n ${password}`);
    setShowModal(true);
  }

  return (
<section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt=""
        src="https://images.unsplash.com/photo-1720370225485-386b9793c61d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <a className="block text-white" href="#">
          <span className="sr-only">Home</span>
        </a>

        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Welcome to <span className=' text-5xl font-extrabold'>AcePrep <span className=' text-primary'>AI</span></span>
        </h2>

        <p className="mt-4 leading-relaxed text-white/90">
          The Future of Interviews, a way to excel in your domain
        </p>
      </div>
    </section>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <div className="relative -mt-16 block lg:hidden">
          
        </div>

        <button
          className="mb-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          onClick={() => generateCreds()}
        >
          Generate Dummy Account
        </button>

        <SignUp />

        {/* Modal */}
        {showModal && creds && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-bold mb-3">Test Credentials</h3>
              <p><strong>Email:</strong> {creds.email}</p>
              <p><strong>Password:</strong> {creds.password}</p>
              <p className="mt-2 text-sm text-gray-500">
                Already copied to clipboard. Just paste them into the form.
              </p>
              <div className="mt-4 flex justify-between gap-2">
                <button
                  onClick={() => navigator.clipboard.writeText(creds.email)}
                  className="rounded bg-gray-200 px-3 py-1"
                >
                  Copy Email
                </button>
                <button
                  onClick={() => navigator.clipboard.writeText(creds.password)}
                  className="rounded bg-gray-200 px-3 py-1"
                >
                  Copy Password
                </button>
                <button
                  onClick={() => generateCreds(true)}
                  className="rounded bg-yellow-500 px-3 py-1 text-white"
                >
                  Generate New Creds
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="rounded bg-blue-600 px-3 py-1 text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  </div>
</section>
  );
}
