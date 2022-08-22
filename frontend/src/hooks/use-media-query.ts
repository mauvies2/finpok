import { useEffect, useState } from 'react'

const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(false)

  const windowSize = () => {
    if (window.innerWidth >= 768) {
      setIsMobile(false)
    }
    if (window.innerWidth < 768) {
      setIsMobile(true)
    }
  }

  useEffect(() => {
    windowSize()
    window.addEventListener('resize', windowSize)
    return () => {
      window.removeEventListener('resize', windowSize)
    }
  }, [])

  return isMobile
}

export default useMediaQuery
