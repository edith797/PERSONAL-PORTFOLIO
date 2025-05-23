// A completely rewritten animation utility that handles errors and missing elements
let animeInstance = null

// This function loads anime.js and returns the instance
export async function loadAnime() {
  if (!animeInstance) {
    try {
      // Try different import approaches
      try {
        // Use named import instead of default import
        const module = await import("animejs")
        // Check if it's a named export or default export
        animeInstance = module.default || module

        // If we have a module but no default export, use the module itself
        if (!animeInstance && typeof module === "object") {
          animeInstance = module
        }
      } catch (e) {
        console.error("Failed first anime.js import attempt:", e)
        try {
          // Try alternative path
          const module = await import("animejs/lib/anime.es.js")
          animeInstance = module.default || module

          // If we have a module but no default export, use the module itself
          if (!animeInstance && typeof module === "object") {
            animeInstance = module
          }
        } catch (err) {
          console.error("Failed second anime.js import attempt:", err)
          // Fallback to a minimal animation API to prevent errors
          animeInstance = createFallbackAnime()
        }
      }

      // Final check to ensure we have a valid function
      if (typeof animeInstance !== "function") {
        console.error("Anime.js loaded but is not a function:", animeInstance)
        animeInstance = createFallbackAnime()
      }
    } catch (error) {
      console.error("Failed to load anime.js:", error)
      // Fallback to a minimal animation API to prevent errors
      animeInstance = createFallbackAnime()
    }
  }
  return animeInstance
}

// Create a fallback animation function that does nothing but doesn't error
function createFallbackAnime() {
  const noop = () => {}
  const fallback = (params) => {
    console.warn("Using fallback animation (anime.js not loaded)")
    return {
      pause: noop,
      play: noop,
      restart: noop,
      finished: Promise.resolve(),
    }
  }

  fallback.stagger = () => 0
  fallback.timeline = (params) => {
    return {
      add: () => fallback.timeline(params),
      finished: Promise.resolve(),
      pause: noop,
      play: noop,
      restart: noop,
    }
  }

  return fallback
}

// A safer way to run animations that checks if elements exist first
export async function safeAnimate(config) {
  try {
    const anime = await loadAnime()
    if (!anime) return null

    // Check if targets exist in the DOM before animating
    if (config.targets) {
      const targets = config.targets

      if (typeof targets === "string") {
        const elements = document.querySelectorAll(targets)
        if (!elements || elements.length === 0) {
          console.warn(`Animation targets not found: ${targets}`)
          return createFallbackAnime()(config)
        }
        // Replace string selector with actual elements to avoid anime.js internal selector issues
        config = { ...config, targets: Array.from(elements) }
      } else if (targets instanceof NodeList) {
        if (targets.length === 0) {
          console.warn(`Animation targets (NodeList) are empty`)
          return createFallbackAnime()(config)
        }
        // Convert NodeList to Array to avoid issues
        config = { ...config, targets: Array.from(targets) }
      } else if (Array.isArray(targets)) {
        if (targets.length === 0 || targets.some((t) => !t)) {
          console.warn(`Animation targets (Array) are empty or contain null elements`)
          return createFallbackAnime()(config)
        }
        // Filter out any null/undefined elements
        config = { ...config, targets: targets.filter(Boolean) }
      } else if (!targets) {
        console.warn(`Animation target is null or undefined`)
        return createFallbackAnime()(config)
      }
    }

    // Ensure the DOM is ready before animating
    return new Promise((resolve) => {
      // Use requestAnimationFrame to ensure the DOM is ready
      requestAnimationFrame(() => {
        try {
          const animation = anime(config)
          resolve(animation)
        } catch (error) {
          console.error("Animation execution error:", error)
          resolve(createFallbackAnime()(config))
        }
      })
    })
  } catch (error) {
    console.error("Animation error:", error)
    return createFallbackAnime()(config)
  }
}

// For backward compatibility - alias safeAnimate as useAnime
export const useAnime = safeAnimate

// A safer timeline creator
export async function safeAnimeTimeline(options = {}) {
  try {
    const anime = await loadAnime()
    if (!anime || !anime.timeline) {
      console.warn("Anime.js timeline not available")
      return createFallbackAnime().timeline(options)
    }

    return new Promise((resolve) => {
      // Use requestAnimationFrame to ensure the DOM is ready
      requestAnimationFrame(() => {
        try {
          const timeline = anime.timeline(options)
          resolve(timeline)
        } catch (error) {
          console.error("Timeline creation error:", error)
          resolve(createFallbackAnime().timeline(options))
        }
      })
    })
  } catch (error) {
    console.error("Timeline creation error:", error)
    return createFallbackAnime().timeline(options)
  }
}

// For backward compatibility - alias safeAnimeTimeline as useAnimeTimeline
export const useAnimeTimeline = safeAnimeTimeline

// CSS Animation Fallbacks
export function applyCssAnimation(element, animationName, duration = 1000, delay = 0) {
  if (!element) return

  const elements =
    typeof element === "string" ? document.querySelectorAll(element) : element instanceof NodeList ? element : [element]

  Array.from(elements).forEach((el) => {
    if (!el) return

    el.style.animation = "none"
    // Force reflow
    void el.offsetWidth

    el.style.animationName = animationName
    el.style.animationDuration = `${duration}ms`
    el.style.animationDelay = `${delay}ms`
    el.style.animationFillMode = "forwards"
  })
}

// Add CSS animations as a fallback
const cssAnimations = `
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
`

// Add the CSS animations to the document
if (typeof document !== "undefined") {
  const style = document.createElement("style")
  style.textContent = cssAnimations
  document.head.appendChild(style)
}
