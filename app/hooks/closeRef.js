import { useEffect, useRef } from 'react'

const OPTIONS = {
  root: null,
  rootMargin: '0px',
  threshold: 0.5,
}

export default function useCloseRef(close) {
  const ref = useRef()
  useEffect(() => {
    return () => {
      if (ref.current) {
        ref.current.disconnect()
      }
    }
  }, [])

  const init = (el) => {
    if (el && !ref.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            close()
          }
        }, OPTIONS)
      })
      observer.observe(el)
      ref.current = observer
    }
  }
  return init
}
