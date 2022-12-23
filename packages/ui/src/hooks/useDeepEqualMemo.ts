import { isEqual } from 'lodash-es'
import { useRef } from 'react'

export function useDeepEqualMemo<T>(value: T) {
    const ref = useRef<T | undefined>(undefined)

    if (!isEqual(ref.current, value)) {
        ref.current = value
    }

    return ref.current
}
