"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function Header() {
    const path=usePathname();
    useEffect(()=>{
        console.log(path);
    },[])
  return (
    <div className='flex p-3 justify-between items-center bg-secondary shadow'>
      <Image src={'/logo.svg'} width={100} height={70} alt='logo'/>
      <ul className='hidden sm:flex gap-6'>
        <li className={` hover:text-primary hover:font-bold transition-all cursor-pointer ${(path==='/dashboard')?'text-primary font-semibold':''}`}>Dashboard</li>
        <li className={` hover:text-primary hover:font-bold transition-all cursor-pointer ${(path==='/dashboard/question')?'text-primary font-semibold':''}`}>Questions</li>
        <li className={` hover:text-primary hover:font-bold transition-all cursor-pointer ${(path==='/dashboard/upgrade')?'text-primary font-semibold':''}`}>Upgrade</li>
        <li className={` hover:text-primary hover:font-bold transition-all cursor-pointer ${(path==='/dashboard/about')?'text-primary font-semibold':''}`}>About</li>
      </ul>
      <UserButton/>
    </div>
  )
}

export default Header
