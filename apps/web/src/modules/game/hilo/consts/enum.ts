import { HiLoCardSuit } from '@athena20/game-portal/inhouse-game/model/hilo_card_suit_pb'
import { HiLoCardValue } from '@athena20/game-portal/inhouse-game/model/hilo_card_value_pb'
import { HiLoDirection } from '@athena20/game-portal/inhouse-game/model/hilo_direction_pb'
import { HiLoTurnStatus } from '@athena20/game-portal/inhouse-game/model/hilo_turn_status_pb'
import { MB } from '@lottery/utils'

export { HiLoCardSuit, HiLoCardValue, HiLoDirection, HiLoTurnStatus }

export enum MessageBrokerKey {
    FETCH_AVAILABLE_BALANCE = MB.TYPE_CONVENTION.HILO + 1,
    HILO_CREATE_NEW_TURN = MB.TYPE_CONVENTION.HILO + 2,
    HILO_PLACE_BET_RESULT = MB.TYPE_CONVENTION.HILO + 3,
    HILO_PLACE_CASH_OUT = MB.TYPE_CONVENTION.HILO + 4,
    HILO_PLACE_CASH_OUT_ERROR = MB.TYPE_CONVENTION.HILO + 5,
    HILO_GET_BET_RESULTS = MB.TYPE_CONVENTION.HILO + 6,
    HILO_GET_LAST_RESULTS = MB.TYPE_CONVENTION.HILO + 7,
    HILO_GET_BET_INFO = MB.TYPE_CONVENTION.HILO + 8,
    HILO_BET_RESULT_NOTIFICATION = MB.TYPE_CONVENTION.HILO + 9,
    HILO_GET_BET_RESULT_FAIRNESS = MB.TYPE_CONVENTION.HILO + 10,
    HILO_PLACE_BET_ERROR = MB.TYPE_CONVENTION.HILO + 11
}

export enum MessageBrokerID {
    HILO_CHECK_FAIRNESS,
    HILO_GAME_BOARD,
    HILO_TABLE_RESULT,
    HILO_LAST_BET,
    HILO_BET_DETAIL,
    HILO_GAME,
    HILO_NEW_TURN_FORM_BETTING,
    HILO_BALANCE_AND_CASH_OUT_FORM_BETTING,
    HILO_JACKPOTS
}

export enum GameStatePlay {
    WIN = 1,
    LOSS,
    INIT
}

export enum ResultTabConfig {
    ALL_BET,
    MY_BET,
    HIGH_ROLLER,
    RARE_WIN
}
