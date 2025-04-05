"use client";
import { logout } from '@/utils/actions'; 
import React from 'react';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/20/solid'; 

export default function SignOutButton() {
  return (
    <form action={logout}>
      <button className="flex items-center gap-6 text-lg border border-white px-10 py-4 font-medium text-red-600 transition">
        <ArrowLeftOnRectangleIcon className="w-6 h-6" />
        <span>Sign Out</span>
      </button>
    </form>
  );
}

