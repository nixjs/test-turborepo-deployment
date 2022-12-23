import { InHouseMethod } from 'modules/game/base/grpc/methods'

class RequestMethods extends InHouseMethod {
    public get getLastResults(): string {
        return `${this.prefix}GetLastResults`
    }
}

export const methods = new RequestMethods('dice')
