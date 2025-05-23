"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
import { createTiltEffect } from "../utils/tilt"

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

const projects = [
  {
    title: "My-Blogg",
    description:
      "A full-featured MERN stack blog application with real time post updates and an intuitive user interface with user authentication.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    demoLink: "#",
    githubLink: "https://github.com/edith797/MY-BLOGGG",
  },
  {
    title: "KADD-CRIC",
    description:
      "Built a real-time cricket scoreboard with team management and toss features, optimized with PostgreSQL for high-performance data handling.",
    image: "/images/KADD.avif", // Use local image for KADD-CRIC
    tags: ["Java Swing", "PostgreSQL", "Java", "JDBC"],
    demoLink: "#",
    githubLink: "https://github.com/edith797/KADD-CRIC",
  },
  {
    title: "Portfolio Website",
    description: "A modern portfolio website with smooth animations, responsive design, and interactive elements.",
    image: "/images/port.avif",
    tags: ["React", "Anime.js", "Tailwind CSS", "Vite"],
    demoLink: "#",
    githubLink: "#",
  },
  {
    title: "SPRACHE-FLUX : REAL TIME TRANSLATOR",
    description:
      "Developed Sprache-Flux, a real-time translator using Python, Flask, and neural networks, featuring speech-to-text, NMT-based translation, and audio file processing.",
    image: "/images/translator.avif",
    tags: ["Python", "Neural Networks", "Flask"],
    demoLink: "#",
    githubLink: "https://github.com/edith797/SpracheFlux",
  },
  {
    title: "MEDTRACK",
    description:
      "Built MEDTRACK, a Next.js-based frontend for streamlined medical record viewing, styled with Tailwind CSS for clean, intuitive usability.",
    image: "/images/MED.avif",
    tags: ["Next.js", "Tailwind CSS", "JavaScript"],
    demoLink: "#",
    githubLink: "https://github.com/edith797/MEDTRACK",
  },
];


  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entries[0].target)

          // Apply tilt effect to project cards after they become visible
          setTimeout(() => {
            const projectCards = document.querySelectorAll(".project-card")
            projectCards.forEach((card) => {
              createTiltEffect(card, { max: 10, scale: 1.03 })
            })
          }, 1000)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>

        {/* Main project box without 3D effect */}
        <div
          className="relative bg-muted rounded-xl overflow-hidden shadow-xl mt-12 transition-opacity duration-1000 perspective"
          style={{ opacity: isVisible ? 1 : 0 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 md:h-auto">
              <img
                src={projects[activeProject].image || "/placeholder.svg"}
                alt={projects[activeProject].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
            </div>

            <div className="p-6 md:p-8 flex flex-col">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">{projects[activeProject].title}</h3>

              <p className="text-muted-foreground mb-6">{projects[activeProject].description}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {projects[activeProject].tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex gap-4">
                <a
                  href={projects[activeProject].demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <ExternalLink size={16} />
              
                </a>
                <a
                  href={projects[activeProject].githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  <Github size={16} />
                  Source Code
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 flex gap-2">
            <button
              onClick={prevProject}
              className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
              aria-label="Previous project"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextProject}
              className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
              aria-label="Next project"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="absolute bottom-4 left-4 flex gap-1">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveProject(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeProject ? "w-6 bg-primary" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Project cards with 3D tilt effect */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-muted rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 perspective project-card"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(50px)",
                transition: `opacity 0.8s ease, transform 0.8s ease ${index * 0.2}s`,
              }}
              onMouseMove={(e) => {
                const card = e.currentTarget
                const rect = card.getBoundingClientRect()
                const x = e.clientX - rect.left
                const y = e.clientY - rect.top
                const centerX = rect.width / 2
                const centerY = rect.height / 2
                const rotateX = (y - centerY) / 15
                const rotateY = (centerX - x) / 15
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)"
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <div className="flex gap-4">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
                      aria-label="View live demo"
                    >
                      <ExternalLink size={18} />
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80 transition-colors"
                      aria-label="View source code"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
