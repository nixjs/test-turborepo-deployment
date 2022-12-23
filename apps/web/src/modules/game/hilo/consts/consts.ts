import { SourceType } from 'modules/game/hilo/context/SoundContext/types'
import { HiLoCardSuit, HiLoCardValue, HiLoDirection } from 'modules/game/hilo/consts/enum'

export const BetResultDelayTimer = {
    NORMAL_MODE: 2000,
    FAST_MODE: 750
}

export const FORMAT_DATE_TYPE = {
    YYYY_MM_DD: 'yyyy/mm/dd',
    HH_MM_SS: 'HH:mm:ss',
    DD_MM_YYYY: 'dd/MM/yyyy'
}

export const SoundSources: SourceType<string> = {
    click: '/modules/games/limbo/click.mp3',
    error: '/modules/games/limbo/error.mp3',
    win: '/modules/games/limbo/win.mp3',
    lose: '/modules/games/limbo/lose.mp3',
    play: '/modules/games/limbo/play.mp3'
}

export const DIRECTION_LABEL: Record<number, string> = {
    [HiLoDirection.HLD_NONE]: 'None',
    [HiLoDirection.HLD_HIGHER]: 'Higher',
    [HiLoDirection.HLD_LOWER]: 'Lower',
    [HiLoDirection.HLD_SAME]: 'Same',
    [HiLoDirection.HLD_SKIP]: 'Skip'
}

export const CARD_SUIT_LABEL: Record<number, string> = {
    [HiLoCardSuit.HLCS_NONE]: 'None',
    [HiLoCardSuit.HLCS_SPADE]: 'Spades',
    [HiLoCardSuit.HLCS_CLUB]: 'Clubs',
    [HiLoCardSuit.HLCS_DIAMOND]: 'Diamonds',
    [HiLoCardSuit.HLCS_HEART]: 'Hearts'
}

export const CARD_VALUE_LABEL: Record<number, string> = {
    [HiLoCardValue.HLCV_NONE]: 'None',
    [HiLoCardValue.HLCV_ACE]: 'A',
    [HiLoCardValue.HLCV_TWO]: '2',
    [HiLoCardValue.HLCV_THREE]: '3',
    [HiLoCardValue.HLCV_FOUR]: '4',
    [HiLoCardValue.HLCV_FIVE]: '5',
    [HiLoCardValue.HLCV_SIX]: '6',
    [HiLoCardValue.HLCV_SEVEN]: '7',
    [HiLoCardValue.HLCV_EIGHT]: '8',
    [HiLoCardValue.HLCV_NINE]: '9',
    [HiLoCardValue.HLCV_TEN]: '10',
    [HiLoCardValue.HLCV_JACK]: 'J',
    [HiLoCardValue.HLCV_QUEEN]: 'Q',
    [HiLoCardValue.HLCV_KING]: 'K'
}
