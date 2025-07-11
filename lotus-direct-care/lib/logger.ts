// Simple logging utility for the application
// In production, you might want to use a service like Sentry, LogRocket, or Datadog

type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, any>
  error?: any
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'
  
  private formatLog(entry: LogEntry): string {
    const { level, message, timestamp, context, error } = entry
    let log = `[${timestamp}] [${level.toUpperCase()}] ${message}`
    
    if (context) {
      log += ` | Context: ${JSON.stringify(context)}`
    }
    
    if (error) {
      // If error is an Error object, use its message
      if (error instanceof Error) {
        log += ` | Error: ${error.message}`
        if (error.stack && this.isDevelopment) {
          log += `\n${error.stack}`
        }
      } else {
        // For non-Error objects, stringify them
        try {
          log += ` | Error: ${JSON.stringify(error)}`
        } catch (e) {
          // If stringify fails, use toString
          log += ` | Error: ${String(error)}`
        }
      }
    }
    
    return log
  }
  
  private log(level: LogLevel, message: string, context?: Record<string, any>, error?: any) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
      error
    }
    
    const formattedLog = this.formatLog(entry)
    
    switch (level) {
      case 'error':
        console.error(formattedLog)
        break
      case 'warn':
        console.warn(formattedLog)
        break
      case 'debug':
        if (this.isDevelopment) {
          console.debug(formattedLog)
        }
        break
      default:
        console.log(formattedLog)
    }
    
    // In production, you would send logs to a logging service here
    // Example:
    // if (!this.isDevelopment && level === 'error') {
    //   sendToLoggingService(entry)
    // }
  }
  
  info(message: string, context?: Record<string, any>) {
    this.log('info', message, context)
  }
  
  warn(message: string, context?: Record<string, any>) {
    this.log('warn', message, context)
  }
  
  error(message: string, error?: any, context?: Record<string, any>) {
    this.log('error', message, context, error)
  }
  
  debug(message: string, context?: Record<string, any>) {
    this.log('debug', message, context)
  }
}

// Export singleton instance
export const logger = new Logger()

// Utility function for API error responses
export function logApiError(
  endpoint: string,
  error: any,
  context?: Record<string, any>
) {
  // Pass the raw error to logger, which now handles non-Error objects
  logger.error(
    `API Error in ${endpoint}`,
    error,
    {
      ...context,
      endpoint,
      errorType: error?.constructor?.name || 'Unknown',
      errorCode: error?.code,
      errorMessage: error?.message,
      rawError: error instanceof Error ? undefined : error,
    }
  )
}