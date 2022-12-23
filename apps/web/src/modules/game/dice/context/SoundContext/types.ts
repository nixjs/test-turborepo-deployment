import { sound } from 'modules/game/dice/utils/sound'

export type SoundEvent = 'click' | 'error' | 'win' | 'lost' | 'dice'

export type SourceType<T> = Record<SoundEvent | string, T>

export type SoundInstance = {
    sound: sound | null
}
