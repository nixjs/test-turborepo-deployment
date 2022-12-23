import { sound } from 'modules/game/hilo/utils/sound'

export type SoundEvent = 'click' | 'error' | 'win' | 'lost' | 'play'

export type SourceType<T> = Record<SoundEvent | string, T>

export type SoundInstance = {
    sound: sound | null
}
