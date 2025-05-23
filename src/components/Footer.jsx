"use client"

import { ChevronUp, Mail, Github, Twitter, Linkedin, Instagram } from "lucide-react"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const socialLinks = [
    { name: "Github", icon: <Github className="h-5 w-5" />, url: "https://github.com/edith797" },
    { name: "Twitter", icon: <Twitter className="h-5 w-5" />, url: "#" },
    { name: "LinkedIn", icon: <Linkedin className="h-5 w-5" />, url: "https://linkedin.com/in/aakashb0204" },
    { name: "Instagram", icon: <Instagram className="h-5 w-5" />, url: "#" },
  ]

  return (
    <footer className="bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-purple-500/50 to-primary-foreground/50"></div>

      {/* Main footer content */}
      <div className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <a href="#" className="text-2xl font-bold relative group inline-block">
                <span className="text-primary">AA</span>KASH
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-purple-500 to-primary-foreground transform scale-x-0 transition-transform origin-left group-hover:scale-x-100 duration-300"></span>
              </a>
              <p className="text-muted-foreground mt-2 max-w-md">
                Creating exceptional digital experiences with clean code and modern design.
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <button
                onClick={scrollToTop}
                className="p-3 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors mb-4 group"
                aria-label="Scroll to top"
              >
                <ChevronUp className="h-6 w-6 text-primary group-hover:animate-bounce" />
              </button>
              <p className="text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} Aakash. All rights reserved.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-medium mb-4 relative inline-block">
                  Contact
                  <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary"></span>
                </h4>
                <ul className="space-y-2">
                  <li className="text-muted-foreground flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                   Coimbatore, Tamil Nadu
                  </li>
                  <li>
                    <a
                      href="mailto:hello@example.com"
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                    >
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      aakashb0204@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+1234567890"
                      className="text-muted-foreground hover:text-primary transition-colors flex items-center"
                    >
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                    9361362701
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-4 relative inline-block">
                  Connect
                  <span className="absolute -bottom-1 left-0 w-1/2 h-0.5 bg-primary"></span>
                </h4>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="p-3 bg-background rounded-full border border-border hover:bg-primary/10 hover:border-primary hover:text-primary transition-all duration-300 button-3d"
                      aria-label={`Follow on ${social.name}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Follow me on social media for updates and tech insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Missing import
const Phone = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
    </svg>
  )
}

const MapPin = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  )
}

export default Footer
