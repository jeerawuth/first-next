import React from 'react'
import RegisterForm from '../components/forms/RegisterForm'
import { AuthProvider } from '../providers/authContext'

export default function page() {
  return (
    <AuthProvider>
        <div>
            <RegisterForm />
        </div>
    </AuthProvider>
  )
}
