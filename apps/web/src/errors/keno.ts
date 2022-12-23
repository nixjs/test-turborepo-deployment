import { BaseErrorConsts } from '@athena20/ts-error-message'
import { ErrorConvention } from './base'

export const enumifyError1 = BaseErrorConsts.enumifyError(
    ['OTP_HAS_BEEN_SEND', 'WEB_TOKEN_EXPIRED', 'UNABLE_OTP_REQUEST'],
    0,
    ErrorConvention.WebCode
)
