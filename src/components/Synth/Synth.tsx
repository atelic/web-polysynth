import { useSynth } from '../../context'
import { useKeyboard } from '../../hooks/useKeyboard'
import { VisualizerErrorBoundary } from '../ErrorBoundary'
import { Keyboard } from '../Keyboard'
import {
  MasterModule,
  FilterModule,
  ReverbModule,
  DelayModule,
  DistortionModule,
  OscillatorModule,
  LFOModule,
  PitchModule,
  ChorusModule,
  PhaserModule,
  TempoModule,
  ArpeggiatorModule,
} from '../Modules'
import { VUMeter, WaveformDisplay, SpectrumAnalyzer } from '../Visualizers'
import { PresetManager } from '../Presets'

function StartOverlay({ onStart }: { onStart: () => void }) {
  return (
    <div className="start-room min-h-[100dvh] bg-ableton-bg px-4 py-4">
      <div className="start-card">
        <div>
          <div className="start-display">
            <span className="status-dot" />
            <span>Audio off</span>
          </div>
          <h1 className="start-title">Web PolySynth</h1>
          <p className="start-copy">Enable audio to open the synth.</p>
        </div>
        <button
          onClick={onStart}
          className="start-button"
        >
          Start
        </button>
      </div>
    </div>
  )
}

function SynthUI() {
  const synth = useSynth()

  useKeyboard({
    onNoteOn: synth.handleNoteOn,
    onNoteOff: synth.handleNoteOff,
    onOctaveChange: synth.handleOctaveChange,
    enabled: synth.isInitialized,
  })

  return (
    <div className="synth-shell min-h-[100dvh] bg-ableton-bg p-3 md:p-5">
      <header className="synth-header">
        <div className="brand-block">
          <div className="brand-kicker">
            <span className="status-dot" />
            <span>{synth.isPlaying ? 'Signal present' : 'Standing by'}</span>
          </div>
          <h1 className="brand-title">Web PolySynth</h1>
          <p className="brand-subtitle">four voices / browser-native signal lab</p>
        </div>
        <div className="scope-cluster">
          <VisualizerErrorBoundary name="Waveform">
            <WaveformDisplay
              className="scope-wave"
              getWaveformData={synth.getWaveformData}
              isPlaying={synth.isPlaying}
              compact
            />
          </VisualizerErrorBoundary>
          <VisualizerErrorBoundary name="Spectrum">
            <SpectrumAnalyzer
              getFFTData={synth.getFFTData}
              isActive={synth.isInitialized}
              compact
              className="scope-spectrum"
            />
          </VisualizerErrorBoundary>
          <VisualizerErrorBoundary name="VU Meter">
            <VUMeter
              getMeterLevel={synth.getMeterLevel}
              isPlaying={synth.isPlaying}
              compact
              className="scope-meter"
            />
          </VisualizerErrorBoundary>
        </div>
      </header>

      <div className="keybed-stage">
        <Keyboard
          activeKeys={synth.activeKeys}
          onNoteOn={synth.handleNoteOn}
          onNoteOff={synth.handleNoteOff}
        />
      </div>

      <div className="module-rack">
        <MasterModule
          className="rack-master"
          volume={synth.params.master.volume}
          attack={synth.params.master.attack}
          release={synth.params.master.release}
          waveform={synth.params.master.waveform}
          octave={synth.params.master.octave}
          mono={synth.params.master.mono}
          onVolumeChange={synth.setVolume}
          onAttackChange={synth.setAttack}
          onReleaseChange={synth.setRelease}
          onWaveformChange={synth.setWaveform}
          onOctaveChange={synth.setOctave}
          onMonoChange={synth.setMonoMode}
        />

        <OscillatorModule
          className="rack-oscillator"
          params={synth.params.oscillator}
          onWaveformChange={synth.setWaveform}
          onSubOscLevelChange={synth.setSubOscLevel}
          onSubOscOctaveChange={synth.setSubOscOctave}
          onNoiseLevelChange={synth.setNoiseLevel}
          onNoiseTypeChange={synth.setNoiseType}
        />

        <PitchModule
          className="rack-pitch"
          glideParams={synth.params.glide}
          pitchBendValue={synth.pitchBendValue}
          pitchBendRange={synth.params.pitchBendRange}
          onGlideEnabledChange={synth.setGlideEnabled}
          onGlideTimeChange={synth.setGlideTime}
          onPitchBendChange={synth.setPitchBend}
          onPitchBendRangeChange={synth.setPitchBendRange}
        />

        <FilterModule
          className="rack-filter"
          lowpassFreq={synth.params.effects.lowpass.frequency}
          lowpassQ={synth.params.effects.lowpass.Q}
          highpassFreq={synth.params.effects.highpass.frequency}
          highpassQ={synth.params.effects.highpass.Q}
          filterEnvelope={synth.params.filterEnvelope}
          onLowpassFreqChange={synth.setLowpassFrequency}
          onLowpassQChange={synth.setLowpassQ}
          onHighpassFreqChange={synth.setHighpassFrequency}
          onHighpassQChange={synth.setHighpassQ}
          onFilterEnvAttackChange={synth.setFilterEnvAttack}
          onFilterEnvDecayChange={synth.setFilterEnvDecay}
          onFilterEnvSustainChange={synth.setFilterEnvSustain}
          onFilterEnvReleaseChange={synth.setFilterEnvRelease}
          onFilterEnvAmountChange={synth.setFilterEnvAmount}
        />

        <LFOModule
          className="rack-lfo"
          lfoParams={synth.params.lfo}
          modRouting={synth.params.modRouting}
          onRateChange={synth.setLFORate}
          onDepthChange={synth.setLFODepth}
          onWaveformChange={synth.setLFOWaveform}
          onRoutingChange={synth.setModRouting}
        />

        <TempoModule
          className="rack-tempo"
          bpm={synth.tempo.bpm}
          isPlaying={synth.tempo.isPlaying}
          onBpmChange={synth.setBpm}
          onTapTempo={synth.tapTempo}
          onToggleTransport={synth.toggleTransport}
        />

        <DistortionModule
          className="rack-distortion"
          amount={synth.params.effects.distortion.amount}
          wet={synth.params.effects.distortion.wet}
          onAmountChange={synth.setDistortionAmount}
          onWetChange={synth.setDistortionWet}
        />

        <ChorusModule
          className="rack-chorus"
          params={synth.params.chorus}
          onRateChange={synth.setChorusRate}
          onDepthChange={synth.setChorusDepth}
          onWetChange={synth.setChorusWet}
        />

        <PhaserModule
          className="rack-phaser"
          params={synth.params.phaser}
          onRateChange={synth.setPhaserRate}
          onDepthChange={synth.setPhaserDepth}
          onWetChange={synth.setPhaserWet}
        />

        <DelayModule
          className="rack-delay"
          time={synth.params.effects.delay.time}
          feedback={synth.params.effects.delay.feedback}
          wet={synth.params.effects.delay.wet}
          onTimeChange={synth.setDelayTime}
          onFeedbackChange={synth.setDelayFeedback}
          onWetChange={synth.setDelayWet}
        />

        <ReverbModule
          className="rack-reverb"
          decay={synth.params.effects.reverb.decay}
          wet={synth.params.effects.reverb.wet}
          onDecayChange={synth.setReverbDecay}
          onWetChange={synth.setReverbWet}
        />

        <ArpeggiatorModule
          className="rack-arpeggiator"
          params={synth.arpeggiator.params}
          onEnabledChange={synth.setArpEnabled}
          onPatternChange={synth.setArpPattern}
          onRateChange={synth.setArpRate}
          onOctavesChange={synth.setArpOctaves}
        />

      </div>

      <div className="preset-strip">
        <PresetManager
          presets={synth.presets.presets}
          currentPresetId={synth.presets.currentPresetId}
          onLoadPreset={synth.loadPreset}
          onSavePreset={synth.savePreset}
          onDeletePreset={synth.deletePreset}
          onInitPreset={synth.initPreset}
          onReset={synth.handleReset}
          getCurrentParams={synth.getCurrentParams}
          isUserPreset={synth.isUserPreset}
        />
      </div>

      <footer className="synth-footer">
        React / Tone.js / Tailwind CSS
      </footer>
    </div>
  )
}

export function Synth() {
  const synth = useSynth()

  if (!synth.isInitialized) {
    return <StartOverlay onStart={synth.initializeAudio} />
  }

  return <SynthUI />
}
