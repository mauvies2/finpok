import { useContext } from 'react'
import { ThemeContext } from '../../store/theme/theme-context'
import Moon from 'finpoq/assets/icons/moon'
import Sun from 'finpoq/assets/icons/sun'

const Toggle = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="flex flex-col justify-center">
      <button className="dark:text-dark-text dark:hover:bg-dark-modal mr-2 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 sm:mr-4">
        {theme === 'dark' ? <Moon /> : <Sun />}
      </button>
    </div>
  )
}

export default Toggle
