"use client"

import { useEffect, useRef, useState } from "react"
import {
  Code,
  Globe,
  Server,
  Database,
  Figma,
  GitBranch,
  Cpu,
  Layers,
  Palette,
  Terminal,
  Zap,
  Smartphone,
  BarChart2,
  PieChart,
  TrendingUp,
} from "lucide-react"

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const skillCategories = [
    {
      title: "Development",
      skills: [
        { name: "React", level: 90 },
        { name: "JavaScript", level: 95 },
        { name: "Node.js", level: 85 },
        { name: "Angular", level: 80 },
        { name: "HTML/CSS", level: 90 },
      ],
    },
    {
      title: "UI/UX Design",
      skills: [
        { name: "Figma", level: 85 },
        { name: "User Research", level: 80 },
        { name: "Wireframing", level: 85 },
        { name: "Prototyping", level: 75 },
        { name: "Visual Design", level: 80 },
      ],
    },
    {
      title: "Data Analysis",
      skills: [
        { name: "Data Visualization", level: 85 },
        { name: "SQL", level: 80 },
        { name: "Python", level: 75 },
        { name: "Statistical Analysis", level: 70 },
        { name: "Power BI", level: 75 },
      ],
    },
  ]

  // Map of skill names to Lucide icons
  const skillIcons = {
    JavaScript: <Code className="w-8 h-8" />,
    React: <Zap className="w-8 h-8" />,
    "Node.js": <Server className="w-8 h-8" />,
    TypeScript: <Terminal className="w-8 h-8" />,
    "HTML/CSS": <Layers className="w-8 h-8" />,
    Figma: <Figma className="w-8 h-8" />,
    "User Research": <Palette className="w-8 h-8" />,
    "Data Visualization": <BarChart2 className="w-8 h-8" />,
    SQL: <Database className="w-8 h-8" />,
    Python: <Code className="w-8 h-8" />,
    "Statistical Analysis": <TrendingUp className="w-8 h-8" />,
    PowerBI: <PieChart className="w-8 h-8" />,
    Git: <GitBranch className="w-8 h-8" />,
    Docker: <Cpu className="w-8 h-8" />,
    AWS: <Server className="w-8 h-8" />,
    CSS3: <Palette className="w-8 h-8" />,
    PostgreSQL: <Database className="w-8 h-8" />,
    GraphQL: <Globe className="w-8 h-8" />,
    "CI/CD": <Zap className="w-8 h-8" />,
    Mobile: <Smartphone className="w-8 h-8" />,
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entries[0].target)
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
    <section id="skills" ref={sectionRef} className="py-16 px-4 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
          My <span className="text-primary">Skills</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-background rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-6 text-primary">{category.title}</h3>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>

                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: isVisible ? `${skill.level}%` : "0%",
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {[
            "JavaScript",
            "React",
            "Node.js",
            "Figma",
            "Data Visualization",
            "SQL",
            "TypeScript",
            "HTML/CSS",
            "User Research",
            "Python",
            "Statistical Analysis",
            "Power BI",
          ].map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 bg-background rounded-lg shadow-md hover:shadow-lg transition-all card-3d"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`,
              }}
            >
              <div className="w-16 h-16 mb-3 flex items-center justify-center bg-muted rounded-full text-primary">
                {skillIcons[tech] || <Code className="w-8 h-8" />}
              </div>
              <span className="text-sm font-medium">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
