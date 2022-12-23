import { Types } from '@athena20/ts-types'

export interface GamingJoined {
    id: number | string
    name: string
}

export interface GameState {
    joinGameLoading: boolean
    gamingJoined: Types.Nullable<GamingJoined>
}
