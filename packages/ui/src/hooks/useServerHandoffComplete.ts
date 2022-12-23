import React from 'react'

const state = { serverHandoffComplete: false }

export function useServerHandoffComplete() {
    const [serverHandoffComplete, setServerHandoffComplete] = React.useState(state.serverHandoffComplete)

    React.useEffect(() => {
        if (serverHandoffComplete === true) return

        setServerHandoffComplete(true)
    }, [serverHandoffComplete])

    React.useEffect(() => {
        if (state.serverHandoffComplete === false) state.serverHandoffComplete = true
    }, [])

    return serverHandoffComplete
}
