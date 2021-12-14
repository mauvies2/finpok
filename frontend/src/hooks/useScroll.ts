import { useEffect, useRef, useState } from 'react'

const useScroll = () => {
  const [navScroll, setNavScroll] = useState<boolean>(false)
  const [scrollingUp, setScrollingUp] = useState<boolean>(false)
  const previousScrollValue = useRef<null | number>(null)

  const scrollEventListener = () => {
    if (window.scrollY >= 180) {
      setNavScroll(true)
    }
    if (window.scrollY < 180) {
      setNavScroll(false)
    }

    if (previousScrollValue.current && window.scrollY - previousScrollValue.current < 0) {
      setScrollingUp(true)
    } else {
      setScrollingUp(false)
    }
    previousScrollValue.current = window.scrollY
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollEventListener)
    return () => {
      window.removeEventListener('scroll', scrollEventListener)
    }
  }, [])

  return { navScroll, scrollingUp }
}

export default useScroll
