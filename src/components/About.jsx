"use client"

import { useEffect, useRef, useState } from "react"
import { FileDown, Code, Layout, Smartphone, Database, Lightbulb, Star, Award, Trophy, BarChart2 } from "lucide-react"

const About = () => {
  const sectionRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  const skills = ["JavaScript", "React", "Node.js", "UI/UX Design", "Data Analysis", "Visualization"]

  const achievements = [
    {
      icon: <Award className="h-8 w-8 text-yellow-400" />,
      title: "Finalist - Melinia Hackathon",
      description: "Recognized for innovative solutions in a competitive environment",
    },
    {
      icon: <Trophy className="h-8 w-8 text-yellow-400" />,
      title: "Top Performer",
      description: "Consistently delivered high-quality projects ahead of schedule",
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-400" />,
      title: "Innovation Excellence",
      description: "Created groundbreaking solutions for complex problems",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isVisible) {
      // Animate elements with CSS classes
      const animateElements = document.querySelectorAll(".about-animate")
      animateElements.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add("about-animate-start")
        }, index * 200)
      })

      // Animate image
      setTimeout(() => {
        const image = document.querySelector(".about-image")
        if (image) image.classList.add("about-image-animate")
      }, 300)

      // Animate skill badges
      const skillBadges = document.querySelectorAll(".skill-badge")
      skillBadges.forEach((badge, index) => {
        setTimeout(
          () => {
            badge.classList.add("skill-badge-animate")
          },
          500 + index * 100,
        )
      })

      // Animate achievement cards
      const achievementCards = document.querySelectorAll(".achievement-card")
      achievementCards.forEach((card, index) => {
        setTimeout(
          () => {
            card.classList.add("achievement-card-animate")
          },
          800 + index * 150,
        )
      })

      // Animate service cards
      const serviceCards = document.querySelectorAll(".service-card")
      serviceCards.forEach((card, index) => {
        setTimeout(
          () => {
            card.classList.add("service-card-animate")
          },
          1000 + index * 100,
        )
      })
    }
  }, [isVisible])

  return (
    <section id="about" ref={sectionRef} className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          About <span className="text-primary">Me</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="about-image relative group">
            <div className="relative z-10 rounded-lg overflow-hidden border-4 border-primary/20 transition-all duration-500 group-hover:border-primary/40">
              <img
                src="/images/edith.jpg"
                alt="Aakash"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Aakash</h3>
                  <p className="text-white/80">Full Stack Developer • UI/UX Designer • Data Analyst</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 w-full h-full bg-secondary rounded-lg -z-10 transition-all duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>

            {/* Animated decorative elements */}
            <div className="absolute -top-4 -left-4 bg-background rounded-lg p-3 shadow-lg border border-border z-20 transform rotate-6 transition-transform duration-500 group-hover:rotate-12 group-hover:-translate-y-2">
              <Code className="h-6 w-6 text-primary" />
            </div>

            <div className="absolute -bottom-4 left-1/4 bg-background rounded-lg p-3 shadow-lg border border-border z-20 transform -rotate-3 transition-transform duration-500 group-hover:-rotate-6 group-hover:translate-y-2">
              <BarChart2 className="h-6 w-6 text-primary" />
            </div>
          </div>

          <div>
            <p className="about-animate text-lg mb-6">
              Hi, I'm <span className="text-primary font-semibold">Aakash</span>, a passionate professional with
              expertise spanning full-stack development, UI/UX design, and data analysis. With extensive experience in
              the field, I've worked on a diverse range of projects from startups to enterprise solutions.
            </p>

            <p className="about-animate text-lg mb-6">
              My approach combines technical expertise with creative problem-solving and data-driven insights. I believe
              in creating intuitive user experiences backed by solid development and meaningful data analysis that solve
              real problems.
            </p>

            <p className="about-animate text-lg mb-8">
              When I'm not coding or designing, you can find me exploring new technologies, contributing to open-source
              projects, or analyzing datasets to uncover valuable insights.
            </p>

            {/* Skill badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="skill-badge inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>

            <a
              href="/resume.pdf"
              download="Aakash_Resume.pdf"
              className="about-animate inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-all duration-300 hover:shadow-lg group button-3d"
            >
              <FileDown className="mr-2 h-5 w-5 group-hover:animate-bounce" />
              Download Resume
            </a>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold mb-10 text-center about-animate">
            Achievements & <span className="text-primary">Recognition</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="achievement-card bg-background p-6 rounded-xl shadow-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl card-3d"
              >
                <div className="mb-4 p-4 bg-primary/10 rounded-full inline-block">{achievement.icon}</div>
                <h4 className="text-xl font-bold mb-2">{achievement.title}</h4>
                <p className="text-muted-foreground">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-20" id="services">
          <h3 className="text-3xl font-bold mb-10 text-center about-animate">
            What I <span className="text-primary">Do</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Code className="h-12 w-12 text-primary" />,
                title: "Full Stack Development",
                description: "Building robust web applications with the latest technologies and best practices.",
              },
              {
                icon: <Layout className="h-12 w-12 text-primary" />,
                title: "UI/UX Design",
                description:
                  "Creating beautiful, intuitive interfaces with modern design principles and attention to detail.",
              },
              {
                icon: <BarChart2 className="h-12 w-12 text-primary" />,
                title: "Data Analysis",
                description:
                  "Transforming raw data into actionable insights through advanced analytics and visualization.",
              },
              {
                icon: <Smartphone className="h-12 w-12 text-primary" />,
                title: "Mobile Development",
                description: "Developing cross-platform mobile applications that work seamlessly on iOS and Android.",
              },
              {
                icon: <Database className="h-12 w-12 text-primary" />,
                title: "Database Solutions",
                description: "Designing and implementing efficient database structures for optimal data management.",
              },
              {
                icon: <Lightbulb className="h-12 w-12 text-primary" />,
                title: "Consulting",
                description:
                  "Providing expert advice on technology, design, and data strategies to enhance your digital products.",
              },
            ].map((service, index) => (
              <div
                key={index}
                className="service-card bg-background rounded-xl p-6 shadow-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl relative overflow-hidden group card-3d perspective"
                onMouseMove={(e) => {
                  const card = e.currentTarget
                  const rect = card.getBoundingClientRect()
                  const x = e.clientX - rect.left
                  const y = e.clientY - rect.top
                  const centerX = rect.width / 2
                  const centerY = rect.height / 2
                  const rotateX = (y - centerY) / 10
                  const rotateY = (centerX - x) / 10
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16 transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>

                <div className="relative z-10">
                  <div className="mb-4 p-3 bg-primary/10 inline-block rounded-lg transform group-hover:rotate-6 transition-transform duration-300">
                    {service.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground">{service.description}</p>

                  <div className="mt-6 h-1 w-12 bg-primary rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
