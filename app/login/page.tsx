import React, { Suspense } from 'react'
import LoginForm from './_componants/LoginForm'

const LoginPage = () => {
  return (
    <div >
        <Suspense>
<LoginForm />
        </Suspense>
        
    </div>
  )
}

export default LoginPage