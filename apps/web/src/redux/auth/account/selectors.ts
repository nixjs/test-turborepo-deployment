import { createSelector } from 'reselect'
import { KEY_REDUCER_SAGA } from './slice'
import { initialState } from './reducers'
import { AccountState } from './types'

const rootSelector = (state: { [key: string]: AccountState }) => state[KEY_REDUCER_SAGA] || initialState

export const getUserProfileSelector = () => createSelector(rootSelector, (item) => item.userProfile)
export const getServiceConfigSelector = () => createSelector(rootSelector, (item) => item.serviceConfig)
