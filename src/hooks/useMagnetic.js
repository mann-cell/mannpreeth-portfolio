import { useRef, useState } from 'react'

export function useMagnetic(strength = 0.38) {
  const ref = useRef()
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    setOffset({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength })
  }

  const onMouseLeave = () => setOffset({ x: 0, y: 0 })

  const style = {
    transform: `translate(${offset.x}px, ${offset.y}px)`,
    transition: offset.x === 0 && offset.y === 0
      ? 'transform 0.5s cubic-bezier(0.23,1,0.32,1)'
      : 'transform 0.1s ease',
  }

  return { ref, style, onMouseMove, onMouseLeave }
}
