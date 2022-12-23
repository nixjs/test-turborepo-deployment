import React from 'react'
import { useIsomorphicLayoutEffect } from 'usehooks-ts'
import { useServerHandoffComplete } from './useServerHandoffComplete'

// We used a "simple" approach first which worked for SSR and rehydration on the client. However we
// didn't take care of the Suspense case. To fix this we used the approach the @reach-ui/auto-id
// uses.
//
// Credits: https://github.com/reach/reach-ui/blob/develop/packages/auto-id/src/index.tsx

let id = 0
function generateId() {
    return (id += 1)
}

export const useId =
    // Prefer React's `useId` if it's available.
    React.useId ??
    function useId() {
        const ready = useServerHandoffComplete()
        const [id, setId] = React.useState(ready ? generateId : null)

        useIsomorphicLayoutEffect(() => {
            if (id === null) setId(generateId())
        }, [id])

        return id != null ? '' + id : undefined
    }
