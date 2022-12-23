import * as React from "react"
import { SoundInstance } from "./types"

export const SoundContext = React.createContext<SoundInstance>({} as SoundInstance)

export function useSound(): SoundInstance {
    return React.useContext(SoundContext)
}
