import { HiLoPlaceBetRequest, HiLoPlaceBetReply } from '@athena20/game-portal/inhouse-game/rpc/hilo_place_bet_pb'
import { HiLoCashOutRequest, HiLoCashOutReply } from '@athena20/game-portal/inhouse-game/rpc/hilo_cash_out_pb'
import { HiLoCreateNewTurnRequest, HiLoCreateNewTurnReply } from '@athena20/game-portal/inhouse-game/rpc/hilo_create_new_turn_pb'
import { HiLoCheckExistTurnReply } from '@athena20/game-portal/inhouse-game/rpc/hilo_check_exist_turn_pb'
import { HiLoGetBetInfoRequest, HiLoGetBetInfoReply } from '@athena20/game-portal/inhouse-game/rpc/hilo_get_bet_info_pb'
import { HiLoInitBetInfoRequest } from '@athena20/game-portal/inhouse-game/rpc/hilo_init_bet_info_pb'
import * as hiloCardPb from '@athena20/game-portal/inhouse-game/model/hilo_card_pb'
import * as hiloTurnOptionPb from '@athena20/game-portal/inhouse-game/model/hilo_turn_option_pb'
import * as hiloTurnPb from '@athena20/game-portal/inhouse-game/model/hilo_turn_pb'
import { HiLoDirection, HiLoTurnStatus } from 'modules/game/hilo/consts/enum'

export namespace GameBaseTypes {
    export interface CommitHashInfo {
        commitHash: string
        signature: string
    }
    export interface Turn {
        turnId: string
        commitHashInfo: CommitHashInfo
    }

    export type Card = {
        suit: number
        value: number
    }

    export type InitBetInCreateNewTurn = {
        betAmount: string
        currencySymbol: string
    }

    export interface HiLoCard extends hiloCardPb.HiLoCard.AsObject {}
    export interface HiLoTurnOption extends hiloTurnOptionPb.HiLoTurnOption.AsObject {}
    export interface HiLoTurn extends hiloTurnPb.HiLoTurn.AsObject {
        status: HiLoTurnStatus
        initCard?: HiLoCard
        offeredOptionsList: Array<HiLoTurnOption>
        direction: HiLoDirection
        luckyCard?: HiLoCard
    }

    export interface CreateNewTurnRequest extends HiLoCreateNewTurnRequest.AsObject {}
    export interface CreateNewTurnReply extends HiLoCreateNewTurnReply.AsObject {}

    export interface CheckTurnExistedTurnReply extends HiLoCheckExistTurnReply.AsObject {}

    export interface PlaceBetRequest extends HiLoPlaceBetRequest.AsObject {}
    export interface PlaceBetReply extends HiLoPlaceBetReply.AsObject {}

    export interface CashOutRequest extends HiLoCashOutRequest.AsObject {}
    export interface CashOutReply extends HiLoCashOutReply.AsObject {}

    export interface BetInfoRequest extends HiLoGetBetInfoRequest.AsObject {}
    export interface BetInfoReply extends HiLoGetBetInfoReply.AsObject {}

    export interface InitBetInfoRequest extends HiLoInitBetInfoRequest.AsObject {}
}

export namespace ResultTypes {}
