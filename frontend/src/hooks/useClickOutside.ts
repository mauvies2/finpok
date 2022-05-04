import { MouseEvent, useRef } from 'react'

const useClickOutside = <T extends Element>(cb: () => void) => {
  const element = useRef<T | null>(null)

  const wasClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (element.current && !element.current.contains(e.target as HTMLDivElement)) {
      cb()
    }
  }

  return { element, wasClickOutside }
}

export default useClickOutside
