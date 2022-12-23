/* eslint-disable react-hooks/rules-of-hooks */
import { useInjectReducer, useInjectSaga } from 'redux-injectors'

export const injectReducerSaga = (KEY_REDUCER_SAGA: string, reducer: any, saga: any) => {
    reducer && useInjectReducer({ key: KEY_REDUCER_SAGA, reducer })
    saga && useInjectSaga({ key: KEY_REDUCER_SAGA, saga })
}
