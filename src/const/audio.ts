export const AUDIO = {
  VOLUME: 0.12,
  /** Gain floor the exponential ramp decays to (it cannot reach 0). */
  SILENCE: 0.0001,
} as const

export interface Note {
  /** Frequency in Hz. */
  hz: number
  /** Start offset in seconds from the call. */
  at: number
  /** Length in seconds. */
  length: number
  type: OscillatorType
}

export const SOUND = {
  FLIP: 'flip',
  ELIMINATE: 'eliminate',
  WIN: 'win',
  TICK: 'tick',
  TIME_UP: 'timeUp',
} as const

export type SoundName = (typeof SOUND)[keyof typeof SOUND]

/** Each sound is a few short synthesised notes; no audio files to download or cache. */
export const SOUNDS: Record<SoundName, Note[]> = {
  [SOUND.FLIP]: [{ hz: 660, at: 0, length: 0.08, type: 'triangle' }],
  [SOUND.TICK]: [{ hz: 880, at: 0, length: 0.05, type: 'square' }],
  [SOUND.ELIMINATE]: [
    { hz: 220, at: 0, length: 0.14, type: 'sawtooth' },
    { hz: 147, at: 0.12, length: 0.22, type: 'sawtooth' },
  ],
  [SOUND.TIME_UP]: [
    { hz: 740, at: 0, length: 0.15, type: 'square' },
    { hz: 740, at: 0.22, length: 0.15, type: 'square' },
    { hz: 740, at: 0.44, length: 0.3, type: 'square' },
  ],
  [SOUND.WIN]: [
    { hz: 523, at: 0, length: 0.14, type: 'triangle' },
    { hz: 659, at: 0.14, length: 0.14, type: 'triangle' },
    { hz: 784, at: 0.28, length: 0.14, type: 'triangle' },
    { hz: 1047, at: 0.42, length: 0.4, type: 'triangle' },
  ],
}
