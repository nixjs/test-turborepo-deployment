import React from 'react'

export const useSwiperRef = <T extends HTMLElement>(): [T | null, React.Ref<T>] => {
    const [wrapper, setWrapper] = React.useState<T | null>(null)
    const ref = React.useRef<T>(null)

    React.useEffect(() => {
        if (ref.current) {
            setWrapper(ref.current)
        }
    }, [])

    return [wrapper, ref]
}
