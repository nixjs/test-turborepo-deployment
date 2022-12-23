import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { LinearBackOff } from '@athena20/ts-backoff'
import { Utils } from '@athena20/ts-grpc-socket'
import { WSReactTypes } from '@athena20/ts-grpc-socket-react'
import { Formatter } from '@lottery/utils'
import { Config } from 'configs/env'
import { SocketPort } from 'consts/socket'
import { StorageServices } from 'services/localstorage'
import { decoderEncoderMap } from 'utils/socket/decode'
import { onSetSocketInitiated } from 'redux/common/slice'

export const useConfigSocket = () => {
    const dispatch = useDispatch()
    const [config, setConfig] = useState<WSReactTypes.BuilderConfigs>()

    useEffect(() => {
        const accessToken = StorageServices.getAccessToken()
        const c: WSReactTypes.BuilderConfigs = {
            [SocketPort.INTERNAL]: {
                baseURL: Config.SOCKET_BASE_INTERNAL_URL,
                path: '/ws',
                isProtocolsRequired: true,
                protocols: accessToken || '',
                protoConfigParameters: {
                    nestedRoot: 'ws',
                    protoFile: '/proto/huula.proto',
                    executeEncoderDecoderMap: decoderEncoderMap
                },
                executeAnyFunc: (websocket) => {
                    dispatch(onSetSocketInitiated(Formatter.onRandomAlphabets()))
                    if (websocket.protocols && Utils.isTokenExpired(String(websocket.protocols))) {
                        console.log('Token expired')
                    }
                },
                logger: {
                    debug: false
                },
                backOff: new LinearBackOff(0, 3000, 12000)
            },
            [SocketPort.PUBLIC]: {
                baseURL: Config.SOCKET_BASE_PUBLIC_URL,
                path: '/ws',
                isProtocolsRequired: false,
                protoConfigParameters: {
                    nestedRoot: 'ws',
                    protoFile: '/proto/huula.proto',
                    executeEncoderDecoderMap: decoderEncoderMap
                },
                logger: {
                    debug: true
                },
                backOff: new LinearBackOff(0, 3000, 12000)
            }
        }
        setConfig(c)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { config }
}
