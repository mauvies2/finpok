import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import useScroll from './useScroll'

const useShowOnScroll = (showOnScroll: boolean = false): { top: string; position: 'absolute' | 'fixed' } => {
  const top = useRef(0)
  const showNav = useRef(false)
  const position = useRef<'absolute' | 'fixed'>('absolute')
  const location = useLocation()

  const { scrollingUp, scrollY } = useScroll()

  useEffect(() => {
    top.current = 0
    showNav.current = true
  }, [location])

  useEffect(() => {
    if (!showOnScroll || !scrollY) return

    if (scrollingUp) {
      if (scrollY >= 140 && !showNav.current) {
        top.current = window.scrollY - 80
        showNav.current = true
      }

      if (scrollY - top.current <= 0 && position.current === 'absolute') {
        position.current = 'fixed'
        top.current = 0
      }
    } else {
      if (position.current === 'fixed') {
        top.current = window.scrollY - 1
        position.current = 'absolute'
      }

      if (position.current === 'absolute' && scrollY - top.current >= 80) {
        showNav.current = false
        position.current = 'absolute'
        top.current = 0
      }
    }
  }, [showOnScroll, scrollY, scrollingUp, showNav])

  return { top: `${top.current}px`, position: position.current }
}

export default useShowOnScroll
