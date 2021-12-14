import classNames from 'classnames'
import { forwardRef, FC } from 'react'

interface ButtonProps {
  style?: React.CSSProperties | undefined
  children?: React.ReactNode
  disabled?: boolean
  onClick?: (e: React.MouseEvent) => void
  className?: string
  icon?: React.ReactNode
  square?: boolean
  height?: 'xs' | 's' | 'm' | 'l' | 'xl'
  name?: string
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
    { children, style, icon, disabled, onClick, className, height = 'm', name },
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        name={name}
        ref={ref}
        disabled={disabled}
        onClick={onClick}
        style={style}
        className={classNames(className, buttonHeight[height])}
      >
        {icon ? <span className="mr-2">{icon}</span> : null}
        <p>{children}</p>
      </button>
    )
  }
)

export default Button
