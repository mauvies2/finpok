import { useCallback, useRef } from 'react'

const useBlockScroll = (condition: boolean = true) => {
  const scroll = useRef(false)

  const blockScroll = useCallback(() => {
    if (typeof document === 'undefined' || scroll.current) return

    const html = document.documentElement
    const { body } = document

    if (!body || !body.style) return

    const scrollBarWidth = window.innerWidth - html.clientWidth
    const bodyPaddingRight = parseInt(window.getComputedStyle(body).getPropertyValue('padding-right'), 10) || 0

    html.style.overflow = 'hidden'
    body.style.paddingRight = `${bodyPaddingRight + scrollBarWidth}px`

    scroll.current = true
  }, [])

  const allowScroll = useCallback(() => {
    if (typeof document === 'undefined' || !scroll.current) return

    const html = document.documentElement
    const { body } = document

    if (!body || !body.style) return

    html.style.overflow = ''
    body.style.paddingRight = ''

    scroll.current = false
  }, [])

  return [blockScroll, allowScroll]
}

export default useBlockScroll
