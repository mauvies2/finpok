import { MutableRefObject, useCallback, useEffect } from 'react'

const useClickOutside = <T extends Element>(element: MutableRefObject<T | null>, cb: () => void) => {
  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (element.current && !element.current.contains(e.target as HTMLDivElement)) {
        cb()
      }
    },
    [cb, element]
  )

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [handleClick])
}

export default useClickOutside
