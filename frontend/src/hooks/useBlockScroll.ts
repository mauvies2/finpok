import { useEffect, useRef } from 'react'

const useBlockScroll = (condition: boolean) => {
  const scroll = useRef(false)

  const blockScroll = () => {
    if (typeof document === 'undefined') return

    const html = document.documentElement
    const { body } = document

    if (!body || !body.style || scroll.current) return

    const scrollBarWidth = window.innerWidth - html.clientWidth
    const bodyPaddingRight = parseInt(window.getComputedStyle(body).getPropertyValue('padding-right')) || 0

    html.style.overflow = 'hidden'
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`

    scroll.current = true
  }

  const allowScroll = () => {
    if (typeof document === 'undefined') return

    const html = document.documentElement
    const { body } = document

    if (!body || !body.style || !scroll.current) return

    html.style.overflow = ''
    body.style.paddingRight = ''

    scroll.current = false
  }

  useEffect(() => {
    if (condition) {
      blockScroll()
    } else {
      allowScroll()
    }
  }, [condition])

  return [blockScroll, allowScroll]
}

export default useBlockScroll
