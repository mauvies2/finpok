import { useEffect, useRef } from 'react'

const useFocus = <T extends HTMLElement>(condition = true): React.MutableRefObject<T | null> => {
  const element = useRef<T | null>(null)

  useEffect(() => {
    if (condition && element.current) {
      element.current.focus()
    }
  }, [condition])

  return element
}

export default useFocus
