export const InHouseRequestMethods = {
    GET_GAMES_INFO: 'getGamesInfo',

    DICE_CREATE_NEW_TURN: 'diceCreateNewTurn',
    DICE_PLACE_BET: 'dicePlaceBet',
    DICE_GET_LAST_RESULTS: 'diceGetLastResults',
    DICE_GET_BET_INFO: 'diceGetBetInfo',
    DICE_GET_CONFIG: 'diceGetConfig',

    GET_SMART_CONTRACT_CONFIG: 'getSmartContractConfig',

    COIN_FLIP_GET_CONFIG: 'coinFlipGetConfig',
    COIN_FLIP_CREATE_NEW_TURN: 'coinFlipCreateNewTurn',
    COIN_FLIP_PLACE_BET: 'coinFlipPlaceBet',
    COIN_FLIP_CASH_OUT: 'coinFlipCashOut',
    COIN_FLIP_GET_BET_INFO: 'coinFlipGetBetInfo',

    SPACE_DICE_CREATE_NEW_TURN: 'spaceDiceCreateNewTurn',
    SPACE_DICE_PLACE_BET: 'spaceDicePlaceBet',
    SPACE_DICE_GET_LAST_RESULTS: 'spaceDiceGetLastResults',
    SPACE_DICE_GET_BET_INFO: 'spaceDiceGetBetInfo',
    SPACE_DICE_GET_CONFIG: 'spaceDiceGetConfig',

    LIMBO_CREATE_NEW_TURN: 'limboCreateNewTurn',
    LIMBO_PLACE_BET: 'limboPlaceBet',
    LIMBO_GET_LAST_RESULTS: 'limboGetLastResults',
    LIMBO_GET_BET_INFO: 'limboGetBetInfo',
    LIMBO_GET_CONFIG: 'limboGetConfig',

    HILO_GET_CONFIG: 'hiLoGetConfig',
    HILO_CREATE_NEW_TURN: 'hiLoCreateNewTurn',
    HILO_PLACE_BET: 'hiLoPlaceBet',
    HILO_CASH_OUR: 'hiLoCashOut',
    HILO_GET_BET_INFO: 'hiLoGetBetInfo'
}

export const GameHistoryRequestMethods = {
    GET_BET_RESULTS: 'findBetResultsByFilters'
}
