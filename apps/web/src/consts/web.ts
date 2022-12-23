import { Types } from '@athena20/ts-types'

interface WebBaseConfig extends Record<string, any> {
    social: {
        twitter: string
        facebook: string
        youtube: string
    }
    language: {
        [language: string]: {
            key: string
            name: string
        }
    }
    html: Types.Object<string>
}

export namespace WebConfig {
    export const Base: WebBaseConfig = {
        social: {
            twitter: '/',
            facebook: '/',
            youtube: '/'
        },
        language: {
            english: { key: 'en', name: 'English' },
            china: { key: 'zh-cn', name: 'Chinese' },
            taiwan: { key: 'zh-tw', name: 'Taiwanese' },
            vietnam: { key: 'vi', name: 'Vietnamese' }
        },
        html: {
            disableScrollClass: 'scroll-disabled'
        }
    }
}
