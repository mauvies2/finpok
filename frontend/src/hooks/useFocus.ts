import { useEffect, useRef } from 'react'

const useFocus = <T extends HTMLElement>(condition: boolean = true) => {
  const element = useRef<T | null>(null)

  useEffect(() => {
    if (condition && element.current) {
      element.current.focus()
    }
  }, [condition])

  return element
}

export default useFocus
