import { MB } from '@lottery/utils'
import { DiceDirection } from '@athena20/game-portal/inhouse-game/model/dice_direction_pb'

export { DiceDirection }

export enum DiceRadius {
    BASE = 50
}

export enum MessageBrokerKey {
    FETCH_AVAILABLE_BALANCE = MB.TYPE_CONVENTION.DICE + 1,
    DICE_CREATE_NEW_TURN = MB.TYPE_CONVENTION.DICE + 2,
    DICE_PLACE_BET_RESULT = MB.TYPE_CONVENTION.DICE + 3,
    DICE_PLACE_BET_FROM_DELAY_RESULT = MB.TYPE_CONVENTION.DICE + 4,
    DICE_GET_BET_RESULTS = MB.TYPE_CONVENTION.DICE + 5,
    DICE_GET_LAST_RESULTS = MB.TYPE_CONVENTION.DICE + 6,
    DICE_GET_BET_INFO = MB.TYPE_CONVENTION.DICE + 7,
    DICE_BET_RESULT_NOTIFICATION = MB.TYPE_CONVENTION.DICE + 8,
    DICE_GET_BET_RESULT_FAIRNESS = MB.TYPE_CONVENTION.DICE + 9,
    DICE_PLACE_BET_ERROR = MB.TYPE_CONVENTION.DICE + 10,
    DICE_PAUSE_AUTO_BET = MB.TYPE_CONVENTION.DICE + 11
}

export enum MessageBrokerID {
    DICE_CHECK_FAIRNESS,
    DICE_GAME_BOARD,
    DICE_TABLE_RESULT,
    DICE_LAST_BET,
    DICE_BET_DETAIL,
    DICE_GAME,
    DICE_BOARD_CENTER,
    DICE_JACKPOTS
}

export enum GameStatePlay {
    WIN = 1,
    LOSS,
    INIT
}

export enum RareType {
    RESET,
    INCREASE
}

export enum AutoPlayStatus {
    BALANCE_NOT_ENOUGH = 1,
    MAXIMUM_NUMBER_OF_BET,
    STOP_ON_PROFIT,
    STOP_ON_LOSS,
    NEW_TURN
}

export enum ResultTabConfig {
    ALL_BET,
    MY_BET,
    HIGH_ROLLER,
    RARE_WIN
}
