import { all, put, select, call, fork, take } from 'redux-saga/effects'
import { toast, Renderable, ToastType, ToastOptions, ValueOrFunction, Toast } from 'react-hot-toast'
import * as commonSlice from './slice'
import * as commonSelector from './selectors'

export function* dismissToastSaga() {
    const toastId: string = yield select(commonSelector.toastIDSelector())
    yield call(toast.dismiss, toastId)
    yield put(commonSlice.onSetToastID(null))
}

export function* dismissToastByIdSaga() {
    const { payload } = yield take(commonSlice.onDismissToast)
    yield call(toast.dismiss, payload)
    yield put(commonSlice.onSetToastID(null))
}

export function* addToastSaga(ourMessage: Renderable, type: ToastType = 'blank') {
    let t: (message: ValueOrFunction<Renderable, Toast>, options?: ToastOptions) => string

    switch (type) {
        case 'loading':
            t = toast.loading
            break
        case 'error':
            t = toast.error
            break
        case 'success':
            t = toast.success
            break
        case 'custom':
            t = toast.custom
            break
        case 'blank':
        default:
            t = toast
            break
    }
    const toastId: string = yield call(t, ourMessage)
    yield put(commonSlice.onSetToastID(toastId))
}

export function* root() {
    yield all([fork(dismissToastByIdSaga)])
}
