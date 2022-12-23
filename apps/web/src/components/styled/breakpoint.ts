import { Breakpoint } from '@nixjs23n6/baseui-core'

type BreakpointExtends = Breakpoint | 'xxxs' | 'xxs'

const breakpoints: Record<BreakpointExtends, string> = {
    xxxs: '340px',
    xxs: '414px',
    xs: '576px',
    sm: '768px',
    md: '992px',
    lg: '1200px',
    xl: '',
    xxl: ''
}

export const screen = (Object.keys(breakpoints) as Array<keyof typeof breakpoints>).reduce((acc, key) => {
    acc[key] = (style: String) => `@media (min-width: ${breakpoints[key]}) { ${style} }`
    return acc
}, {} as { [index: string]: Function })
