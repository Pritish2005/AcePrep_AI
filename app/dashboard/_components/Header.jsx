"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path=usePathname();
    // useEffect(()=>{
    //     // console.log(path);
    // },[])
  return (
    <div className='flex p-3 justify-between items-center bg-secondary shadow'>
      <h1 className=' text-2xl font-extrabold'>AcePrep <span className=' text-primary'>AI</span></h1>
      <ul className='hidden sm:flex gap-6'>
        <Link href={'/dashboard'}>
        <li className={` hover:text-primary hover:font-bold transition-all cursor-pointer ${(path==='/dashboard')?'text-primary font-semibold':''}`}>Dashboard</li></Link>
        <li className={` hover:text-primary hover:font-bold transition-all cursor-pointer ${(path==='/dashboard/question')?'text-primary font-semibold':''}`}>Questions</li>
        <li className={` hover:text-primary hover:font-bold transition-all cursor-pointer ${(path==='/dashboard/upgrade')?'text-primary font-semibold':''}`}>Upgrade</li>
        <Link href={'/dashboard/about'}>
        <li className={` hover:text-primary hover:font-bold transition-all cursor-pointer ${(path==='/dashboard/about')?'text-primary font-semibold':''}`}>About</li>
        </Link>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header
