interface LegitScriptSealProps {
  className?: string
}

export function LegitScriptSeal({ className = '' }: LegitScriptSealProps) {
  return (
    <div 
      className={`inline-block ${className}`}
      aria-label="LegitScript approved"
      dangerouslySetInnerHTML={{
        __html: '<script src="https://static.legitscript.com/seals/17561062.js"></script>'
      }}
    />
  )
}