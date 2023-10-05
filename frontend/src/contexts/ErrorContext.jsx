import { createContext, useState } from 'react'

export const ErrorContext = createContext(null)

export const ErrorProvider = ({ children }) => {
  const [errorMsg, setErrorMsg] = useState('')

  return (
    <ErrorContext.Provider value={{ errorMsg, setErrorMsg }}>
      {children}
    </ErrorContext.Provider>
  )
}
