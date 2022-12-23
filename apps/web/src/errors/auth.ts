import { BaseErrorConsts, BaseErrorTypes } from '@athena20/ts-error-message'
import { Objectify } from '@athena20/ts-objectify'
import { ErrorConvention } from './base'

const enumifyError1 = BaseErrorConsts.enumifyError(
    ['OTP_HAS_BEEN_SEND', 'WEB_TOKEN_EXPIRED', 'UNABLE_OTP_REQUEST'],
    0,
    ErrorConvention.WebCode
)
const enumifyError2 = BaseErrorConsts.enumifyError(
    // reference: https://muziverse.tech/docs/athena/api-grpc-reference/error-codes
    [
        'WRONG_OTP',
        'MFA_ALREADY_ENABLED',
        'MFA_NOT_ENABLED',
        'MFA_NOT_SETUP',
        'BLOCKED',
        'CREDENTIAL_INVALID',
        'SOCIAL_TOKEN_INVALID',
        'EMAIL_TAKEN',
        'PASSWORD_SAME_OLD_ONE',
        'OTP_INTERVAL_LIMIT',
        'MFA_INVALID',
        'TOKEN_INVALID_OR_NOT_FOUND'
    ],
    0,
    ErrorConvention.AuthCode
)
export const ERROR_TYPE = BaseErrorConsts.enumify(Objectify.merge(enumifyError1, enumifyError2))
export type ErrorType = keyof typeof ERROR_TYPE

export const AuthErrors: Record<string, BaseErrorTypes.Error<ErrorType>> = {
    [ERROR_TYPE.WEB_TOKEN_EXPIRED]: {
        type: 'WEB_TOKEN_EXPIRED',
        code: Number(ERROR_TYPE.WEB_TOKEN_EXPIRED),
        stringify: (params?: any) => `The session has expired. ${params?.name}`,
        format: (params?: any) => ({
            code: AuthErrors[ERROR_TYPE.WEB_TOKEN_EXPIRED as ErrorType].code,
            message: AuthErrors[ERROR_TYPE.WEB_TOKEN_EXPIRED as ErrorType].stringify(params)
        })
    },
    [ERROR_TYPE.OTP_HAS_BEEN_SEND]: {
        type: 'OTP_HAS_BEEN_SEND',
        code: Number(ERROR_TYPE.OTP_HAS_BEEN_SEND),
        stringify: () => 'A message with an OTP has been sent.',
        format: (params?: any) => ({
            code: AuthErrors[ERROR_TYPE.OTP_HAS_BEEN_SEND as ErrorType].code,
            message: AuthErrors[ERROR_TYPE.OTP_HAS_BEEN_SEND as ErrorType].stringify(params)
        })
    },
    [ERROR_TYPE.UNABLE_OTP_REQUEST]: {
        type: 'UNABLE_OTP_REQUEST',
        code: Number(ERROR_TYPE.UNABLE_OTP_REQUEST),
        stringify: () => 'Unable to process OTP request.',
        format: (params?: any) => ({
            code: AuthErrors[ERROR_TYPE.UNABLE_OTP_REQUEST as ErrorType].code,
            message: AuthErrors[ERROR_TYPE.UNABLE_OTP_REQUEST as ErrorType].stringify(params)
        })
    },
    [ERROR_TYPE.WRONG_OTP]: {
        type: 'WRONG_OTP',
        code: Number(ERROR_TYPE.WRONG_OTP),
        stringify: () => 'OTP invalid or expired. Please try again',
        format: (params?: any) => ({
            code: AuthErrors[ERROR_TYPE.WRONG_OTP as ErrorType].code,
            message: AuthErrors[ERROR_TYPE.WRONG_OTP as ErrorType].stringify(params)
        })
    },
    [ERROR_TYPE.BLOCKED]: {
        type: 'BLOCKED',
        code: Number(ERROR_TYPE.BLOCKED),
        stringify: (params: { maxFailedAttempt: number; blockedTime: string }) => {
            let msg = ''
            if (params.maxFailedAttempt > 0) {
                msg += `OTP verification failed over ${params.maxFailedAttempt} times.`
            }
            if (params.blockedTime.length > 0) {
                msg += `The user has been blocked until ${params.blockedTime || 6}.`
            }
            return msg
        },
        format: (params: { maxFailedAttempt: number; blockedTime: number }) => ({
            code: AuthErrors[ERROR_TYPE.BLOCKED as ErrorType].code,
            message: AuthErrors[ERROR_TYPE.BLOCKED as ErrorType].stringify(params)
        })
    },
    [ERROR_TYPE.CREDENTIAL_INVALID]: {
        type: 'CREDENTIAL_INVALID',
        code: Number(ERROR_TYPE.CREDENTIAL_INVALID),
        stringify: () => 'Invalid credential.',
        format: (params: any) => ({
            code: AuthErrors[ERROR_TYPE.CREDENTIAL_INVALID as ErrorType].code,
            message: AuthErrors[ERROR_TYPE.CREDENTIAL_INVALID as ErrorType].stringify(params)
        })
    },
    [ERROR_TYPE.OTP_INTERVAL_LIMIT]: {
        type: 'OTP_INTERVAL_LIMIT',
        code: Number(ERROR_TYPE.OTP_INTERVAL_LIMIT),
        stringify: () => 'Request sending OTP too fast.',
        format: () => ({
            code: AuthErrors[ERROR_TYPE.OTP_INTERVAL_LIMIT as ErrorType].code,
            message: AuthErrors[ERROR_TYPE.OTP_INTERVAL_LIMIT as ErrorType].stringify()
        })
    },
    [ERROR_TYPE.EMAIL_TAKEN]: {
        type: 'EMAIL_TAKEN',
        code: Number(ERROR_TYPE.EMAIL_TAKEN),
        stringify: () => 'This email address is already taken. Please try another.',
        format: () => ({
            code: AuthErrors[ERROR_TYPE.EMAIL_TAKEN as ErrorType].code,
            message: AuthErrors[ERROR_TYPE.EMAIL_TAKEN as ErrorType].stringify()
        })
    },
    [ERROR_TYPE.TOKEN_INVALID_OR_NOT_FOUND]: {
        type: 'TOKEN_INVALID_OR_NOT_FOUND',
        code: Number(ERROR_TYPE.TOKEN_INVALID_OR_NOT_FOUND),
        stringify: () => 'Token not found or invalid.',
        format: () => ({
            code: AuthErrors[ERROR_TYPE.TOKEN_INVALID_OR_NOT_FOUND as ErrorType].code,
            message: AuthErrors[ERROR_TYPE.TOKEN_INVALID_OR_NOT_FOUND as ErrorType].stringify()
        })
    }
}
