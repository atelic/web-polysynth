import { memo } from 'react'
import { Knob } from '../Controls'
import {
  FilterEnvelopeParams,
  DEFAULT_EFFECT_PARAMS,
  DEFAULT_FILTER_ENVELOPE_PARAMS,
} from '../../types/synth.types'
import { AUDIO_CONSTANTS } from '../../constants/audio'

interface FilterModuleProps {
  lowpassFreq: number
  lowpassQ: number
  highpassFreq: number
  highpassQ: number
  filterEnvelope: FilterEnvelopeParams
  onLowpassFreqChange: (value: number) => void
  onLowpassQChange: (value: number) => void
  onHighpassFreqChange: (value: number) => void
  onHighpassQChange: (value: number) => void
  onFilterEnvAttackChange: (value: number) => void
  onFilterEnvDecayChange: (value: number) => void
  onFilterEnvSustainChange: (value: number) => void
  onFilterEnvReleaseChange: (value: number) => void
  onFilterEnvAmountChange: (value: number) => void
  className?: string
}

function formatFrequency(freq: number): string {
  if (freq >= 1000) {
    return `${(freq / 1000).toFixed(1)}k`
  }
  return freq.toFixed(0)
}

function formatTime(time: number): string {
  if (time >= 1) {
    return `${time.toFixed(1)}s`
  }
  return `${(time * 1000).toFixed(0)}ms`
}

export const FilterModule = memo(function FilterModule({
  lowpassFreq,
  lowpassQ,
  highpassFreq,
  highpassQ,
  filterEnvelope,
  onLowpassFreqChange,
  onLowpassQChange,
  onHighpassFreqChange,
  onHighpassQChange,
  onFilterEnvAttackChange,
  onFilterEnvDecayChange,
  onFilterEnvSustainChange,
  onFilterEnvReleaseChange,
  onFilterEnvAmountChange,
  className = '',
}: FilterModuleProps) {
  return (
    <div className={`module-panel ${className}`}>
      <h3 className="module-title">Filter</h3>
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
          <Knob
            value={lowpassFreq}
            min={20}
            max={20000}
            onChange={onLowpassFreqChange}
            label="LPF"
            unit="Hz"
            size="xs"
            displayValue={formatFrequency}
            defaultValue={DEFAULT_EFFECT_PARAMS.lowpass.frequency}
          />
          <Knob
            value={lowpassQ}
            min={0.1}
            max={15}
            onChange={onLowpassQChange}
            label="LP Q"
            size="xs"
            displayValue={(v) => v.toFixed(1)}
            defaultValue={DEFAULT_EFFECT_PARAMS.lowpass.Q}
          />
          <Knob
            value={highpassFreq}
            min={20}
            max={AUDIO_CONSTANTS.HIGHPASS_MAX_FREQ_HZ}
            onChange={onHighpassFreqChange}
            label="HPF"
            unit="Hz"
            size="xs"
            displayValue={formatFrequency}
            defaultValue={DEFAULT_EFFECT_PARAMS.highpass.frequency}
          />
          <Knob
            value={highpassQ}
            min={0.1}
            max={15}
            onChange={onHighpassQChange}
            label="HP Q"
            size="xs"
            displayValue={(v) => v.toFixed(1)}
            defaultValue={DEFAULT_EFFECT_PARAMS.highpass.Q}
          />
        </div>

        <div className="border-t border-ableton-bg pt-3">
          <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ableton-text-muted">
            Env
          </div>
          <div className="grid grid-cols-5 gap-1.5">
            <Knob
              value={filterEnvelope.attack}
              min={0.001}
              max={2}
              onChange={onFilterEnvAttackChange}
              label="A"
              size="xs"
              displayValue={formatTime}
              defaultValue={DEFAULT_FILTER_ENVELOPE_PARAMS.attack}
            />
            <Knob
              value={filterEnvelope.decay}
              min={0.001}
              max={2}
              onChange={onFilterEnvDecayChange}
              label="D"
              size="xs"
              displayValue={formatTime}
              defaultValue={DEFAULT_FILTER_ENVELOPE_PARAMS.decay}
            />
            <Knob
              value={filterEnvelope.sustain}
              min={0}
              max={1}
              onChange={onFilterEnvSustainChange}
              label="S"
              size="xs"
              displayValue={(v) => `${(v * 100).toFixed(0)}%`}
              defaultValue={DEFAULT_FILTER_ENVELOPE_PARAMS.sustain}
            />
            <Knob
              value={filterEnvelope.release}
              min={0.001}
              max={3}
              onChange={onFilterEnvReleaseChange}
              label="R"
              size="xs"
              displayValue={formatTime}
              defaultValue={DEFAULT_FILTER_ENVELOPE_PARAMS.release}
            />
            <Knob
              value={filterEnvelope.amount}
              min={0}
              max={1}
              onChange={onFilterEnvAmountChange}
              label="Amt"
              size="xs"
              displayValue={(v) => `${(v * 100).toFixed(0)}%`}
              defaultValue={DEFAULT_FILTER_ENVELOPE_PARAMS.amount}
            />
          </div>
        </div>
      </div>
    </div>
  )
})
