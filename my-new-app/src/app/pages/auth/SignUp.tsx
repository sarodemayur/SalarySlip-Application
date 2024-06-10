import React from 'react'
import SignUpForm from '../../components/views/auth/SignUpForm'
import { SignUpFormData } from '../../types';

const SignUp = () => {
  const handleFormSubmit = (data: SignUpFormData) => {
    console.log('Form Data:', data); // Log form data
  };
  return (
    <div>
      <SignUpForm onSubmit={handleFormSubmit}/>
    </div>
  )
}

export default SignUp
