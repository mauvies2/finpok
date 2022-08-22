import { useEffect, useRef, useState } from 'react'

const useScroll = () => {
  const [scrollingUp, setScrollingUp] = useState<boolean>(false)
  const [scrollY, setScrollY] = useState<number | null>(null)
  const previousScrollValue = useRef<null | number>(null)

  useEffect(() => {
    const scrollEventListener = () => {
      if (previousScrollValue.current && window.scrollY - previousScrollValue.current < 0) {
        setScrollingUp(true)
      } else {
        setScrollingUp(false)
      }
      previousScrollValue.current = window.scrollY
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', scrollEventListener)
    return () => {
      window.removeEventListener('scroll', scrollEventListener)
    }
  }, [])

  return { scrollingUp, scrollY }
}

export default useScroll
