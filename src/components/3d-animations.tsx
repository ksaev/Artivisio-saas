"use client"

import type React from "react"

import { useEffect, useRef } from "react"

export function FloatingCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`animate-float transform-gpu ${className}`}>{children}</div>
}

export function RotatingIcon({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`animate-rotate-3d transform-style-3d ${className}`}>{children}</div>
}

export function PulsingElement({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`animate-pulse-3d transform-gpu ${className}`}>{children}</div>
}

export function ParallaxSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrolled = window.pageYOffset
        const parallax = scrolled * 0.5
        ref.current.style.transform = `translateY(${parallax}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div ref={ref} className={`transform-gpu ${className}`}>
      {children}
    </div>
  )
}

export function HoverCard3D({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`perspective-1000 ${className}`}>
      <div className="transform-style-3d transition-transform duration-300 hover:rotateX-12 hover:rotateY-12 hover:scale-105">
        {children}
      </div>
    </div>
  )
}
