'use client'

import { useEffect } from 'react'

interface LegitScriptSealProps {
  className?: string
}

export function LegitScriptSeal({ className = '' }: LegitScriptSealProps) {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script')
    script.src = 'https://static.legitscript.com/seals/17561062.js'
    script.async = true
    
    // Find the container element and append the script
    const container = document.getElementById('legitscript-seal-container')
    if (container) {
      container.appendChild(script)
    }
    
    // Cleanup function to remove script on unmount
    return () => {
      if (container && script.parentNode) {
        container.removeChild(script)
      }
    }
  }, [])
  
  return (
    <div 
      id="legitscript-seal-container" 
      className={`inline-block ${className}`}
      aria-label="LegitScript approved"
    />
  )
}