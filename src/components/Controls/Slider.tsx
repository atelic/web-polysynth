import { useCallback, useRef, useState, useEffect } from 'react'

interface SliderProps {
  value: number
  min: number
  max: number
  onChange: (value: number) => void
  label: string
  unit?: string
  orientation?: 'horizontal' | 'vertical'
  displayValue?: (value: number) => string
}

export function Slider({
  value,
  min,
  max,
  onChange,
  label,
  unit = '',
  orientation = 'horizontal',
  displayValue,
}: SliderProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  const normalizedValue = (value - min) / (max - min)

  const updateValue = useCallback(
    (e: MouseEvent | React.MouseEvent['nativeEvent']) => {
      if (!trackRef.current) return

      const rect = trackRef.current.getBoundingClientRect()
      let normalized: number

      if (orientation === 'horizontal') {
        normalized = (e.clientX - rect.left) / rect.width
      } else {
        normalized = 1 - (e.clientY - rect.top) / rect.height
      }

      normalized = Math.max(0, Math.min(1, normalized))
      const newValue = min + normalized * (max - min)
      onChange(newValue)
    },
    [min, max, orientation, onChange]
  )

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    updateValue(e.nativeEvent)
  }, [updateValue])

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      updateValue(e)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, updateValue])

  const formattedValue = displayValue ? displayValue(value) : value.toFixed(1)

  if (orientation === 'vertical') {
    return (
      <div className="flex flex-col items-center gap-2">
        <span className="knob-label">{label}</span>
        <div
          ref={trackRef}
          className="relative h-24 w-2 cursor-pointer rounded-full bg-ableton-bg shadow-[inset_0_0_0_1px_rgba(104,87,61,0.7)]"
          onMouseDown={handleMouseDown}
        >
          {/* Fill */}
          <div
            className="absolute bottom-0 left-0 right-0 rounded-full bg-ableton-accent transition-all"
            style={{ height: `${normalizedValue * 100}%` }}
          />
          {/* Handle */}
          <div
            className="absolute left-1/2 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-ableton-accent bg-ableton-text shadow-knob"
            style={{ bottom: `calc(${normalizedValue * 100}% - 8px)` }}
          />
        </div>
        <span className="knob-value text-xs">
          {formattedValue}
          {unit}
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <span className="knob-label">{label}</span>
        <span className="knob-value text-xs">
          {formattedValue}
          {unit}
        </span>
      </div>
      <div
        ref={trackRef}
        className="relative h-2 cursor-pointer rounded-full bg-ableton-bg shadow-[inset_0_0_0_1px_rgba(104,87,61,0.7)]"
        onMouseDown={handleMouseDown}
      >
        {/* Fill */}
        <div
          className="absolute bottom-0 left-0 top-0 rounded-full bg-ableton-accent transition-all"
          style={{ width: `${normalizedValue * 100}%` }}
        />
        {/* Handle */}
        <div
          className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-ableton-accent bg-ableton-text shadow-knob"
          style={{ left: `calc(${normalizedValue * 100}% - 8px)` }}
        />
      </div>
    </div>
  )
}
