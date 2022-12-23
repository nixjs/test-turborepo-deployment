import { createSelector } from "reselect"
import { KEY_REDUCER_SAGA } from "./slice"
import { initialState } from "./reducers"
import { HistoryState } from "./types"

const rootSelector = (state: { [key: string]: HistoryState }) => state[KEY_REDUCER_SAGA] || initialState

export const getBetResultsSelector = () => createSelector(rootSelector, (item) => item.betResults)
