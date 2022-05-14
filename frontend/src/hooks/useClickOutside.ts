import { useEffect } from 'react'

const useClickOutside = <T extends Element>(element: React.MutableRefObject<T | null>, cb: () => void) => {
  useEffect(() => {
    const wasClickOutside = (e: globalThis.MouseEvent) => {
      if (element.current && !element.current.contains(e.target as HTMLDivElement)) {
        cb()
      }
    }

    document.addEventListener('click', wasClickOutside, true)

    return () => {
      document.removeEventListener('click', wasClickOutside, true)
    }
  }, [cb, element])

  return { element }
}

export default useClickOutside
