import { Types } from '@athena20/ts-types'
import { DELAY_PUBLISH_TYPE } from './enum'

export type SubscribeData<T = any> = { msgType?: number | string; msgData?: Types.Nullable<T> }

export type ExecuteCallbackFunc<T = any> = ({ msgType, msgData }: SubscribeData<T>) => void

export interface LongListener {
    subscriberId: string
    subscriptionId: string
    msgType: string | number
    callback: ExecuteCallbackFunc
    isMulti: boolean
}

export interface DelaySetting {
    publishType: DELAY_PUBLISH_TYPE
    msgType: string | number
    timestampField: string
}
