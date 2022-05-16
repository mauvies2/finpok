import { ChangeEvent, FC, FormEvent, useState } from 'react'
import Head from 'finpok/components/Shared/Head'
import FormInput from '../components/Shared/FormInput/FormInput'
import { useAuthDispatch, useAuthState } from 'finpok/store/auth/AuthProvider'
import { useFormErrorHandleling } from 'finpok/hooks/useFormErrorHandleling'
import { LoginCredentials } from 'finpok-core/domain'
import FieldError from 'finpok/components/Shared/FieldError/FieldError'
import Button from 'finpok/components/Shared/Button'
import { useAuthWithGoogle } from 'finpok/hooks/useAuthWithGoogle'
import { GoogleLogin } from 'finpok/components/GoogleLogin/GoogleLogin'

const Login: FC = () => {
  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    email: '',
    password: '',
  })

  const { couldAuth } = useAuthWithGoogle()

  const { login, clearAuthErrors } = useAuthDispatch()
  const { error } = useAuthState()

  const { formData, validateForm } = useFormErrorHandleling([
    { name: 'email', type: 'email', value: loginForm.email, required: true },
    { name: 'password', type: 'text', value: loginForm.password, required: true },
  ])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearAuthErrors()
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  const submitAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const isFormValid = validateForm()

    if (isFormValid) {
      await login(loginForm)
      setLoginForm({ ...loginForm, password: '' })
    }
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-7rem)] w-[300px] flex-col justify-center">
      <Head title="Login" />
      <form onSubmit={submitAuth} className="mt-4">
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
        <Button type="submit" className="mt-3 w-full">
          Log in
        </Button>
      </form>
      <div className="relative my-10 w-full border-b-2">
        <p className="absolute left-1/2 flex w-14 -translate-x-1/2 -translate-y-1/2 transform justify-center bg-white">
          or
        </p>
      </div>
      <div>
        <GoogleLogin />
        <FieldError condition={couldAuth === false}>Google authentication failed</FieldError>
      </div>
    </section>
  )
}

export default Login
