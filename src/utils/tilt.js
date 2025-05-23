/**
 * Creates a 3D tilt effect on an element based on mouse movement
 * @param {HTMLElement} element - The element to apply the tilt effect to
 * @param {Object} options - Configuration options
 */
export function createTiltEffect(element, options = {}) {
  if (!element) return

  const defaults = {
    max: 15, // max tilt rotation (degrees)
    perspective: 1000, // transform perspective, the lower the more extreme the tilt gets
    scale: 1.05, // 2 = 200%, 1.5 = 150%, etc
    speed: 300, // speed (transition-duration) of the enter/exit transition
    easing: "cubic-bezier(.03,.98,.52,.99)", // easing (transition-timing-function) of the enter/exit transition
  }

  const settings = { ...defaults, ...options }

  let transitionTimeout
  let updateCall
  let position = {
    x: 0,
    y: 0,
  }
  let width = 0
  let height = 0

  // First bind the mouse enter/leave events
  element.addEventListener("mouseenter", mouseEnter)
  element.addEventListener("mouseleave", mouseLeave)
  element.addEventListener("mousemove", mouseMove)

  function mouseEnter() {
    width = element.offsetWidth
    height = element.offsetHeight

    // Set transition only on mouseenter
    setTransition()

    updateElementStyle()
  }

  function mouseMove(event) {
    const rect = element.getBoundingClientRect()
    position = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }

    // Clear the previous timeout
    if (updateCall !== undefined) {
      cancelAnimationFrame(updateCall)
    }

    // Schedule the update
    updateCall = requestAnimationFrame(updateElementStyle)
  }

  function mouseLeave() {
    setTransition()

    // Reset element to its initial state
    requestAnimationFrame(() => {
      element.style.transform = `perspective(${settings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
    })
  }

  function updateElementStyle() {
    const { x, y } = position

    // Calculate tilt values
    const tiltX = (settings.max / height) * (height / 2 - y)
    const tiltY = (settings.max / width) * (x - width / 2)

    // Apply the transform
    element.style.transform = `perspective(${settings.perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${settings.scale}, ${settings.scale}, ${settings.scale})`
  }

  function setTransition() {
    clearTimeout(transitionTimeout)

    // Set transition
    element.style.transition = `transform ${settings.speed}ms ${settings.easing}`

    // Remove transition after specified duration
    transitionTimeout = setTimeout(() => {
      element.style.transition = ""
    }, settings.speed)
  }

  // Return a cleanup function
  return () => {
    element.removeEventListener("mouseenter", mouseEnter)
    element.removeEventListener("mouseleave", mouseLeave)
    element.removeEventListener("mousemove", mouseMove)
  }
}
