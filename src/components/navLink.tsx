"use client";
import React from 'react';
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
    name:string;
    path:string;
}
export default function NavLink({name,path}:Props) {
    const pathname = usePathname();
  return (
    <Link
    href={path}
    className={`flex items-center gap-2 ${
      pathname === path
        ? "text-green-500"
        : "hover:text-green-500 transition-colors text-white"
    }`}
  >
    {name}
  </Link>  )
}
