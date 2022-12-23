import React from 'react'
import { useDispatch } from 'react-redux'
import { useWebsocket } from '@athena20/ts-grpc-socket-react'
import { GameWSEvent, BaseConst } from '@lottery/utils'
import * as gameRedux from 'redux/game'

export const useJoinGame = (gameID: number | string, name: string) => {
    const dispatch = useDispatch()
    const { ws } = useWebsocket()
    const firstTimeRef = React.useRef<boolean>(false)

    React.useEffect(() => {
        dispatch(gameRedux.onSetGamingJoinedLoading(true))
        setTimeout(() => {
            if (!firstTimeRef.current && ws?.connected) {
                console.log('%cSocket is connected', 'color: green; font-size: 24px')
                GameWSEvent.onJoinGameEvent(ws, Number(gameID))
                    .then((resp) => {
                        if (resp.status === 'SUCCESS') {
                            dispatch(
                                gameRedux.onSetGamingJoined({
                                    id: gameID,
                                    name
                                })
                            )
                        }
                    })
                    .catch((error) => {
                        console.log('%cJoin game failed', 'color: red; font-size: 24px', error)
                    })
                    .finally(() => {
                        dispatch(gameRedux.onSetGamingJoinedLoading(false))
                    })
                firstTimeRef.current = true
            }
        }, BaseConst.WSInitDelay)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameID, ws])
}
