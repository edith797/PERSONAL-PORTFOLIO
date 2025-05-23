"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "./ThemeProvider"
import { Moon, Sun, Menu, X, ChevronUp } from "lucide-react"

const Header = () => {
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const logoRef = useRef(null)

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)

    if (!mobileMenuOpen) {
      // Use setTimeout to ensure DOM is updated before animation
      setTimeout(() => {
        const mobileMenuItems = document.querySelectorAll(".mobile-menu-item")
        mobileMenuItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("mobile-menu-item-animate")
          }, index * 100)
        })
      }, 50)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      // Update header background
      setIsScrolled(window.scrollY > 50)

      // Update scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (window.scrollY / totalHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Wait for DOM to be fully loaded
    setIsLoaded(true)

    // Animate nav items with CSS
    setTimeout(() => {
      const navItems = document.querySelectorAll(".nav-item")
      navItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.add("nav-item-animate")
        }, index * 100)
      })
    }, 100)

    // Animate logo
    if (logoRef.current) {
      const letters = logoRef.current.querySelectorAll(".logo-letter")
      letters.forEach((letter, index) => {
        setTimeout(() => {
          letter.classList.add("logo-letter-animate")
        }, index * 150)
      })
    }
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      // Get the header height for offset
      const headerHeight = document.querySelector("header").offsetHeight

      // Calculate the exact position
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset

      // Apply offset - using a fixed value of 80px to ensure consistent positioning
      const offsetPosition = elementPosition - 80

      // Scroll to the position
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      // Close mobile menu if open
      setMobileMenuOpen(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary-foreground transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>

        <div className="container mx-auto px-4 flex items-center justify-between">
          <a
            href="#"
            ref={logoRef}
            className="text-2xl relative group"
            onClick={(e) => {
              e.preventDefault()
              scrollToTop()
            }}
          >
            <span className="sr-only">AAKASH</span>
            <div className="flex items-center overflow-hidden">
              {/* Uniquely animated logo letters with custom font */}
              <span
                className="logo-letter inline-block text-primary font-logo"
                style={{
                  animation: "logoA1 1.5s forwards",
                  transformOrigin: "bottom center",
                }}
              >
                A
              </span>
              <span
                className="logo-letter inline-block text-primary font-logo"
                style={{
                  animation: "logoA2 1.5s forwards 0.1s",
                  transformOrigin: "bottom center",
                }}
              >
                A
              </span>
              <span
                className="logo-letter inline-block font-logo"
                style={{
                  animation: "logoK 1.5s forwards 0.2s",
                  transformOrigin: "center",
                }}
              >
                K
              </span>
              <span
                className="logo-letter inline-block font-logo"
                style={{
                  animation: "logoA3 1.5s forwards 0.3s",
                  transformOrigin: "top center",
                }}
              >
                A
              </span>
              <span
                className="logo-letter inline-block font-logo"
                style={{
                  animation: "logoS 1.5s forwards 0.4s",
                  transformOrigin: "center",
                }}
              >
                S
              </span>
              <span
                className="logo-letter inline-block font-logo"
                style={{
                  animation: "logoH 1.5s forwards 0.5s",
                  transformOrigin: "center",
                }}
              >
                H
              </span>
            </div>
            <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary-foreground transform scale-x-0 transition-transform origin-left group-hover:scale-x-100 duration-300"></div>
          </a>

          <nav className="hidden md:flex items-center space-x-1">
            {["home", "about", "skills", "projects", "contact"].map((item, index) => (
              <button
                key={index}
                onClick={() => scrollToSection(item)}
                className="nav-item text-sm uppercase tracking-wider hover:text-primary transition-colors relative px-4 py-2 overflow-hidden group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="relative z-10">{item}</span>
                <span className="absolute inset-0 bg-primary/10 rounded-md transform scale-0 transition-transform group-hover:scale-100 duration-300"></span>
              </button>
            ))}

            <button
              onClick={toggleTheme}
              className="nav-item p-2 rounded-full hover:bg-muted transition-colors relative overflow-hidden group ml-2"
              aria-label="Toggle theme"
              style={{ animationDelay: `${5 * 100}ms` }}
            >
              <span className="absolute inset-0 bg-primary/10 rounded-full transform scale-0 transition-transform group-hover:scale-100 duration-300"></span>
              <span className="relative z-10">
                {theme === "dark" ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-primary" />
                )}
              </span>
            </button>
          </nav>

          <button
            className="md:hidden p-2 rounded-full hover:bg-muted transition-colors relative overflow-hidden group"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className="absolute inset-0 bg-primary/10 rounded-full transform scale-0 transition-transform group-hover:scale-100 duration-300"></span>
            <span className="relative z-10">{mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}</span>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-md py-4 px-4">
            <nav className="flex flex-col space-y-4">
              {["home", "about", "skills", "projects", "contact"].map((item, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSection(item)}
                  className="mobile-menu-item text-sm uppercase tracking-wider hover:text-primary transition-colors py-2 relative overflow-hidden group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="relative z-10">{item}</span>
                  <span className="absolute inset-0 bg-primary/10 rounded-md transform scale-0 transition-transform group-hover:scale-100 duration-300"></span>
                </button>
              ))}

              <button
                onClick={toggleTheme}
                className="mobile-menu-item flex items-center space-x-2 py-2 relative overflow-hidden group"
                aria-label="Toggle theme"
                style={{ animationDelay: `${5 * 100}ms` }}
              >
                <span className="relative z-10 flex items-center">
                  <span>{theme === "dark" ? "Light" : "Dark"} mode</span>
                  {theme === "dark" ? (
                    <Sun size={18} className="ml-2 text-yellow-400" />
                  ) : (
                    <Moon size={18} className="ml-2 text-primary" />
                  )}
                </span>
                <span className="absolute inset-0 bg-primary/10 rounded-md transform scale-0 transition-transform group-hover:scale-100 duration-300"></span>
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Floating action button for quick navigation */}
      {isScrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 button-3d"
          aria-label="Scroll to top"
          style={{
            animation: "fadeInUp 0.5s ease forwards",
          }}
        >
          <ChevronUp size={24} />
        </button>
      )}
    </>
  )
}

export default Header
