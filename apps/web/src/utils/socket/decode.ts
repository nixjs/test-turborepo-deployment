import { Proto } from '@athena20/ts-grpc-socket'

export const decoderEncoderMap = (self: Proto) => {
    const { encoderDecoder, MsgType, protoRoot } = self
    if (!MsgType) {
        throw new Error('Cannot get MsgType')
    }
    encoderDecoder[MsgType.JOIN_GAME_CHANNEL_REQ] = protoRoot.JoinGameChannelReq
    encoderDecoder[MsgType.JOIN_GAME_CHANNEL_RESP] = protoRoot.JoinGameChannelResp
    encoderDecoder[MsgType.LEAVE_GAME_CHANNEL_REQ] = protoRoot.LeaveGameChannelReq
    encoderDecoder[MsgType.LEAVE_GAME_CHANNEL_RESP] = protoRoot.LeaveGameChannelResp
    // encoderDecoder[MsgType.GET_AVAILABLE_GAME_SESSION_SLOT_REQ] = protoRoot.GetAvailableGameSessionSlotReq
    // encoderDecoder[MsgType.GET_AVAILABLE_GAME_SESSION_SLOT_RESP] = protoRoot.GetAvailableGameSessionSlotResp
    // encoderDecoder[MsgType.ASKING_JOIN_GAME_CHANNEL_REQ] = protoRoot.AskingJoinGameChannelReq
    // encoderDecoder[MsgType.ASKING_JOIN_GAME_CHANNEL_RESP] = protoRoot.AskingJoinGameChannelResp
    // encoderDecoder[MsgType.ASKING_LEAVE_GAME_CHANNEL_REQ] = protoRoot.AskingLeaveGameChannelReq
    // encoderDecoder[MsgType.ASKING_LEAVE_GAME_CHANNEL_RESP] = protoRoot.AskingLeaveGameChannelResp
    // encoderDecoder[MsgType.TRY_JOIN_GAME_CHANNEL_REQ] = protoRoot.TryJoinGameChannelReq
    // encoderDecoder[MsgType.TRY_JOIN_GAME_CHANNEL_RESP] = protoRoot.TryJoinGameChannelResp
    // encoderDecoder[MsgType.GET_BET_RESULTS_REQ] = protoRoot.GetBetResultsReq
    // encoderDecoder[MsgType.GET_BET_RESULTS_RESP] = protoRoot.GetBetResultsResp

    // encoderDecoder[MsgType.DICE_PLACE_BET_REQ] = protoRoot.DicePlaceBetReq
    // encoderDecoder[MsgType.DICE_PLACE_BET_RESP] = protoRoot.DicePlaceBetResp
    // encoderDecoder[MsgType.DICE_CREATE_NEW_TURN_REQ] = protoRoot.DiceCreateNewTurnReq
    // encoderDecoder[MsgType.DICE_CREATE_NEW_TURN_RESP] = protoRoot.DiceCreateNewTurnResp
    // encoderDecoder[MsgType.DICE_GET_LAST_RESULTS_REQ] = protoRoot.DiceGetLastResultsReq
    // encoderDecoder[MsgType.DICE_GET_LAST_RESULTS_RESP] = protoRoot.DiceGetLastResultsResp
    // encoderDecoder[MsgType.DICE_GET_BET_INFO_REQ] = protoRoot.DiceGetBetInfoReq
    // encoderDecoder[MsgType.DICE_GET_BET_INFO_RESP] = protoRoot.DiceGetBetInfoResp

    // encoderDecoder[MsgType.COINFLIP_CREATE_NEW_TURN_REQ] = protoRoot.CoinFlipCreateNewTurnReq
    // encoderDecoder[MsgType.COINFLIP_CREATE_NEW_TURN_RESP] = protoRoot.CoinFlipCreateNewTurnResp
    // encoderDecoder[MsgType.COINFLIP_PLACE_BET_REQ] = protoRoot.CoinFlipPlaceBetReq
    // encoderDecoder[MsgType.COINFLIP_PLACE_BET_RESP] = protoRoot.CoinFlipPlaceBetResp
    // encoderDecoder[MsgType.COINFLIP_MULTIPLY_CASH_OUT_REQ] = protoRoot.CoinFlipMultiplyCashOutReq
    // encoderDecoder[MsgType.COINFLIP_MULTIPLY_CASH_OUT_RESP] = protoRoot.CoinFlipMultiplyCashOutResp
    // encoderDecoder[MsgType.COINFLIP_SC_MULTIPLY_CASH_OUT_REQ] = protoRoot.CoinFlipMultiplyCashOutSCReq
    // encoderDecoder[MsgType.COINFLIP_SC_MULTIPLY_CASH_OUT_RESP] = protoRoot.CoinFlipMultiplyCashOutSCResp
    // encoderDecoder[MsgType.COINFLIP_GET_BET_INFO_REQ] = protoRoot.CoinFlipGetBetInfoReq
    // encoderDecoder[MsgType.COINFLIP_GET_BET_INFO_RESP] = protoRoot.CoinFlipGetBetInfoResp

    // encoderDecoder[MsgType.LIMBO_CREATE_NEW_TURN_REQ] = protoRoot.LimboCreateNewTurnReq
    // encoderDecoder[MsgType.LIMBO_CREATE_NEW_TURN_RESP] = protoRoot.LimboCreateNewTurnResp
    // encoderDecoder[MsgType.LIMBO_PLACE_BET_REQ] = protoRoot.LimboPlaceBetReq
    // encoderDecoder[MsgType.LIMBO_PLACE_BET_RESP] = protoRoot.LimboPlaceBetResp
    // encoderDecoder[MsgType.LIMBO_GET_LAST_RESULTS_REQ] = protoRoot.LimboGetLastResultsReq
    // encoderDecoder[MsgType.LIMBO_GET_LAST_RESULTS_RESP] = protoRoot.LimboGetLastResultsResp
    // encoderDecoder[MsgType.LIMBO_GET_BET_INFO_REQ] = protoRoot.LimboGetBetInfoReq
    // encoderDecoder[MsgType.LIMBO_GET_BET_INFO_RESP] = protoRoot.LimboGetBetInfoResp

    // encoderDecoder[MsgType.CRASH_GET_CURRENT_BET_INFOS_REQ] = protoRoot.CrashGetCurrentBetInfosReq
    // encoderDecoder[MsgType.CRASH_GET_CURRENT_BET_INFOS_RESP] = protoRoot.CrashGetCurrentBetInfosResp
    // encoderDecoder[MsgType.CRASH_GET_LAST_RESULTS_REQ] = protoRoot.CrashGetLastResultsReq
    // encoderDecoder[MsgType.CRASH_GET_LAST_RESULTS_RESP] = protoRoot.CrashGetLastResultsResp
    // encoderDecoder[MsgType.CRASH_PLACE_BET_REQ] = protoRoot.CrashPlaceBetReq
    // encoderDecoder[MsgType.CRASH_PLACE_BET_RESP] = protoRoot.CrashPlaceBetResp
    // encoderDecoder[MsgType.CRASH_CASH_OUT_REQ] = protoRoot.CrashCashOutReq
    // encoderDecoder[MsgType.CRASH_CASH_OUT_RESP] = protoRoot.CrashCashOutResp
    // encoderDecoder[MsgType.CRASH_GET_BET_INFO_REQ] = protoRoot.CrashGetBetInfoReq
    // encoderDecoder[MsgType.CRASH_GET_BET_INFO_RESP] = protoRoot.CrashGetBetInfoResp
    // encoderDecoder[MsgType.CRASH_CANCEL_NEXT_ROUND_REQ] = protoRoot.CrashCancelNextRoundReq
    // encoderDecoder[MsgType.CRASH_CANCEL_NEXT_ROUND_RESP] = protoRoot.CrashCancelNextRoundResp
    // encoderDecoder[MsgType.DEPOSIT_NOTIFICATION] = protoRoot.BatchNotification
    // encoderDecoder[MsgType.WITHDRAWAL_NOTIFICATION] = protoRoot.BatchNotification
    // encoderDecoder[MsgType.JACKPOT_NOTIFICATION] = protoRoot.BatchNotification
    // encoderDecoder[MsgType.CRASH_BET_RESULT_NOTIFICATION] = protoRoot.BatchNotification
    // encoderDecoder[MsgType.CRASH_STATUS_TICKER_NOTIFICATION] = protoRoot.BatchNotification
    // encoderDecoder[MsgType.COINFLIP_BET_RESULT_NOTIFICATION] = protoRoot.BatchNotification
    // encoderDecoder[MsgType.FORCE_LEAVE_GAME_NOTIFICATION] = protoRoot.ForceLeaveGameNotification
    // encoderDecoder[MsgType.TRY_JOIN_GAME_NOTIFICATION] = protoRoot.TryJoinGameNotification

    encoderDecoder[MsgType.PING] = protoRoot.Ping
    encoderDecoder[MsgType.PONG] = protoRoot.Pong
    encoderDecoder[MsgType.BET_RESULT] = protoRoot.BetResult
    encoderDecoder[MsgType.BALANCE] = protoRoot.Balance
    encoderDecoder[MsgType.DEPOSIT_BALANCE] = protoRoot.DepositBalance
    encoderDecoder[MsgType.WRONG_FORMAT] = protoRoot.WrongFormat
}
