import { forwardRef } from 'react'

interface ButtonProps {
  style?: React.CSSProperties | undefined
  type?: 'button' | 'submit' | 'reset'
  children?: React.ReactNode
  disabled?: boolean
  className?: string
  btnType?: 'primary' | 'secondary' | 'light'
  icon?: React.ReactNode
  square?: boolean
  height?: 'xs' | 's' | 'm' | 'l' | 'xl'
  name?: string
  onClick?: (e: React.MouseEvent) => void
}

const buttonHeight = {
  xs: 'h-6',
  s: 'h-8',
  m: 'h-10',
  l: 'h-12',
  xl: 'h-14',
}

const Button = forwardRef(
  (
    {
      children,
      style,
      icon,
      disabled,
      onClick,
      className = '',
      height = 'm',
      name,
      type = 'button',
      btnType = 'primary',
    }: ButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => (
    <button
      name={name}
      type={type}
      ref={ref}
      disabled={disabled}
      onClick={onClick}
      style={style}
      className={`btn ${buttonHeight[height]} btn-${btnType} animate-none ${className}`}
    >
      {icon ? <span className="mr-2">{icon}</span> : null}
      <p>{children}</p>
    </button>
  )
)

export default Button
