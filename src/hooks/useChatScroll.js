import { useRef, useEffect } from 'react'

function useChatScroll(dep) {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [dep])
  return ref
}

export default useChatScroll
