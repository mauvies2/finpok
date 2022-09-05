import { ChangeEvent, FormEvent, useState } from 'react'
import Head from 'finpoq/components/shared/head'
import FormInput from 'finpoq/components/shared/form-input/form-input'
import { useAuthDispatch, useAuthState } from 'finpoq/store/auth/auth-provider'
import { useFormErrorHandleling } from 'finpoq/hooks/use-form-error-handleling'
import { LoginCredentials } from 'finpoq-core/types'
import FieldError from 'finpoq/components/shared/field-error/field-error'
import Button from 'finpoq/components/shared/button'
import { useAuthWithGoogle } from 'finpoq/hooks/use-auth-with-google'
import { GoogleLogin } from 'finpoq/components/google-login/google-login'

const Login = () => {
  const [loginForm, setLoginForm] = useState<LoginCredentials>({
    email: '',
    password: '',
  })

  const { couldAuth } = useAuthWithGoogle()
  const { login, clearAuthErrors } = useAuthDispatch()
  const { error } = useAuthState()

  const { formData, isFormValid } = useFormErrorHandleling([
    { name: 'email', type: 'email', value: loginForm.email, required: true },
    { name: 'password', type: 'text', value: loginForm.password, required: true },
  ])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearAuthErrors()
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
  }

  const submitAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isFormValid()) {
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
          labelOnError={formData.email.errorMessage}
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
          labelOnError={formData.password.errorMessage}
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
      <div className="dark:border-dark-line relative my-10 w-full border-b-2">
        <p className="dark:bg-dark absolute left-1/2 flex w-14 -translate-x-1/2 -translate-y-1/2 transform justify-center bg-white">
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
