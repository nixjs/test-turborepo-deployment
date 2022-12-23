import { WSClient } from '@athena20/ts-grpc-socket'
import { Interfaces } from '@athena20/ts-types'

export const onJoinGameEvent = (wsInstance: WSClient, gameSymbol: number): Promise<Interfaces.ResponseData<any>> => {
    return new Promise((resolve) => {
        wsInstance
            .send(wsInstance.protoMsgType.JOIN_GAME_CHANNEL_REQ, { gameSymbol })
            .then((res: any) => {
                return resolve({
                    status: 'SUCCESS',
                    data: res
                })
            })
            .catch((err: any) => {
                resolve({
                    status: 'ERROR',
                    error: err
                })
            })
    })
}

export const onLeaveGameEvent = (wsInstance: WSClient, gameSymbol: number): Promise<Interfaces.ResponseData<any>> => {
    return new Promise((resolve) => {
        wsInstance
            .send(wsInstance.protoMsgType.LEAVE_GAME_CHANNEL_REQ, {
                gameSymbol
            })
            .then((res: any) => {
                return resolve({
                    status: 'SUCCESS',
                    data: res
                })
            })
            .catch((err: any) => {
                resolve({
                    status: 'ERROR',
                    error: err
                })
            })
    })
}
