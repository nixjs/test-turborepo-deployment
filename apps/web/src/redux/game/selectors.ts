import { createSelector } from 'reselect'
import { GameState } from './types'
import { KEY_REDUCER_SAGA } from './slice'
import { initialState } from './reducers'

const rootSelector = (state: { [KEY_REDUCER_SAGA]: GameState }) => state[KEY_REDUCER_SAGA] || initialState

export const gamingJoinedSelector = () => createSelector(rootSelector, (item) => item.gamingJoined)
