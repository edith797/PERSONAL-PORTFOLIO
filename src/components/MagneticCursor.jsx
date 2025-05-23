"use client"

import { useEffect, useState } from "react"

const MagneticCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(true)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  const [targetElement, setTargetElement] = useState(null)

  useEffect(() => {
    // Only show custom cursor on desktop
    if (typeof window === "undefined" || window.innerWidth <= 768) {
      return
    }

    setHidden(false)

    const addEventListeners = () => {
      document.addEventListener("mousemove", onMouseMove)
      document.addEventListener("mouseenter", onMouseEnter)
      document.addEventListener("mouseleave", onMouseLeave)
      document.addEventListener("mousedown", onMouseDown)
      document.addEventListener("mouseup", onMouseUp)
    }

    const removeEventListeners = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
    }

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Check for interactive elements
      const element = document.elementFromPoint(e.clientX, e.clientY)
      const interactiveElement = element?.closest("a, button, .interactive, .card-3d, .button-3d")
      setTargetElement(interactiveElement)
    }

    const onMouseEnter = () => {
      setHidden(false)
    }

    const onMouseLeave = () => {
      setHidden(true)
    }

    const onMouseDown = () => {
      setClicked(true)
    }

    const onMouseUp = () => {
      setClicked(false)
    }

    addEventListeners()
    return () => {
      removeEventListeners()
    }
  }, [])

  // Check for hovered links
  useEffect(() => {
    if (hidden) return

    const updateLinkHoverStatus = () => {
      const hoveredLink = document.querySelectorAll("a:hover, button:hover, .interactive:hover").length > 0
      setLinkHovered(hoveredLink)
    }

    // Check for hovered links every 100ms
    const interval = setInterval(updateLinkHoverStatus, 100)

    return () => {
      clearInterval(interval)
    }
  }, [hidden])

  if (hidden) return null

  return (
    <>
      <div
        className="custom-cursor cursor-dot fixed w-3 h-3 bg-primary rounded-full pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          opacity: hidden ? 0 : 1,
          scale: clicked ? 0.5 : linkHovered ? 1.5 : 1,
          transition: "opacity 0.3s ease, transform 0.3s ease, scale 0.3s ease",
        }}
      />
      <div
        className="custom-cursor cursor-circle fixed w-8 h-8 border border-primary rounded-full pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          opacity: hidden ? 0 : 0.5,
          scale: clicked ? 1.5 : linkHovered ? 1.5 : 1,
          width: targetElement ? "50px" : "30px",
          height: targetElement ? "50px" : "30px",
          transition: "opacity 0.3s ease, transform 0.3s ease, scale 0.3s ease, width 0.3s ease, height 0.3s ease",
        }}
      />

      {/* Highlight effect for interactive elements */}
      {targetElement && (
        <div
          className="custom-cursor-highlight fixed pointer-events-none z-40 opacity-20 bg-primary rounded-lg"
          style={{
            left: targetElement.getBoundingClientRect().left,
            top: targetElement.getBoundingClientRect().top,
            width: targetElement.offsetWidth,
            height: targetElement.offsetHeight,
            transition: "all 0.2s ease-out",
          }}
        />
      )}
    </>
  )
}

export default MagneticCursor
