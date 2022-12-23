import { isValid, format } from 'date-fns'

const DATE_FORMAT = {
    SECONDS_TSP: 't',
    MILLISECOND_TSP: 'T',
    dd_MM_yyyy: 'dd/MM/yyyy',
    HHmmss: 'HH:mm:ss'
}

const toDateConvert = (value: Date | string, fmt: string) => {
    let d = new Date()
    if (value) {
        d = new Date(value)
        if (!isValid(d)) {
            throw new Error('Value is invalid')
        }
    }
    return format(d, fmt)
}

const toTimestamp = (value: Date | string) => toDateConvert(value, DATE_FORMAT.SECONDS_TSP)
const toDate = (value: Date | string, fmt: string = DATE_FORMAT.dd_MM_yyyy) => toDateConvert(value, fmt)
const toTime = (value: Date | string, fmt: string = DATE_FORMAT.HHmmss) => toDateConvert(value, fmt)

const fromSeconds = (value: number) => {
    if (!value || typeof value !== 'number') {
        throw new Error('Value is invalid')
    }
    const d = Math.floor(value / (60 * 60 * 24))
    const h = Math.floor((value % (60 * 60 * 24)) / (60 * 60))
    const m = Math.floor(((value % (60 * 60 * 24)) % (60 * 60)) / 60)
    const s = Math.floor(((value % (60 * 60 * 24)) % (60 * 60)) % 60)
    return { d, h, m, s }
}

const fromDuration2Minutes = (dur: string) => {
    const b = {
        m: 1,
        h: 60,
        d: 1440
    }
    const v = dur.substring(0, dur.length - 1)
    const k = dur.substring(dur.length - 1, dur.length)
    if (!(b as any)[k]) {
        return 0
    }
    return Number((b as any)[k]) * Number(v)
}

export { DATE_FORMAT, toDateConvert, toTimestamp, toDate, toTime, fromSeconds, fromDuration2Minutes }
