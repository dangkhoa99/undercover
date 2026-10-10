import { AUDIO, SOUNDS, type SoundName } from '@/const/audio'
import { useSettingsStore } from '@/store/settingsStore'

export type { SoundName }

let context: AudioContext | null = null

/** Plays a sound unless the player turned sound off. Silently does nothing without Web Audio. */
export const playSound = (name: SoundName) => {
  if (!useSettingsStore.getState().sound) {
    return
  }

  const Ctor = window.AudioContext
  if (!Ctor) {
    return
  }

  context ??= new Ctor()
  if (context.state === 'suspended') {
    void context.resume()
  }

  const start = context.currentTime
  for (const note of SOUNDS[name]) {
    const osc = context.createOscillator()
    const gain = context.createGain()
    const from = start + note.at

    osc.type = note.type
    osc.frequency.value = note.hz
    gain.gain.setValueAtTime(AUDIO.VOLUME, from)
    gain.gain.exponentialRampToValueAtTime(AUDIO.SILENCE, from + note.length)
    osc.connect(gain).connect(context.destination)
    osc.start(from)
    osc.stop(from + note.length)
  }
}
