import debug from 'debug'
import { Interfaces, Types } from '@athena20/ts-types'
import env, { EnvNameConfig } from 'configs/env'

export interface MessageLogger {
    method?: string
    parameters?: Types.Object<any>
    metadata?: Types.Object<any>
    [name: string]: any
}

export class Logger {
    private _log: debug.Debugger
    constructor(logger?: Interfaces.Logger) {
        this._log = debug('')
        this._log.enabled = (logger && logger.debug) || false
        this._log.namespace = (logger && logger.namespace) || ''
        this._log.color = (logger && logger.color) || '#D3DEDC'
    }

    emit(title: string, type: 'Notify' | 'Success' | 'Error', context?: MessageLogger, prefix?: string) {
        let color = '#FABB51'
        if (type === 'Success') {
            color = '#6BCB77'
        } else if (type === 'Error') {
            color = '#FF6B6B'
        }
        this._log(`%c${prefix}__${title}`, `color: ${color}; font-size:14px`)
        if (context) this._log('» Context:', context)
    }
}

export const logPush = new Logger({
    debug: env !== EnvNameConfig.PRODUCTION
})
