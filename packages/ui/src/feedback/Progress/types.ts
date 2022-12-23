import { Breakpoint } from "@nixjs23n6/baseui-core"

export namespace ProcessingTypes {
    export type ProgressSize = Breakpoint
    export type ProgressCss = {
        size?: string
        radius?: string
    }
    export type ProgressSizeProps = Record<Breakpoint, ProgressCss>
    export interface ProgressPropArg {
        variant?: "crystal" | "master" | "legendary"
        size?: Breakpoint
        progress?: number | string
        className?: string
    }
}
