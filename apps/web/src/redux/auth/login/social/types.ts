import { Types } from '@athena20/ts-types'
import { BaseEnum } from '@lottery/types'

export interface AuthSocialState {
    loading: boolean
    error: any
    provider: Types.Nullable<BaseEnum.AuthenticationProvider>
}
