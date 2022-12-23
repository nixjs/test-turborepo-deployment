import { Store } from 'redux'
import { configureStore, $CombinedState, CombinedState } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import { createInjectorsEnhancer } from 'redux-injectors'
import createSagaMiddleware, { Task } from 'redux-saga'
import createReducer from './rootReducer'
import rootSaga from './rootSaga'

export interface SagaStore extends Store {
    sagaTask?: Task
}

const devEnv = process.env.NODE_ENV === 'development'

const makeStore = (preloadedState = {}) => {
    // 1: Create the middleware
    const sagaOptions = {}
    const sagaMiddleware = createSagaMiddleware(sagaOptions)

    // 2: Add an extra parameter for applying middleware:
    const middlers = [sagaMiddleware]
    const enhancers = [
        createInjectorsEnhancer({
            createReducer,
            runSaga: sagaMiddleware.run
        })
    ]

    const store = configureStore({
        reducer: createReducer(),
        devTools: devEnv,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false
            }).concat(middlers),
        preloadedState,
        enhancers
    })

    // 3: Run your sagas on server
    ;(store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga)

    // 4: now return the store:
    return store
}

type CleanState<T> = T extends CombinedState<infer S> ? { [K in keyof S]: CleanState<S[K]> } : T

export type AppStore = ReturnType<typeof makeStore>
export type AppState = CleanState<
    ReturnType<AppStore['getState']> & {
        readonly [$CombinedState]?: undefined
    }
>

export const wrapper = createWrapper<AppStore>(makeStore, { debug: false })
