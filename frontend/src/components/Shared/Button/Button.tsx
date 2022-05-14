import { forwardRef, FC } from 'react'

interface ButtonProps {
  style?: React.CSSProperties | undefined
  type?: 'button' | 'submit' | 'reset' | undefined
  children?: React.ReactNode
  disabled?: boolean
  className?: string
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

const Button: FC<ButtonProps> = forwardRef(
  (
    { children, style, icon, disabled, onClick, className, height = 'm', name, type },
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        name={name}
        type={type}
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        style={style}
        className={`${className} ${buttonHeight[height]} focus-visible:shadow-button active:shadow-none`}
      >
        {icon ? <span className="mr-2">{icon}</span> : null}
        <p>{children}</p>
      </button>
    )
  }
)

export default Button
