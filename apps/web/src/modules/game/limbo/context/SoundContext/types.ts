import { sound } from 'modules/game/limbo/utils/sound'

export type SoundEvent = 'click' | 'error' | 'win' | 'lost' | 'dice'

export type SourceType<T> = Record<SoundEvent | string, T>

export type SoundInstance = {
    sound: sound | null
}
