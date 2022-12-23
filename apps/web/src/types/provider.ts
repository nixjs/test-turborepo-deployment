import { PROVIDER_LOGIN } from 'consts/provider'

export namespace ProviderLoginTypes {
    export type Provider = keyof typeof PROVIDER_LOGIN
}
