"use client"

import { useEffect, useRef, useState } from "react"
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"

const Testimonials = () => {
  const sectionRef = useRef(null)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO at TechStart",
      image: "/placeholder.svg?height=100&width=100&text=SJ",
      text: "Working with Aakash was an absolute pleasure. His technical skills are matched only by his creativity and problem-solving abilities. He delivered our project ahead of schedule and exceeded all expectations.",
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      image: "/placeholder.svg?height=100&width=100&text=MC",
      text: "Aakash has a rare combination of technical expertise and design sensibility. He transformed our concept into a beautiful, functional application that our users love. I highly recommend his services.",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      image: "/placeholder.svg?height=100&width=100&text=ER",
      text: "Our website redesign project was in capable hands with Aakash. He understood our brand vision perfectly and created a site that not only looks stunning but also performs exceptionally well. A true professional!",
    },
  ]

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

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
      // Animate title
      const title = document.querySelector(".testimonials-title")
      if (title) {
        title.style.opacity = "1"
        title.style.transform = "translateY(0)"
        title.style.transition = "opacity 1s, transform 1s"
      }

      // Animate testimonial card
      const card = document.querySelector(".testimonial-card")
      if (card) {
        card.style.opacity = "1"
        card.style.transform = "translateY(0)"
        card.style.transition = "opacity 1s, transform 1s"
      }
    }
  }, [isVisible])

  useEffect(() => {
    // Animate testimonial change
    const content = document.querySelector(".testimonial-content")
    if (content) {
      content.style.opacity = "0"
      content.style.transform = "translateX(20px)"

      setTimeout(() => {
        content.style.opacity = "1"
        content.style.transform = "translateX(0)"
        content.style.transition = "opacity 0.5s, transform 0.5s"
      }, 300)
    }
  }, [activeTestimonial])

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      nextTestimonial()
    }, 5000)

    return () => clearInterval(interval)
  }, [isVisible, activeTestimonial])

  return (
    <section id="testimonials" ref={sectionRef} className="section-padding bg-background">
      <div className="container mx-auto">
        <h2 className="testimonials-title section-title opacity-0" style={{ transform: "translateY(50px)" }}>
          Client Testimonials
        </h2>

        <div
          className="testimonial-card opacity-0 relative bg-muted rounded-xl overflow-hidden shadow-xl max-w-4xl mx-auto mt-12"
          style={{ transform: "translateY(50px)" }}
        >
          <div className="absolute top-6 left-6 text-primary/20">
            <Quote size={60} />
          </div>

          <div className="p-12 pt-16">
            <div className="testimonial-content">
              <p className="text-xl mb-8 relative z-10">"{testimonials[activeTestimonial].text}"</p>

              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-primary">
                  <img
                    src={testimonials[activeTestimonial].image || "/placeholder.svg"}
                    alt={testimonials[activeTestimonial].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-muted-foreground">{testimonials[activeTestimonial].role}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 right-6 flex gap-2">
            <button
              onClick={prevTestimonial}
              className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="absolute bottom-6 left-6 flex gap-1">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeTestimonial ? "w-6 bg-primary" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
