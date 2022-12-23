import { InHouseMethod } from 'modules/game/base/grpc/methods'

class RequestMethods extends InHouseMethod {}

export const methods = new RequestMethods('instantKeno')
