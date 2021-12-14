import React, { useState } from 'react'
import Head from 'finpok/components/Shared/Head'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

type FormValues = {
  name: string
  email: string
  password: string
  repeatedPassword: string
}

const Register = () => {
  const [formValues, setFormValues] = useState<FormValues>({ name: '', email: '', password: '', repeatedPassword: '' })
  const [showPasswordAlert, setShowPasswordAlert] = useState<boolean>(false)
  const history = useHistory()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })

    if (formValues.password === e.target.value) {
      setShowPasswordAlert(false)
    }
  }

  const register = async () => {
    const { email, password, name } = formValues
    const credentials = { email, password, name }

    try {
      const response = await axios.post<any>('http://localhost:5000/auth/register', credentials)
      if (response) history.push('/login')
    } catch (e) {
      console.log(e)
    }
  }

  const submitAuth = (e: any) => {
    e.preventDefault()
    if (formValues.password === formValues.repeatedPassword) {
      register()
      return
    }

    setShowPasswordAlert(true)
  }

  return (
    <>
      <Head title='Register user' />
      <div className='hero min-h-screen'>
        <form className='p-10 card bg-base-200' onSubmit={submitAuth}>
          <div className='form-control'>
            <label className='label' htmlFor='name'>
              <span className='label-text'>Name</span>
            </label>
            <input id='name' type='name' placeholder='name' className='input' onChange={onChange} />
          </div>
          <div className='form-control'>
            <label className='label' htmlFor='email'>
              <span className='label-text'>Email</span>
            </label>
            <input id='email' type='email' placeholder='email' className='input' onChange={onChange} />
          </div>
          <div className='form-control'>
            <label className='label' htmlFor='password'>
              <span className='label-text'>Password</span>
            </label>
            <input id='password' type='password' placeholder='password' className='input' onChange={onChange} />
          </div>
          <div className='form-control'>
            <label className='label' htmlFor='repeatedPassword'>
              <span className='label-text'>Repeat password</span>
            </label>
            <input id='repeatedPassword' type='password' placeholder='password' className='input' onChange={onChange} />
          </div>
          {showPasswordAlert && <p className='text-red-500'>Password do not match</p>}
          <button type='submit' className='btn btn-primary mt-4'>
            Register
          </button>
        </form>
      </div>
    </>
  )
}

export default Register
