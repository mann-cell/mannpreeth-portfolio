import { useState, useEffect } from 'react'

const isTouch = typeof window !== 'undefined' &&
  window.matchMedia('(hover: none), (pointer: coarse)').matches

export default function Cursor() {
  const [pos,      setPos]      = useState({ x: -100, y: -100 })
  const [dotPos,   setDotPos]   = useState({ x: -100, y: -100 })
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    // Skip everything on touch / mobile devices
    if (isTouch) return

    let animId
    let target  = { x: -100, y: -100 }
    let current = { x: -100, y: -100 }

    const lerp   = (a, b, t) => a + (b - a) * t
    const tick   = () => {
      current.x = lerp(current.x, target.x, 0.12)
      current.y = lerp(current.y, target.y, 0.12)
      setPos({ x: current.x, y: current.y })
      animId = requestAnimationFrame(tick)
    }

    const onMove = e => {
      target = { x: e.clientX, y: e.clientY }
      setDotPos({ x: e.clientX, y: e.clientY })
      const el = document.elementFromPoint(e.clientX, e.clientY)
      setHovering(!!(el && el.closest('a, button, [role="button"]')))
    }
    const onDown = () => setClicking(true)
    const onUp   = () => setClicking(false)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup',   onUp)
    animId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup',   onUp)
      cancelAnimationFrame(animId)
    }
  }, [])

  if (isTouch) return null

  const ring = hovering ? 48 : clicking ? 20 : 32

  return (
    <>
      <div className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-teal-400/60 transition-[width,height] duration-200"
        style={{ width: ring, height: ring, transform: `translate(${pos.x - ring / 2}px, ${pos.y - ring / 2}px)`, boxShadow: hovering ? '0 0 12px rgba(20,184,166,0.5)' : 'none' }} />
      <div className="fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full bg-teal-400"
        style={{ transform: `translate(${dotPos.x - 3}px, ${dotPos.y - 3}px)` }} />
    </>
  )
}
