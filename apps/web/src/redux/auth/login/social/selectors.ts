import { createSelector } from 'reselect'
import { AppState } from 'redux/store'
import { KEY_REDUCER_SAGA } from './slice'
import { initialState } from './reducers'

const rootSelector = (state: AppState) => state[KEY_REDUCER_SAGA] || initialState

export const getLoadingSelector = () => createSelector(rootSelector, (item) => item.loading)
export const getSocialProviderSelector = () => createSelector(rootSelector, (item) => item.provider)
