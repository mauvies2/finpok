import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  condition: boolean | undefined
}
const FieldError = ({ children, condition }: Props) => {
  if (!condition) return null

  return <p className="mt-2 pl-3 text-xs font-normal text-red-500">{children}</p>
}

export default FieldError
