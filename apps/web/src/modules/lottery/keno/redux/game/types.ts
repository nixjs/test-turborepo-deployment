import { Types } from '@athena20/ts-types'
import { LotteryCommonTypes } from '@lottery/types'
import { LotteryTypes } from 'modules/lottery/keno/types'

export interface GameState {
    draws: LotteryCommonTypes.Draw[]
    drawsVersion: string
    tickerPriceDefault?: LotteryTypes.OurTicketPriceDefault
    ticketOrder: Types.Object<LotteryTypes.OurTicket>
    ticketSessionSelected?: LotteryTypes.OurTicket & { id: string }
    numberChoiceModal: boolean
    drawingConfig?: LotteryTypes.DrawingConfig
    ticketSession: Types.Object<LotteryTypes.OurTicket>
    quantity: number
    numbers: number[]
    spots: number[]
    spotDefault: number
    spotSelected: number
    config?: LotteryCommonTypes.Config
    // drawMapByDate?: Map<string, LotteryCommonTypes.Draw[]>
    drawMapByDate?: LotteryTypes.DrawByDate
    drawSelectedList: Types.Nullable<Types.Object<LotteryCommonTypes.Draw>>
    createOrderLoading: boolean
}
