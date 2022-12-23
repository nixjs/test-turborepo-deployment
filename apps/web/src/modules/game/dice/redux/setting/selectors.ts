import { createSelector } from 'reselect'
import { SettingState } from 'modules/game/base/redux/setting'
import { KEY_REDUCER_SAGA } from './slice'
import { DiceInitialState } from './reducers'

const rootSelector = (state: { [key: string]: SettingState }) => state[KEY_REDUCER_SAGA] || DiceInitialState

export const getPlayModeSelector = () => createSelector(rootSelector, (item) => item.playMode)
export const getGameModeSelector = () => createSelector(rootSelector, (item) => item.gameMode)
export const getAutoPlaySelector = () => createSelector(rootSelector, (item) => item.autoPlay)
export const getSoundSelector = () => createSelector(rootSelector, (item) => item.sound)
