import { BaseErrors, Errors } from '@athena20/ts-types'

export const baseCode = 20010000
export const mergeCode = (num: number, base = baseCode) => String(base + num)

export const AUTH_CONTEXT_ERROR_TYPE = BaseErrors.enumify({
    MISSING_OR_INVALID: mergeCode(0),
    NOT_LOGIN_YET: mergeCode(1),
    SESSION_EXPIRED: mergeCode(2)
})

export type ErrorType = keyof typeof AUTH_CONTEXT_ERROR_TYPE

export type Error<T> = {
    type: T
    code: number
    stringify: Errors.ErrorStringifier
    format: Errors.ErrorFormatter
}

export const AuthContextErrors: Record<string, Error<ErrorType>> = {
    [AUTH_CONTEXT_ERROR_TYPE.MISSING_OR_INVALID]: {
        type: 'MISSING_OR_INVALID',
        code: Number(AUTH_CONTEXT_ERROR_TYPE.MISSING_OR_INVALID),
        stringify: () => `Missing or invalid token value.`,
        format: () => ({
            code: AuthContextErrors[AUTH_CONTEXT_ERROR_TYPE.MISSING_OR_INVALID as ErrorType].code,
            message: AuthContextErrors[AUTH_CONTEXT_ERROR_TYPE.MISSING_OR_INVALID as ErrorType].stringify()
        })
    },
    [AUTH_CONTEXT_ERROR_TYPE.NOT_LOGIN_YET]: {
        type: 'NOT_LOGIN_YET',
        code: Number(AUTH_CONTEXT_ERROR_TYPE.NOT_LOGIN_YET),
        stringify: () => `You may not login yet.`,
        format: () => ({
            code: AuthContextErrors[AUTH_CONTEXT_ERROR_TYPE.NOT_LOGIN_YET as ErrorType].code,
            message: AuthContextErrors[AUTH_CONTEXT_ERROR_TYPE.NOT_LOGIN_YET as ErrorType].stringify()
        })
    },
    [AUTH_CONTEXT_ERROR_TYPE.SESSION_EXPIRED]: {
        type: 'SESSION_EXPIRED',
        code: Number(AUTH_CONTEXT_ERROR_TYPE.SESSION_EXPIRED),
        stringify: () => `The session has expired.`,
        format: () => ({
            code: AuthContextErrors[AUTH_CONTEXT_ERROR_TYPE.SESSION_EXPIRED as ErrorType].code,
            message: AuthContextErrors[AUTH_CONTEXT_ERROR_TYPE.SESSION_EXPIRED as ErrorType].stringify()
        })
    }
}
