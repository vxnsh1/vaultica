import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <div className='flex justify-center w-full h-screen items-center'>{children}</div>
  )
}

export default AuthLayout;