import { FC, ReactNode } from 'react'

interface FieldErrorProps {
  children: ReactNode
  condition: boolean | undefined
}
const FieldError: FC<FieldErrorProps> = ({ children, condition }) => {
  if (!condition) return null

  return <p className="mt-1 font-normal text-red-500">{children}</p>
}

export default FieldError
