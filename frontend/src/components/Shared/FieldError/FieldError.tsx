import { FC } from 'react'
import { ReactNode } from 'react'

interface FieldErrorProps {
  children: ReactNode
  condition: boolean | undefined
}
const FieldError: FC<FieldErrorProps> = ({ children, condition }) => {
  if (!condition) return null

  return <p className='text-red-500 font-normal mt-1'>{children}</p>
}

export default FieldError
