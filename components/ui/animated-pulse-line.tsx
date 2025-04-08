"use client"

import { useEffect, useRef } from "react"

interface AnimatedPulseLineProps {
  color?: string
  height?: number
  className?: string
}

export function AnimatedPulseLine({ color = "#06b6d4", height = 40, className = "" }: AnimatedPulseLineProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const devicePixelRatio = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * devicePixelRatio
      canvas.height = height * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Generate pulse line data
    const generatePoints = () => {
      const width = canvas.offsetWidth
      const points = []
      const segments = 20
      const segmentWidth = width / segments

      for (let i = 0; i <= segments; i++) {
        const x = i * segmentWidth
        const y = height / 2
        points.push({ x, y, originalY: y })
      }

      return points
    }

    const points = generatePoints()
    let animationFrame: number
    let time = 0

    // Animation function
    const animate = () => {
      time += 0.05

      // Clear canvas
      ctx.clearRect(0, 0, canvas.offsetWidth, height)

      // Update points
      points.forEach((point, i) => {
        // Create a wave effect
        if (i > 0 && i < points.length - 1) {
          const noise = Math.sin(time + i * 0.3) * 8
          point.y = point.originalY + noise
        }
      })

      // Draw the line
      ctx.beginPath()
      ctx.moveTo(0, height / 2)

      // Draw curve through points
      for (let i = 0; i < points.length - 1; i++) {
        const xc = (points[i].x + points[i + 1].x) / 2
        const yc = (points[i].y + points[i + 1].y) / 2
        ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
      }

      // Connect to the end
      ctx.lineTo(canvas.offsetWidth, height / 2)

      // Style and stroke the line
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw pulse circles at certain points
      const pulsePoints = [
        Math.floor(points.length * 0.25),
        Math.floor(points.length * 0.5),
        Math.floor(points.length * 0.75),
      ]

      pulsePoints.forEach((index) => {
        if (points[index]) {
          const pulseSize = 4 + Math.sin(time * 2) * 2
          ctx.beginPath()
          ctx.arc(points[index].x, points[index].y, pulseSize, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.fill()
        }
      })

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [color, height])

  return <canvas ref={canvasRef} className={`w-full h-[${height}px] ${className}`} style={{ height: `${height}px` }} />
}
