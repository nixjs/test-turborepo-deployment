import { Types } from '@athena20/ts-types'
import { HistoryTypes } from '../../types/history'

export interface HistoryState {
    betResults: Types.Nullable<HistoryTypes.BetResultReply[]>
}
