import { take, fork, all, call, put } from 'redux-saga/effects'
import { toast } from 'react-hot-toast'
import { Interfaces } from '@athena20/ts-types'
import { CommonTypes } from '@lottery/types'
import { withAuth } from 'services/grpc'
import { HistoryTypes } from 'modules/game/base/types/history'
import { gameHistoryInstance } from 'modules/game/base/grpc/history'
import { GameHistoryRequestMethods } from 'modules/game/base/grpc/methods'
import { GameHistoryRequest } from 'modules/game/base/grpc/request'
import * as historySlice from './slice'

function* betResultSaga() {
    try {
        while (true) {
            const { payload }: CommonTypes.Payload<Partial<HistoryTypes.BetResultRequest>> = yield take(historySlice.onFetchBetResults)
            const { data, status }: Interfaces.ResponseData<{ betResultsList: HistoryTypes.BetResultReply[] }> = yield call(
                withAuth,
                gameHistoryInstance,
                {
                    methodName: GameHistoryRequestMethods.GET_BET_RESULTS,
                    params: GameHistoryRequest.getBetResultRequestParams(payload)
                },
                false
            )

            if (status === 'SUCCESS' && data && data.betResultsList) {
                yield put(historySlice.onGetBetResults(data.betResultsList.filter((f) => f.gameSymbol === payload.gameSymbol)))
            }
        }
    } catch (error) {
        toast.error('Cannot get bet result')
    }
}

export function* root() {
    yield all([fork(betResultSaga)])
}
