import { InHouseMethod } from 'modules/game/base/grpc/methods'

class RequestMethods extends InHouseMethod {
    public get cashOut(): string {
        return `${this.prefix}CashOut`
    }
    public get betInfo(): string {
        return `${this.prefix}GetBetInfo`
    }
}

export const methods = new RequestMethods('hiLo')
