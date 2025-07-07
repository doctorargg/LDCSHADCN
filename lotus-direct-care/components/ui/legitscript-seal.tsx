'use client'

import Script from 'next/script'
import { useId } from 'react'

interface LegitScriptSealProps {
  className?: string
}

export function LegitScriptSeal({ className = '' }: LegitScriptSealProps) {
  const id = useId()
  const containerId = `legitscript-seal-${id}`

  return (
    <>
      <div 
        id={containerId}
        className={`inline-block ${className}`}
        aria-label="LegitScript approved"
        style={{ minHeight: '100px', minWidth: '140px' }}
      >
        <Script 
          src="https://static.legitscript.com/seals/17561062.js"
          strategy="lazyOnload"
        />
      </div>
    </>
  )
}