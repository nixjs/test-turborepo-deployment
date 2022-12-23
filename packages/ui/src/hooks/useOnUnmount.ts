import React from 'react'

export function useOnUnmount(callback: () => void) {
    const onUnmount = React.useRef<(() => void) | null>(null)
    onUnmount.current = callback

    React.useEffect(() => {
        return () => onUnmount.current?.()
    }, [])
}
