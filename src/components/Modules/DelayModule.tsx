import { memo } from 'react'
import { Knob } from '../Controls'
import { DEFAULT_EFFECT_PARAMS } from '../../types/synth.types'

interface DelayModuleProps {
  time: number
  feedback: number
  wet: number
  onTimeChange: (value: number) => void
  onFeedbackChange: (value: number) => void
  onWetChange: (value: number) => void
  className?: string
}

export const DelayModule = memo(function DelayModule({
  time,
  feedback,
  wet,
  onTimeChange,
  onFeedbackChange,
  onWetChange,
  className = '',
}: DelayModuleProps) {
  return (
    <div className={`module-panel ${className}`}>
      <h3 className="module-title">Delay</h3>
      <div className="mb-3 grid grid-cols-[1fr_0.7fr] gap-1.5">
        <div className="h-1.5 rounded-full bg-ableton-bg shadow-[inset_0_0_0_1px_rgba(104,87,61,0.7)]">
          <div
            className="h-full rounded-full bg-ableton-accent"
            style={{ width: `${Math.min(100, Math.max(8, time * 100))}%` }}
          />
        </div>
        <div className="h-1.5 rounded-full bg-ableton-bg shadow-[inset_0_0_0_1px_rgba(104,87,61,0.7)]">
          <div
            className="h-full rounded-full bg-ableton-green"
            style={{ width: `${Math.round(feedback * 100)}%` }}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Knob
          value={time}
          min={0.01}
          max={1}
          onChange={onTimeChange}
          label="Time"
          unit="s"
          size="sm"
          displayValue={(v) => v.toFixed(2)}
          defaultValue={DEFAULT_EFFECT_PARAMS.delay.time}
        />
        <Knob
          value={feedback}
          min={0}
          max={0.9}
          onChange={onFeedbackChange}
          label="Fdbk"
          size="sm"
          displayValue={(v) => `${Math.round(v * 100)}%`}
          defaultValue={DEFAULT_EFFECT_PARAMS.delay.feedback}
        />
        <Knob
          value={wet}
          min={0}
          max={1}
          onChange={onWetChange}
          label="Mix"
          size="sm"
          displayValue={(v) => `${Math.round(v * 100)}%`}
          defaultValue={DEFAULT_EFFECT_PARAMS.delay.wet}
        />
      </div>
    </div>
  )
})
