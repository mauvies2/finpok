import { useContext } from 'react'
import { ThemeContext } from '../../store/theme/ThemeContext'
import { Sun, Moon } from '@styled-icons/bootstrap'

const Toggle = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <div onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="flex flex-col justify-center">
      <button className="dark:text-dark-text dark:hover:bg-dark-modal ml-2 flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100">
        {theme === 'dark' ? <Moon width={16} height={16} /> : <Sun width={16} height={16} />}
      </button>
    </div>
  )
}

export default Toggle
