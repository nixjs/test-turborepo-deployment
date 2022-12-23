import * as ConfigPb from '@athena20/game-portal/lottery/model/config_pb'
import * as DrawPb from '@athena20/game-portal/lottery/model/draw_pb'
import * as TicketPricePb from '@athena20/game-portal/lottery/model/ticket_prices_pb'
import * as DrawingConfigPb from '@athena20/game-portal/lottery/model/drawing_config_pb'
import * as PayoutConfigPb from '@athena20/game-portal/lottery/model/payout_config_pb'
import * as TicketInputPb from '@athena20/game-portal/lottery/model/ticket_input_pb'
import * as SetOfNumberPb from '@athena20/game-portal/lottery/model/set_of_number_pb'
import * as OrderPb from '@athena20/game-portal/lottery/model/order_pb'
import * as TicketPb from '@athena20/game-portal/lottery/model/ticket_pb'
import * as PrizeOfNumberPb from '@athena20/game-portal/lottery/model/prize_of_number_pb'
import * as LotteryEnum from './enum'
import { Mega645Types } from './mega645'
import { GameSymbol, BoolFilter } from '../enum'

export namespace LotteryCommonTypes {
    export interface Config extends ConfigPb.Config.AsObject {
        drawingWeekdaysList: LotteryEnum.DrawingWeekday[]
        ticketPricesList: TicketPrice[]
        drawingConfig?: DrawingConfig
        payoutConfigs?: PayoutConfig
        configMega645?: Mega645Types.ConfigMega645
    }
    export interface TicketPrice extends TicketPricePb.TicketPrice.AsObject {
        valuesList: string[]
    }

    export interface Draw extends DrawPb.Draw.AsObject {
        status: LotteryEnum.DrawStatus
    }
    export interface DrawingConfig extends DrawingConfigPb.DrawingConfig.AsObject {}

    export interface PayoutConfig extends PayoutConfigPb.PayoutConfig.AsObject {
        keno?: PayoutConfigPb.PayoutKeno.AsObject
        mega645?: PayoutMega645
    }
    export interface PayoutKeno {
        currenciesMap: [string, PayoutKenoCurrency][]
    }
    export interface PayoutKenoPrize {
        multipliersMap: [number, number][]
        maxPayout: string
    }
    export interface PayoutKenoCurrency {
        prizesMap: [number, PayoutKenoPrize][]
    }
    export interface PayoutMega645 {
        prizesMap: [number, number][]
    }
    export interface TicketInput extends TicketInputPb.TicketInput.AsObject {
        setOfNumbersList: Array<SetOfNumber>
    }
    export interface KenoSetOfNumber extends SetOfNumberPb.KenoSetOfNumber.AsObject {}
    export interface Mega645SetOfNumber extends SetOfNumberPb.Mega645SetOfNumber.AsObject {}
    export interface SetOfNumber extends SetOfNumberPb.SetOfNumber.AsObject {
        kenoSetOfNumber?: KenoSetOfNumber
        mega645SetOfNumber?: Mega645SetOfNumber
    }
    export interface BaseSetOfNumber extends SetOfNumberPb.BaseSetOfNumber.AsObject {}
    export interface PrizeOfNumber extends PrizeOfNumberPb.PrizeOfNumber.AsObject {
        maxPayout: BoolFilter
    }
    export interface Ticket extends TicketPb.Ticket.AsObject {
        setOfNumbersList: Array<BaseSetOfNumber>
        status: LotteryEnum.TicketStatus
        draw?: Draw
        prizeOfNumbersList: Array<PrizeOfNumber>
    }
    export interface Order extends OrderPb.Order.AsObject {
        status: LotteryEnum.OrderStatus
        ticketsList: Array<Ticket>
        gameSymbol: GameSymbol
    }
}
