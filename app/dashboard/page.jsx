import { UserButton } from '@clerk/nextjs'
import React from 'react'
import Addnewinterview from './_components/Addnewinterview'

function Dashboard() {
  return (
    <div className=' p-10'>
      <h2 className=' font-bold text-2xl'>Dashboard</h2>
      <h2 className=' text-gray-500'>Create and Start your Mock Interview</h2>

      <div className=' grid grid-cols-1 md:grid-cols-3 my-5'>
        <Addnewinterview/>
      </div>
    </div>
  )
}

export default Dashboard
