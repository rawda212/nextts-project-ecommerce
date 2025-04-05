import React, { useState } from 'react'
interface Props{
    children:string;
}
export default function TextExpander({children}:Props) {
    const [isExpanded,setIsexpanded]=useState(false);
    const displayText=isExpanded ? children:children.split(" ").slice(0 , 2).join(" ")+"..."
    
  return (
    <span>
        {displayText}{" "}
        <button onClick={()=>setIsexpanded(!isExpanded)} className='tex-primary-700 border-b border-primary-700 leading-3 pb-1'>
            {isExpanded ?"Show less":"Show more"}
        </button>
    </span>
  )
}
