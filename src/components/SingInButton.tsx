"use client";
import { login } from '@/utils/actions'
import Image from 'next/image'
import React from 'react'

export default function SignInButton() {
  return (
    <form action={login}>
       <button className='flex items-center gap-6 text-lg border border-primary-300 px-10 py-4 font-medium'>
        <Image 
        src="https://authjs.dev/img/providers/google.svg" 
        alt='google logo'
        width={24}
        height={24}
        />
        <span> continue with Google</span>

    </button>
    </form>
   
  )
}
