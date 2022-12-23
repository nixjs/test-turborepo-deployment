import { Types } from '@athena20/ts-types'

export interface CommonState {
    triggerCookieConsent: boolean
    triggerMenu: boolean
    socketInitiated: Types.Nullable<number | string>
    toastID: Types.Nullable<string>
}
