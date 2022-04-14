import { ChangeEvent, FC, FormEvent, useState } from 'react'
import Head from 'finpok/components/Shared/Head'
import FormInput from '../components/Shared/FormInput/FormInput'
import { useAuthDispatch, useAuthState } from 'finpok/store/auth/AuthProvider'
import { useFormErrorHandleling } from 'finpok/hooks/useFormErrorHandleling'
import { LoginCredentials } from 'finpok-core/domain'
import FieldError from 'finpok/components/Shared/FieldError/FieldError'
import GoogleLogin from 'react-google-login'
import { useAuthWithGoogle } from './Register'

const Login: FC = () => {
  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    email: '',
    password: '',
  })

  const { handleGoogleAuth, handleGoogleFailure, couldAuth } = useAuthWithGoogle()

  const { login, clearAuthErrors } = useAuthDispatch()
  const { error } = useAuthState()

  const { formData, errorValidation } = useFormErrorHandleling([
    { name: 'email', type: 'email', value: loginForm.email, required: true },
    { name: 'password', type: 'text', value: loginForm.password, required: true },
  ])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearAuthErrors()
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  const submitAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    errorValidation()

    if (!formData.email.hasError && !formData.password.hasError) {
      await login(loginForm)
      setLoginForm({ ...loginForm, password: '' })
    }
  }

  return (
    <>
      <Head title="TOP PAGE" />
      <div className="mx-auto min-h-[85vh] w-[240px] pt-10">
        <p>Continue with a Google account.</p>
        <GoogleLogin
          clientId={
            typeof import.meta.env.VITE_GOOGLE_CLIENT_ID === 'string' ? import.meta.env.VITE_GOOGLE_CLIENT_ID : ''
          }
          buttonText="Log in with google"
          onSuccess={handleGoogleAuth}
          onFailure={handleGoogleFailure}
          className="my-4 block w-[240px] p-0"
        ></GoogleLogin>
        <FieldError condition={couldAuth === false}>Google authentication failed</FieldError>
        <form onSubmit={submitAuth}>
          <FormInput
            id="login-email"
            name="email"
            label="Email"
            labelOnError="Email is required."
            placeholder="Write your email here"
            type="email"
            autoComplete="on"
            value={loginForm.email}
            shouldShowError={formData.email.shouldShow}
            onChange={onChange}
          />
          <FormInput
            id="login-password"
            name="password"
            label="Password"
            labelOnError="Password is required"
            placeholder="Write your password here"
            type="password"
            value={loginForm.password}
            shouldShowError={formData.password.shouldShow}
            onChange={onChange}
          />
          <FieldError condition={!!error}>Email or password is incorrect</FieldError>
          <button type="submit" className="btn btn-primary mt-4 w-full">
            Log in
          </button>
        </form>
      </div>
    </>
  )
}

export default Login
