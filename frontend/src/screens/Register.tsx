import { ChangeEvent, FormEvent, useState } from 'react'
import Head from 'finpok/components/Shared/Head'
import FormInput from '../components/Shared/FormInput/FormInput'
import { useNavigate } from 'react-router-dom'
import { register } from 'finpok/services/ApiService'
import { useFormErrorHandleling } from 'finpok/hooks/useFormErrorHandleling'

type FormValues = {
  name: string
  email: string
  password: string
  repeatedPassword: string
}

const Register = () => {
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: '',
    password: '',
    repeatedPassword: '',
  })

  const [showPasswordAlert, setShowPasswordAlert] = useState<boolean>(false)

  const { formData, errorValidation } = useFormErrorHandleling([
    { name: 'name', type: 'text', value: formValues.name, required: true },
    { name: 'email', type: 'email', value: formValues.email, required: true },
    { name: 'password', type: 'password', value: formValues.password, required: true },
  ])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })

    if (formValues.password === e.target.value) {
      setShowPasswordAlert(false)
    }
  }

  const handleRegister = async () => {
    const { email, password, name } = formValues
    const credentials = { email, password, name }

    try {
      const response = await register(credentials)
      if (response) navigate('/login')
    } catch (e) {
      return e
    }
  }

  const submitAuth = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    errorValidation()

    if (
      formValues.password === formValues.repeatedPassword &&
      !formData.name.isValid &&
      !formData.email.isValid &&
      !formData.password.isValid
    ) {
      handleRegister()
      return
    }

    setShowPasswordAlert(true)
  }

  return (
    <>
      <Head title="Register user" />
      <div className="hero min-h-screen">
        <form className="p-10 card bg-base-200" onSubmit={submitAuth}>
          <FormInput
            id="register-name"
            name="name"
            label="Name"
            labelOnError="Name is required"
            placeholder="Write your name here"
            type="name"
            value={formValues.name}
            shouldShowError={formData.name.shouldShow}
            onChange={onChange}
            autoFocus
          />
          <FormInput
            id="register-email"
            name="email"
            label="Email"
            labelOnError="Email is required"
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
            labelOnError="Password is required"
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
            shouldShowError={showPasswordAlert}
            onChange={onChange}
          />
          <button type="submit" className="btn btn-primary mt-4">
            Register
          </button>
        </form>
      </div>
    </>
  )
}

export default Register
