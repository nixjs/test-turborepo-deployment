import { GameAutoPlayTypes } from 'modules/game/base/FormAuto'
import { SourceType } from 'modules/game/dice/context/SoundContext/types'
import { GameStatePlay, RareType } from './enum'

export const BetResultDelayTimer = {
    NORMAL_MODE: 2000,
    FAST_MODE: 750
}

export const FORMAT_DATE_TYPE = {
    YYYY_MM_DD: 'yyyy/mm/dd',
    HH_MM_SS: 'HH:mm:ss',
    DD_MM_YYYY: 'dd/MM/yyyy'
}

export const InitFormAutoPlayConfig: GameAutoPlayTypes.FormAutoPlayConfig = {
    numberOfBet: 0,
    maxBetAmount: '',
    stopOnProfit: '',
    stopOnLoss: '',
    onWinType: RareType.RESET,
    onWinValue: '0',
    onLossType: RareType.RESET,
    onLossValue: '0'
}

export const initAutoPlayInfo: GameAutoPlayTypes.AutoPlayInfo = {
    numberOfBets: 0,
    originalAmount: '',
    originalBalance: '',
    totalBalance: '',
    gameStatus: GameStatePlay.INIT
}

export const SoundSources: SourceType<string> = {
    click: '/modules/games/dice/click.mp3',
    error: '/modules/games/dice/error.mp3',
    win: '/modules/games/dice/win.mp3',
    lose: '/modules/games/dice/lose.mp3',
    play: '/modules/games/dice/play.mp3'
}
