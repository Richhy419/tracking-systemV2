"use client"

import { useEffect, useRef, useState } from "react"

interface Point {
  x: number
  y: number
  size: number
  speed: number
  connections: number[]
}

interface AnimatedMapProps {
  className?: string
  pointColor?: string
  lineColor?: string
  pointCount?: number
}

export function AnimatedMap({
  className = "",
  pointColor = "rgba(6, 182, 212, 0.8)",
  lineColor = "rgba(6, 182, 212, 0.2)",
  pointCount = 30,
}: AnimatedMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateDimensions = () => {
      const { offsetWidth, offsetHeight } = canvas
      const devicePixelRatio = window.devicePixelRatio || 1

      canvas.width = offsetWidth * devicePixelRatio
      canvas.height = offsetHeight * devicePixelRatio

      ctx.scale(devicePixelRatio, devicePixelRatio)

      setDimensions({
        width: offsetWidth,
        height: offsetHeight,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = dimensions

    // Create points
    const points: Point[] = []
    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.5 + 0.1,
        connections: [],
      })
    }

    // Find connections between points
    const connectionDistance = Math.min(width, height) * 0.2
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dx = points[i].x - points[j].x
        const dy = points[i].y - points[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          points[i].connections.push(j)
          points[j].connections.push(i)
        }
      }
    }

    // Animation loop
    let animationFrame: number
    const animate = () => {
      ctx.clearRect(0, 0, width, height)

      // Draw connections
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 0.5

      for (let i = 0; i < points.length; i++) {
        const point = points[i]

        for (const connectionIndex of point.connections) {
          const connectedPoint = points[connectionIndex]

          ctx.beginPath()
          ctx.moveTo(point.x, point.y)
          ctx.lineTo(connectedPoint.x, connectedPoint.y)
          ctx.stroke()
        }
      }

      // Draw and update points
      for (const point of points) {
        // Draw point
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2)
        ctx.fillStyle = pointColor
        ctx.fill()

        // Update position
        point.y += point.speed

        // Reset if out of bounds
        if (point.y > height + 5) {
          point.y = -5
          point.x = Math.random() * width
        }
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [dimensions, pointColor, lineColor, pointCount])

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} />
}
