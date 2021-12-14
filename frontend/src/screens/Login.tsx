import React from 'react'
import Head from 'finpok/components/Shared/Head'
import { useAuthDispatch, useAuthState } from 'finpok/store/auth/AuthProvider'

const Login: React.FC = () => {
  const { email, password } = useAuthState().credentials
  const { login, updateField } = useAuthDispatch()

  const submitAuth = async (e: any) => {
    e.preventDefault()
    await login()
  }

  return (
    <>
      <Head title='TOP PAGE' />
      <div className='hero min-h-screen'>
        <div className='text-center hero-content'>Welcome</div>
        <form className='p-10 card bg-base-200' onSubmit={submitAuth}>
          <div className='form-control'>
            <label className='label' htmlFor='email'>
              <span className='label-text'>Email</span>
            </label>
            <input
              id='email'
              name='email'
              type='text'
              value={email}
              placeholder='email'
              className='input'
              onChange={updateField}
            />
          </div>
          <div className='form-control'>
            <label className='label' htmlFor='password'>
              <span className='label-text'>Password</span>
            </label>
            <input
              id='password'
              name='password'
              type='password'
              value={password}
              placeholder='password'
              className='input'
              onChange={updateField}
            />
          </div>
          <button type='submit' className='btn btn-primary mt-4'>
            Log in
          </button>
        </form>
      </div>
    </>
  )
}

export default Login
