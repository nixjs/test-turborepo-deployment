import React from 'react'
import { Types } from '@athena20/ts-types'
import { sound } from 'modules/game/keno/utils/sound'
import { SourceType } from './types'
import { SoundContext } from './useSound'

export const SoundProvider: React.FC<{ children: React.ReactNode; sources: SourceType<string> }> = ({ children, sources }) => {
    const sourceInstance = React.useRef<Types.Nullable<sound>>(null)

    React.useEffect(() => {
        if (typeof Audio !== 'undefined') {
            sourceInstance.current = new sound(sources)
        }
    })

    return <SoundContext.Provider value={{ sound: sourceInstance.current }}>{children}</SoundContext.Provider>
}
