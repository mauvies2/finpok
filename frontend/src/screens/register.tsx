import { ChangeEvent, FormEvent, useState } from 'react'
import Head from 'finpoq/components/shared/head'
import FormInput from 'finpoq/components/shared/form-input/form-input'
import { useNavigate } from 'react-router-dom'
import { register } from 'finpoq/services/portfolio-service'
import { useFormErrorHandleling } from 'finpoq/hooks/use-form-error-handleling'
import FieldError from 'finpoq/components/shared/field-error/field-error'
import Button from 'finpoq/components/shared/button'
import { useAuthWithGoogle } from 'finpoq/hooks/use-auth-with-google'
import { GoogleLogin } from 'finpoq/components/google-login/google-login'

type FormValues = {
  name: string
  email: string
  password: string
  repeatedPassword: string
}

const formInitialValues = {
  name: '',
  email: '',
  password: '',
  repeatedPassword: '',
}

// TODO: show error when email is already registered

const Register = () => {
  const navigate = useNavigate()

  const { couldAuth } = useAuthWithGoogle()

  const [formValues, setFormValues] = useState<FormValues>(formInitialValues)

  const [repeatedPasswordError, setRepeatedPasswordError] = useState<boolean>(false)

  const { formData, isFormValid } = useFormErrorHandleling([
    { name: 'name', type: 'text', value: formValues.name, required: true },
    { name: 'email', type: 'email', value: formValues.email, required: true },
    { name: 'password', type: 'password', value: formValues.password, required: true },
  ])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })

    if (formValues.password === e.target.value) {
      setRepeatedPasswordError(false)
    }
  }

  const handleRegister = async () => {
    const { email, password, name } = formValues
    try {
      const response = await register({ email, password, name })
      if (response) navigate('/login')
    } catch (e) {
      return e
    } finally {
      setFormValues(formInitialValues)
    }
  }

  const submitAuth = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formValues.password !== formValues.repeatedPassword) {
      setRepeatedPasswordError(true)
      return
    }

    if (isFormValid()) {
      handleRegister()
    }
  }

  return (
    <>
      <Head title="Register user" />
      <section className="mx-auto flex min-h-[calc(100vh-7rem)] w-[300px] flex-col justify-center text-center">
        <p>Continue with a Google account.</p>
        <div className="my-8">
          <GoogleLogin />
          <FieldError condition={couldAuth === false}>Google authentication failed</FieldError>
        </div>
        <p className="mb-7">Or use your info.</p>
        <form className="w-[300px] text-left" onSubmit={submitAuth}>
          <FormInput
            id="register-name"
            labelClass="mt-8"
            name="name"
            label="Name"
            labelOnError={formData.name.errorMessage}
            placeholder="Write your name here"
            type="name"
            value={formValues.name}
            shouldShowError={formData.name.shouldShow}
            onChange={onChange}
          />
          <FormInput
            id="register-email"
            name="email"
            label="Email"
            labelOnError={formData.email.errorMessage}
            placeholder="Write your email here"
            type="email"
            value={formValues.email}
            shouldShowError={formData.email.shouldShow}
            onChange={onChange}
          />
          <FormInput
            id="register-password"
            name="password"
            label="Password"
            labelOnError={formData.password.errorMessage}
            placeholder="Write your password here"
            type="password"
            value={formValues.password}
            shouldShowError={formData.password.shouldShow}
            onChange={onChange}
          />
          <FormInput
            id="register-repeated-password"
            name="repeatedPassword"
            label="Repeat password"
            labelOnError="Password do not match"
            placeholder="Write your password again"
            type="password"
            value={formValues.repeatedPassword}
            shouldShowError={repeatedPasswordError}
            onChange={onChange}
          />
          <Button type="submit" className="mt-4 w-full">
            Register
          </Button>
        </form>
      </section>
    </>
  )
}

export default Register
