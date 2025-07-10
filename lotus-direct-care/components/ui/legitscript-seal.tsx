"use client";

import Image from 'next/image'
import Link from 'next/link'

interface LegitScriptSealProps {
  className?: string
}

export function LegitScriptSeal({ className = '' }: LegitScriptSealProps) {
  return (
    <Link 
      href="https://www.legitscript.com/websites/lotusdirectcare.com"
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block transition-all duration-300 hover:scale-105 hover:shadow-lg ${className}`}
      title="Verify LegitScript Approval"
    >
      <Image
        src="https://static.legitscript.com/seals/17561062.png" 
        alt="LegitScript approved"
        width={140}
        height={100}
        unoptimized
        className="rounded-md"
      />
    </Link>
  )
}