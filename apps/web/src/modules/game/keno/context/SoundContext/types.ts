import { sound } from 'modules/game/keno/utils/sound'

export type SoundEvent = 'click' | 'error' | 'win' | 'lost' | 'play' | 'select'

export type SourceType<T> = Record<SoundEvent | string, T>

export type SoundInstance = {
    sound: sound | null
}
