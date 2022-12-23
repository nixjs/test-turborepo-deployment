export namespace AuthConstant {
    export const BaseKey = (num: number) => (20 + num).toString()
    export const SubscribeId = {
        LoginStateKey: BaseKey(1),
        UseAuthEffectKey: BaseKey(2),
        UseAccessTokenKey: BaseKey(3),
        UseLoginListener: BaseKey(4)
    }
    export const MessageType = 'AuthenticationProvider'
    export const MessageData = {
        Login: 'LOGIN',
        Logout: 'LOGOUT',
        Register: 'REGISTER',
        NewToken: 'NEW_TOKEN'
    }
}
