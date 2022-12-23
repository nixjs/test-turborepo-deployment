/* eslint-disable @typescript-eslint/no-empty-function */
import { PayloadAction } from '@reduxjs/toolkit'
import { Types } from '@athena20/ts-types'
import { LotteryCommonTypes } from '@lottery/types'
import { LotteryTypes } from 'modules/lottery/keno/types'
import { GameState } from './types'

export const initialState = {
    draws: [],
    drawsVersion: '',
    drawSelectedList: null,
    numberChoiceModal: false,
    ticketOrder: {},
    ticketSession: {},
    quantity: 0,
    numbers: [],
    spots: [],
    spotSelected: 0,
    spotDefault: 0,
    createOrderLoading: false
} as GameState

export const fetchConfig = (_state: Partial<GameState>, _action: PayloadAction<LotteryTypes.FirstConfigRequest>) => {}
export const getConfig = (state: Partial<GameState>, action: PayloadAction<LotteryTypes.FirstConfigResponse>) => {
    state.config = action.payload.config
}
export const setDrawingConfig = (state: Partial<GameState>, action: PayloadAction<Types.Undefined<LotteryTypes.DrawingConfig>>) => {
    state.drawingConfig = action.payload
}
export const setTicketPriceDefault = (state: Partial<GameState>, action: PayloadAction<LotteryTypes.OurTicketPriceDefault>) => {
    state.tickerPriceDefault = action.payload
}

export const initTicket = (
    state: Partial<GameState>,
    action: PayloadAction<{ quantity: number; price: LotteryTypes.OurTicketPriceDefault }>
) => {
    state.quantity = action.payload.quantity
}
export const initNumbers = (_state: Partial<GameState>, _action: PayloadAction<{ min: number; max: number }>) => {}
export const setNumbers = (state: Partial<GameState>, action: PayloadAction<number[]>) => {
    const { payload } = action
    state.numbers = payload
}
export const initSpots = (_state: Partial<GameState>, _action: PayloadAction<{ min: number; max: number }>) => {}
export const setSpots = (state: Partial<GameState>, action: PayloadAction<number[]>) => {
    const { payload } = action
    state.spots = payload
}
export const setSpotSelected = (state: Partial<GameState>, action: PayloadAction<number>) => {
    const { payload } = action
    state.spotSelected = payload
}
export const setSpotDefault = (state: Partial<GameState>, action: PayloadAction<number>) => {
    const { payload } = action
    state.spotDefault = payload
}
export const fetchDraw = (_state: Partial<GameState>, _action: PayloadAction<LotteryTypes.FindDrawsRequest>) => {}
export const setDraw = (state: Partial<GameState>, action: PayloadAction<LotteryCommonTypes.Draw[]>) => {
    const { payload } = action
    state.draws = payload
}
export const setDrawMapByDate = (state: Partial<GameState>, action: PayloadAction<LotteryTypes.DrawByDate>) => {
    const { payload } = action
    state.drawMapByDate = payload
}

export const removeDrawSelected = (_state: Partial<GameState>, _action: PayloadAction<string>) => {}
export const setDrawSelected = (_state: Partial<GameState>, _action: PayloadAction<LotteryCommonTypes.Draw>) => {}
export const setDrawSelectedAll = () => {}
export const removeDrawSelectedAll = () => {}
export const setDrawSelectedList = (
    state: Partial<GameState>,
    action: PayloadAction<Types.Nullable<Types.Object<LotteryCommonTypes.Draw>>>
) => {
    const { payload } = action
    state.drawSelectedList = payload
}

export const setTicketOrder = (state: Partial<GameState>, action: PayloadAction<Types.Object<LotteryTypes.OurTicket>>) => {
    const { payload } = action
    state.ticketOrder = payload
}
export const updateTicketOrderNumber = (
    _state: Partial<GameState>,
    _action: PayloadAction<{
        id: string
        numbers: number[]
    }>
) => {}
export const resetTicketOrderNumber = () => {}

export const setTicketSessionSelected = (
    state: Partial<GameState>,
    action: PayloadAction<Types.Undefined<LotteryTypes.OurTicket & { id: string }>>
) => {
    const { payload } = action
    state.ticketSessionSelected = payload
}

export const resetTicketSession = () => {}

export const randomNumberTicket = (_state: Partial<GameState>, _action: PayloadAction<Types.Undefined<string>>) => {}
export const addTicket = () => {}
export const removeTicket = (_state: Partial<GameState>, _action: PayloadAction<string>) => {}
export const clearNumberTicket = (_state: Partial<GameState>, _action: PayloadAction<string>) => {}

export const setTicketSession = (state: Partial<GameState>, action: PayloadAction<Types.Object<LotteryTypes.OurTicket>>) => {
    const { payload } = action
    state.ticketSession = payload
}
export const updateSessionItem = (_state: Partial<GameState>, _action: PayloadAction<{ id: string; numbers: number[] }>) => {}
export const removeSessionItem = (_state: Partial<GameState>, _action: PayloadAction<string>) => {}
export const clearNumberSessionItem = (_state: Partial<GameState>, _action: PayloadAction<string>) => {}
export const mergeTicketOrderFromSession = () => {}

export const setNumberChoiceModal = (state: Partial<GameState>, action: PayloadAction<boolean>) => {
    const { payload } = action
    state.numberChoiceModal = payload
}

export const createOrder = () => {}
export const createOrderLoading = (state: Partial<GameState>, action: PayloadAction<boolean>) => {
    const { payload } = action
    state.createOrderLoading = payload
}
