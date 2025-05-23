"use client"

import { useEffect, useRef, useState } from "react"

// Text scramble effect
const TextScramble = ({ text }) => {
  const [displayText, setDisplayText] = useState("")
  const [isScrambling, setIsScrambling] = useState(false)
  const chars = "!<>-_\\/[]{}—=+*^?#________"

  useEffect(() => {
    let frame = 0
    let iteration = 0
    const finalText = text
    let currentText = ""
    let scrambleTimeout = null

    const scramble = () => {
      if (iteration >= finalText.length) {
        setDisplayText(finalText)
        setIsScrambling(false)
        return
      }

      if (frame % 3 === 0) {
        currentText = finalText.substring(0, Math.floor(iteration))

        if (iteration < finalText.length) {
          const randomChar = chars[Math.floor(Math.random() * chars.length)]
          currentText += randomChar
          iteration += 1 / 3
        }

        setDisplayText(currentText)
      }

      frame++
      scrambleTimeout = setTimeout(scramble, 30)
    }

    // Start scrambling after a delay
    setTimeout(() => {
      setIsScrambling(true)
      scramble()
    }, 500)

    return () => {
      clearTimeout(scrambleTimeout)
    }
  }, [text])

  return <span className={`inline-block ${isScrambling ? "text-primary" : ""}`}>{displayText}</span>
}

// Professional title rotation component
const RotatingTitles = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const titles = ["Full Stack Developer", "UI/UX Designer", "Data Analyst"]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % titles.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-8">
      {titles.map((title, index) => (
        <div
          key={index}
          className={`absolute transition-all duration-500 ${
            index === activeIndex ? "opacity-100 transform-none" : "opacity-0 -translate-y-4"
          }`}
        >
          <span className="text-primary font-semibold">{title}</span>
        </div>
      ))}
    </div>
  )
}

const Hero = () => {
  const heroRef = useRef(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [magneticElements, setMagneticElements] = useState([])

  useEffect(() => {
    setIsLoaded(true)

    setTimeout(() => {
      const letters = document.querySelectorAll(".hero-title .letter")
      letters.forEach((letter, index) => {
        setTimeout(() => {
          letter.classList.add("letter-animate")
        }, index * 50)
      })

      setTimeout(() => {
        const subtitle = document.querySelector(".hero-subtitle")
        if (subtitle) subtitle.classList.add("hero-subtitle-animate")
      }, 600)

      setTimeout(() => {
        const cta = document.querySelector(".hero-cta")
        if (cta) cta.classList.add("hero-cta-animate")
      }, 800)

      setTimeout(() => {
        const scroll = document.querySelector(".hero-scroll")
        if (scroll) scroll.classList.add("hero-scroll-animate")
      }, 1000)

      const particles = document.querySelectorAll(".hero-particle")
      particles.forEach((particle) => {
        particle.classList.add("hero-particle-animate")
      })

      const buttons = document.querySelectorAll(".magnetic-element")
      setMagneticElements(Array.from(buttons))
    }, 100)

    const handleMouseMove = (e) => {
      if (!heroRef.current) return

      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window

      setMousePosition({
        x: clientX / innerWidth,
        y: clientY / innerHeight,
      })

      setCursorPosition({ x: clientX, y: clientY })

      const moveX = (clientX - innerWidth / 2) / 25
      const moveY = (clientY - innerHeight / 2) / 25

      const parallaxItems = document.querySelectorAll(".hero-parallax-item")
      parallaxItems.forEach((item) => {
        const depth = Number.parseFloat(item.getAttribute("data-depth") || "1")
        item.style.transform = `translate(${moveX * depth}px, ${moveY * depth}px)`
      })
    }

    document.addEventListener("mousemove", handleMouseMove)

    const floatingElements = document.querySelectorAll(".floating-element")
    floatingElements.forEach((el) => {
      const delay = Math.random() * 2
      el.style.animationDelay = `${delay}s`
    })

    createWaveAnimation()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    if (magneticElements.length === 0) return

    magneticElements.forEach((element) => {
      const rect = element.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distanceX = cursorPosition.x - centerX
      const distanceY = cursorPosition.y - centerY
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
      const magneticRange = 150

      if (distance < magneticRange) {
        const pull = 0.3 * (1 - distance / magneticRange)
        const moveX = distanceX * pull
        const moveY = distanceY * pull

        element.style.transform = `translate(${moveX}px, ${moveY}px)`
      } else {
        element.style.transform = "translate(0, 0)"
      }
    })
  }, [cursorPosition, magneticElements])

  const createWaveAnimation = () => {
    const canvas = document.getElementById("wave-canvas")
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const width = (canvas.width = window.innerWidth)
    const height = (canvas.height = 150)

    const frequency = 0.01
    const amplitude = 20
    const layers = 3

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (let j = 0; j < layers; j++) {
        ctx.beginPath()

        const layerFrequency = frequency * (j + 1) * 0.5
        const layerAmplitude = (amplitude * (layers - j)) / layers
        const layerOpacity = 0.1 - j * 0.03

        ctx.moveTo(0, height / 2)

        for (let i = 0; i < width; i++) {
          const y = Math.sin(i * layerFrequency + Date.now() * 0.001) * layerAmplitude + height / 2
          ctx.lineTo(i, y)
        }

        ctx.lineTo(width, height)
        ctx.lineTo(0, height)
        ctx.closePath()

        const gradient = ctx.createLinearGradient(0, 0, width, 0)
        gradient.addColorStop(0, `rgba(149, 76, 233, ${layerOpacity})`)
        gradient.addColorStop(0.5, `rgba(169, 106, 243, ${layerOpacity})`)
        gradient.addColorStop(1, `rgba(149, 76, 233, ${layerOpacity})`)

        ctx.fillStyle = gradient
        ctx.fill()
      }

      requestAnimationFrame(render)
    }

    render()
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact")
    if (contactSection) {
      const elementPosition = contactSection.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - 80

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        background: "radial-gradient(circle at center, rgba(var(--primary-rgb), 0.1) 0%, transparent 70%)",
      }}
    >
      {/* Wave animation canvas */}
      <canvas
        id="wave-canvas"
        className="absolute bottom-0 left-0 w-full pointer-events-none opacity-50"
        width="1000"
        height="150"
      ></canvas>

      {/* Dynamic glow effect that follows mouse */}
      <div
        className="absolute pointer-events-none opacity-30 blur-3xl transition-all duration-300 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(var(--primary-rgb), 0.8) 0%, transparent 50%)",
          width: "40vw",
          height: "40vw",
          left: `${mousePosition.x * 100}%`,
          top: `${mousePosition.y * 100}%`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Animated background particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="hero-parallax-item absolute rounded-full bg-primary/10"
            data-depth={(Math.random() * 5).toFixed(1)}
            style={{
              width: `${Math.random() * 200 + 50}px`,
              height: `${Math.random() * 200 + 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
              filter: "blur(8px)",
              transition: "transform 1s ease-out",
            }}
          />
        ))}

        {/* Small animated particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="hero-particle absolute rounded-full bg-primary/30"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0,
              filter: "blur(1px)",
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Floating decorative elements */}
      <div className="floating-element absolute top-1/4 left-1/5 w-20 h-20 bg-primary/5 rounded-full blur-xl"></div>
      <div className="floating-element absolute bottom-1/3 right-1/4 w-32 h-32 bg-primary/5 rounded-full blur-xl"></div>
      <div className="floating-element absolute top-2/3 left-2/3 w-16 h-16 bg-primary/5 rounded-full blur-xl"></div>

      <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="text-center md:text-left md:w-1/2 mb-10 md:mb-0 hero-content">
          <div className="relative">
            <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 overflow-hidden">
              <TextScramble text="AAKASH" />
            </h1>
            <div className="w-1/2 h-1 bg-gradient-to-r from-primary to-purple-400 rounded-full mt-2 transform origin-left scale-x-0 animate-scale-in"></div>
          </div>

          {/* Professional titles with animation */}
          <div className="flex flex-wrap gap-x-2 text-xl md:text-2xl font-semibold">
            <span className="text-primary">Full Stack Developer</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-primary">UI/UX Designer</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-primary">Data Analyst</span>
          </div>

          <p className="mt-4">
            Crafting exceptional digital experiences at the intersection of design, development, and data.
          </p>

    
<button
  onClick={scrollToContact}
  className="hero-cta mt-8 px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium text-lg hover:bg-primary/90 transition-all duration-300 relative overflow-hidden group button-3d magnetic-element"
>
  <span className="relative z-10">Let's Talk</span>
  <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
</button>

        </div>

        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="relative hero-image">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary animate-float relative z-10 profile-image-container">
              <img src="/images/profile.png" alt="Aakash" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100 flex items-end justify-center p-4">
                <p className="text-white font-medium">Full Stack Developer • UI/UX Designer • Data Analyst</p>
              </div>
            </div>
            <div className="absolute -z-10 w-64 h-64 md:w-80 md:h-80 bg-secondary rounded-full -bottom-3 -right-3 animate-pulse-slow"></div>
            <div
              className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary/20 animate-float"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute -bottom-6 left-1/3 w-8 h-8 rounded-full bg-primary/30 animate-float"
              style={{ animationDelay: "1.2s" }}
            ></div>
            <div className="absolute -right-4 top-1/4 tech-badge">
              <div className="px-3 py-1 bg-background rounded-full shadow-lg border border-primary/20 text-sm font-medium">
                Full Stack
              </div>
            </div>
            <div className="absolute -left-12 top-1/2 tech-badge" style={{ animationDelay: "0.3s" }}>
              <div className="px-3 py-1 bg-background rounded-full shadow-lg border border-primary/20 text-sm font-medium">
                UI/UX
              </div>
            </div>
            <div className="absolute right-0 bottom-1/4 tech-badge" style={{ animationDelay: "0.6s" }}>
              <div className="px-3 py-1 bg-background rounded-full shadow-lg border border-primary/20 text-sm font-medium">
                Data Analysis
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
