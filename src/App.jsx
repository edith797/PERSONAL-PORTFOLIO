"use client"

import { useEffect, useState } from "react"
import Header from "./components/Header"
import Hero from "./components/Hero"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import Loader from "./components/Loader"
import MagneticCursor from "./components/MagneticCursor"
import { ThemeProvider } from "./components/ThemeProvider"

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Ensure all resources are loaded before hiding loader
    const handleLoad = () => {
      // Simulate loading time with a minimum duration
      setTimeout(() => {
        setLoading(false)
      }, 2000)
    }

    // If document is already loaded, call handler directly
    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
      return () => window.removeEventListener("load", handleLoad)
    }
  }, [])

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="relative overflow-hidden bg-background text-foreground min-h-screen flex flex-col">
        {loading ? (
          <Loader />
        ) : (
          <>
            <MagneticCursor />
            <Header />
            <main className="flex-grow">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </>
        )}
      </div>
    </ThemeProvider>
  )
}

export default App
