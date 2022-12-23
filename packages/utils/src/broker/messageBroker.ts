import { proto } from '@athena20/ts-grpc-socket'
import { Types } from '@athena20/ts-types'
import { DELAY_PUBLISH_TYPE, COMMON_KEY } from './enum'
import { LongListener, DelaySetting, ExecuteCallbackFunc } from './types'

class MessageBroker {
    longListeners: LongListener[] = []
    delayedQueue: Record<number | string, Types.Object<any>[]> = {}
    delayedBalanceQueue: Types.Object<Types.Object<any>[]> = {}
    delayedSettings: DelaySetting[] = []

    constructor() {
        this.longListeners = []
        this.delayedQueue = {}
        this.delayedBalanceQueue = {}
        this.delayedSettings = []
    }

    /*
        delayedSettings is an array. Each object follows the structure below:
        {
            publishType: PUBLISH_TYPE.ALL or PUBLISH_TYPE.LATEST,
            msgType,
            timestampField: The field name to get timestamp
        } 
    */
    public addDelayedSettings(delayedSettings: DelaySetting[] = []) {
        this.delayedSettings = delayedSettings
    }

    public publishDelayedMsg() {
        this.delayedSettings = []
        // console.log('[Message broker] Publish delayed msg: ', Object.keys(this.delayedQueue)?.toString())

        Object.keys(this.delayedQueue).forEach((msgType) => {
            const msgQueue = this.delayedQueue[msgType]
            const nMsg = msgQueue.length

            for (let i = 0; i < nMsg; i++) {
                this.publish(+msgType, this.delayedQueue[msgType][i])
            }

            delete this.delayedQueue[msgType]
        })

        this.delayedQueue = {}

        Object.keys(this.delayedBalanceQueue).forEach((symbol) => {
            const msgQueue = this.delayedBalanceQueue[symbol]
            const nMsg = msgQueue.length

            for (let i = 0; i < nMsg; i++) {
                this.publish(COMMON_KEY.BALANCE_CHANGE_NOTIFICATION, this.delayedBalanceQueue[symbol][i])
            }

            delete this.delayedBalanceQueue[symbol]
        })

        this.delayedBalanceQueue = {}
    }

    public delayBalanceChangeNotice(msgData: {
        balance: {
            symbol: string
            timestamp: number
        }
    }) {
        if (!msgData) return
        const { symbol } = msgData?.balance || {}

        if (!this.delayedBalanceQueue[symbol]) this.delayedBalanceQueue[symbol] = []

        const nDelayedMsgs = this.delayedBalanceQueue[symbol].length

        if (nDelayedMsgs === 0) {
            this.delayedBalanceQueue[symbol].push(msgData)
        } else if (nDelayedMsgs === 1) {
            const prevDelayedBalance = this.delayedBalanceQueue[symbol][0]
            const prevTimestamp = new Date(prevDelayedBalance?.balance?.timestamp || 0).getTime()
            const nextTimestamp = new Date(msgData?.balance?.timestamp || 0).getTime()
            if (prevTimestamp < nextTimestamp) {
                this.delayedBalanceQueue[symbol][0] = msgData
            }
        } else {
            console.warn('[Message broker]: Something is wrong when delaying message')
        }
    }

    public publish<T = any>(msgType: string | number, msgData: T) {
        const nDelayedSettings = this.delayedSettings.length
        let isDelay = false

        // console.log(`[Message broker] The ${msgType} add the ${JSON.stringify(msgData)}`)
        if (this.delayedSettings.length > 0) {
            for (let i = 0; i < nDelayedSettings; i += 1) {
                if (this.isEqual(msgType, this.delayedSettings[i].msgType)) {
                    if (!this.delayedQueue[msgType]) this.delayedQueue[msgType] = []

                    const { publishType } = this.delayedSettings[i]
                    switch (publishType) {
                        case DELAY_PUBLISH_TYPE.ALL:
                            this.delayedQueue[msgType].push(msgData as any)
                            break
                        case DELAY_PUBLISH_TYPE.LATEST: {
                            const nDelayedMsgs = this.delayedQueue[msgType].length

                            if (+msgType === COMMON_KEY.BALANCE_CHANGE_NOTIFICATION) {
                                this.delayBalanceChangeNotice(msgData as any)
                                break
                            }

                            if (nDelayedMsgs === 0) {
                                this.delayedQueue[msgType].push(msgData as any)
                            } else if (nDelayedMsgs === 1) {
                                // eslint-disable-next-line @typescript-eslint/no-extra-semi
                                ;(this.delayedQueue[msgType][0] as any) = msgData
                            } else {
                                console.warn('[Message broker]: Something is wrong when delaying message')
                            }

                            break
                        }
                        default: {
                            break
                        }
                    }

                    isDelay = true
                    break
                }
            }
        }

        if (isDelay) {
            // console.log(`[Message broker] Delay msg: ${msgType}`)
            return
        }

        let foundOnce = false
        const numLongListener = this.longListeners.length
        for (let i = 0; i < numLongListener; i += 1) {
            const listener = this.longListeners[i]
            if (this.isEqual(listener?.msgType, msgType)) {
                foundOnce = true
                listener.isMulti ? listener.callback({ msgType, msgData }) : listener.callback({ msgData })
            }
        }
        if (!foundOnce) {
            console.warn(`[Message broker] Unhandled msg: ${msgType}`)
        }
    }

    public subscribe<T = any>(subscriberId: string, msgType: string | number, callback: ExecuteCallbackFunc<T>, isMulti = false) {
        const subscriptionId = proto.generateId()

        const nLongListener = this.longListeners.length
        let found = false
        let oldSubscriptionId: string | null = null

        for (let i = 0; i < nLongListener; i += 1) {
            const listener = this.longListeners[i]
            if (this.isEqual(subscriberId, listener.subscriberId) && this.isEqual(msgType, listener.msgType)) {
                found = true
                oldSubscriptionId = listener.subscriptionId
                break
            }
        }

        if (!found) {
            this.longListeners.push({
                subscriberId,
                subscriptionId,
                msgType,
                callback,
                isMulti
            })
            // console.log(`[Message broker] Component ${subscriberId} subscribes with key is ${msgType}`)
            return subscriptionId
        }

        console.warn(`[Message broker] Ignore duplicated subscription: ${subscriberId} subscribes with key ${msgType}`)

        return oldSubscriptionId
    }

    public subscribes<T = any>(subscriberId: string, msgTypes: (string | number)[], callback: ExecuteCallbackFunc<T>) {
        const subscriptionIds: string[] = []
        const numLong = msgTypes.length
        for (let i = 0; i < numLong; i += 1) {
            const subscriptionId = this.subscribe(subscriberId, msgTypes[i], callback, true)
            if (subscriptionId) subscriptionIds.push(subscriptionId)
        }
        return subscriptionIds
    }

    public unsubscribe(subscriptionId: string) {
        const numLongListener = this.longListeners.length
        for (let i = 0; i < numLongListener; i += 1) {
            const listener = this.longListeners[i]
            if (this.isEqual(listener.subscriptionId, subscriptionId)) {
                return this.longListeners.splice(i, 1)
            }
        }
        return -1
    }

    public unsubscribes(subscriptionIds: string[]) {
        const numLong = subscriptionIds.length
        for (let i = 0; i < numLong; i += 1) {
            this.unsubscribe(subscriptionIds[i])
        }
    }

    public unsubscribesByMsgType(msgType: string | number) {
        const numLong = this.longListeners.length
        if (numLong === 0) {
            return
        }

        for (let i = 0; i < numLong; i++) {
            const listener = this.longListeners[i]
            if (this.isEqual(listener.msgType, msgType)) {
                this.longListeners.splice(i, 1)
            }
        }
    }

    public clearAllSubscribers() {
        this.longListeners = []
        this.delayedQueue = {}
        this.delayedSettings = []
    }

    public isEqual(v1: string | number, v2: string | number) {
        return String(v1) === String(v2)
    }
}

export const messageBroker = new MessageBroker()
