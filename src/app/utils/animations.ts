import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Check if the user has requested reduced motion
 */
export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Clean up all active ScrollTrigger instances
 */
export function cleanupScrollAnimations(): void {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
}

/**
 * Refresh ScrollTrigger measurements (e.g. after dynamic DOM changes or image loads)
 */
export function refreshAnimations(): void {
  if (typeof window === "undefined" || isReducedMotion()) return
  requestAnimationFrame(() => {
    ScrollTrigger.refresh()
  })
}

/**
 * Trigger smooth page entrance transition
 */
export function triggerPageTransition(container: HTMLElement): void {
  if (!container || isReducedMotion()) return

  gsap.fromTo(
    container,
    {
      opacity: 0,
      y: 16,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.42,
      ease: "power2.out",
      clearProps: "transform,opacity",
    },
  )
}

/**
 * Initialize all scroll-based animations within the target container
 * Features:
 * - Left-to-right reveals (.anim-left, [data-anim="left"])
 * - Right-to-left reveals (.anim-right, [data-anim="right"])
 * - Slide-up reveals (.anim-up, [data-anim="up"])
 * - Scale reveals (.anim-scale, [data-anim="scale"])
 * - Image clipping & reveal transitions (.anim-image, [data-anim="image"])
 * - Bidirectional triggers (scroll down and scroll up)
 * - Staggered groups (.anim-stagger-group)
 */
export function initScrollAnimations(container: HTMLElement): () => void {
  if (!container) return () => {}

  // If user prefers reduced motion, ensure all animated elements are immediately visible
  if (isReducedMotion()) {
    const allAnimated = container.querySelectorAll<HTMLElement>(
      ".anim-left, .anim-right, .anim-up, .anim-down, .anim-scale, .anim-image, .reveal-item, [data-anim]",
    )
    allAnimated.forEach((el) => {
      el.style.opacity = "1"
      el.style.transform = "none"
      el.style.clipPath = "none"
      el.classList.add("is-revealed")
    })
    return () => {}
  }

  // Use gsap.context for scoped, bulletproof memory management and automatic cleanup
  const ctx = gsap.context(() => {
    // 1. Left-to-Right Slide-in Animations (.anim-left)
    const leftElements = container.querySelectorAll<HTMLElement>(
      ".anim-left, [data-anim='left']",
    )
    leftElements.forEach((el) => {
      const delay = parseFloat(el.getAttribute("data-anim-delay") || "0")
      gsap.fromTo(
        el,
        {
          opacity: 0,
          x: -50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
          },
        },
      )
    })

    // 2. Right-to-Left Slide-in Animations (.anim-right)
    const rightElements = container.querySelectorAll<HTMLElement>(
      ".anim-right, [data-anim='right']",
    )
    rightElements.forEach((el) => {
      const delay = parseFloat(el.getAttribute("data-anim-delay") || "0")
      gsap.fromTo(
        el,
        {
          opacity: 0,
          x: 50,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.85,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
          },
        },
      )
    })

    // 3. Slide-Up Fade-in Animations (.anim-up)
    const upElements = container.querySelectorAll<HTMLElement>(
      ".anim-up, [data-anim='up']",
    )
    upElements.forEach((el) => {
      const delay = parseFloat(el.getAttribute("data-anim-delay") || "0")
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
          },
        },
      )
    })

    // 4. Scale-in Animations (.anim-scale)
    const scaleElements = container.querySelectorAll<HTMLElement>(
      ".anim-scale, [data-anim='scale']",
    )
    scaleElements.forEach((el) => {
      const delay = parseFloat(el.getAttribute("data-anim-delay") || "0")
      gsap.fromTo(
        el,
        {
          opacity: 0,
          scale: 0.92,
          y: 20,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
          },
        },
      )
    })

    // 5. Modern Image Reveal Animations (.anim-image)
    // Features smooth clip-path wipe from left to right, subtle un-zoom, and curtain sweep
    const imageElements = container.querySelectorAll<HTMLElement>(
      ".anim-image, [data-anim='image']",
    )
    imageElements.forEach((el) => {
      const img = el.querySelector("img")
      const curtain = el.querySelector<HTMLElement>(".image-curtain")

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          end: "bottom 12%",
          toggleActions: "play reverse play reverse",
        },
      })

      // Image container clip-path expands from left to right
      tl.fromTo(
        el,
        {
          clipPath: "inset(0% 100% 0% 0% round 1.5rem)",
          opacity: 0,
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 1.5rem)",
          opacity: 1,
          duration: 0.95,
          ease: "power3.inOut",
        },
        0,
      )

      // Inner image zooms slightly down to 1 and slides in
      if (img) {
        tl.fromTo(
          img,
          {
            scale: 1.15,
            x: -25,
          },
          {
            scale: 1,
            x: 0,
            duration: 1.1,
            ease: "power2.out",
          },
          0,
        )
      }

      // Optional curtain layer sweeps away to reveal
      if (curtain) {
        tl.fromTo(
          curtain,
          {
            xPercent: 0,
          },
          {
            xPercent: 101,
            duration: 0.8,
            ease: "power3.inOut",
          },
          0.1,
        )
      }
    })

    // 6. Staggered Children Groups (.anim-stagger-group)
    const staggerGroups = container.querySelectorAll<HTMLElement>(
      ".anim-stagger-group, [data-anim-stagger]",
    )
    staggerGroups.forEach((group) => {
      const children = Array.from(group.children) as HTMLElement[]
      if (!children.length) return

      const direction = group.getAttribute("data-stagger-direction") || "up"
      const staggerDelay = parseFloat(
        group.getAttribute("data-stagger-delay") || "0.08",
      )

      const fromVars: gsap.TweenVars = { opacity: 0 }
      const toVars: gsap.TweenVars = {
        opacity: 1,
        duration: 0.75,
        ease: "power3.out",
        stagger: staggerDelay,
        scrollTrigger: {
          trigger: group,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play reverse play reverse",
        },
      }

      if (direction === "left") {
        fromVars.x = -40
        toVars.x = 0
      } else if (direction === "right") {
        fromVars.x = 40
        toVars.x = 0
      } else if (direction === "scale") {
        fromVars.scale = 0.9
        fromVars.y = 15
        toVars.scale = 1
        toVars.y = 0
      } else {
        fromVars.y = 30
        toVars.y = 0
      }

      gsap.fromTo(children, fromVars, toVars)
    })

    // 7. General Section Headings & Legacy .reveal-item support
    const legacyTargets = container.querySelectorAll<HTMLElement>(
      "section:not(:first-child) .container-wide > .section-title, .legacy-reveal",
    )
    legacyTargets.forEach((target, index) => {
      if (
        target.classList.contains("anim-left") ||
        target.classList.contains("anim-right") ||
        target.classList.contains("anim-up") ||
        target.classList.contains("anim-scale")
      ) {
        return
      }

      gsap.fromTo(
        target,
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          delay: (index % 3) * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: target,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play reverse play reverse",
          },
        },
      )
    })
  }, container)

  // Give DOM a frame to compute styles, then refresh ScrollTrigger positions
  requestAnimationFrame(() => {
    ScrollTrigger.refresh()
  })

  // Return teardown function
  return () => {
    ctx.revert()
  }
}
