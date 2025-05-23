"use client"

import { useEffect } from "react"

const Loader = () => {
  useEffect(() => {
    // Use CSS animations for the loader
    const letters = document.querySelectorAll(".loader-letter")

    // Apply animations with staggered delay
    letters.forEach((letter, index) => {
      setTimeout(
        () => {
          letter.classList.add("loader-letter-animate")
        },
        70 * (index + 1),
      )
    })
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="text-4xl md:text-7xl font-bold flex">
        {["A", "A", "K", "A", "S", "H"].map((letter, index) => (
          <span
            key={index}
            className="loader-letter inline-block opacity-0"
            style={{
              color: index % 2 === 0 ? "var(--primary)" : "currentColor",
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Loader
