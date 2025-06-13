"use client"

import type React from "react"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ChartData {
  label: string
  value: number
  color: string
  percentage?: number
}

interface BarChartProps {
  data: ChartData[]
  title: string
  description?: string
  height?: number
}

export function BarChart({ data, title, description, height = 200 }: BarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <Card className="border-primary/10">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium">{item.label}</span>
                <span className="text-muted-foreground">{item.value}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface DonutChartProps {
  data: ChartData[]
  title: string
  description?: string
  size?: number
}

export function DonutChart({ data, title, description, size = 160 }: DonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  const dataWithPercentages = useMemo(() => {
    return data.map((item) => ({
      ...item,
      percentage: total > 0 ? (item.value / total) * 100 : 0,
    }))
  }, [data, total])

  let cumulativePercentage = 0
  const radius = size / 2 - 20
  const innerRadius = radius * 0.6
  const center = size / 2

  return (
    <Card className="border-primary/10">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <svg width={size} height={size} className="transform -rotate-90">
              {dataWithPercentages.map((item, index) => {
                const startAngle = (cumulativePercentage / 100) * 360
                const endAngle = ((cumulativePercentage + item.percentage) / 100) * 360
                cumulativePercentage += item.percentage

                const startAngleRad = (startAngle * Math.PI) / 180
                const endAngleRad = (endAngle * Math.PI) / 180

                const x1 = center + radius * Math.cos(startAngleRad)
                const y1 = center + radius * Math.sin(startAngleRad)
                const x2 = center + radius * Math.cos(endAngleRad)
                const y2 = center + radius * Math.sin(endAngleRad)

                const x3 = center + innerRadius * Math.cos(endAngleRad)
                const y3 = center + innerRadius * Math.sin(endAngleRad)
                const x4 = center + innerRadius * Math.cos(startAngleRad)
                const y4 = center + innerRadius * Math.sin(startAngleRad)

                const largeArcFlag = item.percentage > 50 ? 1 : 0

                const pathData = [
                  `M ${x1} ${y1}`,
                  `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                  `L ${x3} ${y3}`,
                  `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${x4} ${y4}`,
                  "Z",
                ].join(" ")

                return (
                  <path
                    key={index}
                    d={pathData}
                    fill={item.color}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                )
              })}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">{total}</div>
                <div className="text-sm text-muted-foreground">Total</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full">
            {dataWithPercentages.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.label}</span>
                <span className="text-muted-foreground ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface LineChartProps {
  data: { label: string; value: number; date: string }[]
  title: string
  description?: string
  height?: number
}

export function LineChart({ data, title, description, height = 200 }: LineChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value))
  const minValue = Math.min(...data.map((d) => d.value))
  const range = maxValue - minValue || 1

  const width = 300
  const padding = 40

  const points = data.map((item, index) => {
    const x = padding + (index / (data.length - 1)) * (width - 2 * padding)
    const y = height - padding - ((item.value - minValue) / range) * (height - 2 * padding)
    return { x, y, ...item }
  })

  const pathData = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ")

  return (
    <Card className="border-primary/10">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="relative">
          <svg width={width} height={height} className="w-full">
            {/* Grille */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" opacity="0.3" />

            {/* Ligne */}
            <path d={pathData} fill="none" stroke="#3B82F6" strokeWidth="2" className="transition-all duration-300" />

            {/* Points */}
            {points.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="4"
                fill="#3B82F6"
                className="transition-all duration-300 hover:r-6"
              />
            ))}

            {/* Labels X */}
            {points.map((point, index) => (
              <text
                key={index}
                x={point.x}
                y={height - 10}
                textAnchor="middle"
                className="text-xs fill-muted-foreground"
              >
                {point.label}
              </text>
            ))}
          </svg>
        </div>
      </CardContent>
    </Card>
  )
}

interface MetricCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: "increase" | "decrease" | "neutral"
    period: string
  }
  icon?: React.ReactNode
  color?: string
}

export function MetricCard({ title, value, change, icon, color = "#3B82F6" }: MetricCardProps) {
  const getChangeColor = (type: string) => {
    switch (type) {
      case "increase":
        return "text-green-600"
      case "decrease":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "increase":
        return "↗"
      case "decrease":
        return "↘"
      default:
        return "→"
    }
  }

  return (
    <Card className="border-primary/10 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold" style={{ color }}>
              {value}
            </p>
            {change && (
              <div className={`flex items-center gap-1 text-sm ${getChangeColor(change.type)}`}>
                <span>{getChangeIcon(change.type)}</span>
                <span>
                  {Math.abs(change.value)}% {change.period}
                </span>
              </div>
            )}
          </div>
          {icon && (
            <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
              <div style={{ color }}>{icon}</div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface ProgressRingProps {
  percentage: number
  size?: number
  strokeWidth?: number
  color?: string
  label?: string
}

export function ProgressRing({ percentage, size = 120, strokeWidth = 8, color = "#3B82F6", label }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="transparent" />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold" style={{ color }}>
          {percentage}%
        </span>
        {label && <span className="text-xs text-muted-foreground text-center">{label}</span>}
      </div>
    </div>
  )
}
