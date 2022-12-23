import * as hiloConfigPb from '@athena20/game-portal/inhouse-game/model/hilo_config_pb'
import { HiLoGetConfigReply } from '@athena20/game-portal/inhouse-game/rpc/hilo_get_config_pb'
import * as smartContractAddressPb from '@athena20/game-portal/inhouse-game/model/smart_contract_address_pb'
import { BaseEnum } from '@lottery/types'

export namespace GameConfigTypes {
    export interface MultipliersConfig {
        winningChance: string
        multiplier: string
    }

    export interface BetConfig {
        currencySymbol: string
        minBet: string
        maxBet: string
        defaultBet: string
        maxOutput: string
        highRoller: string
    }

    export interface SmartContractAddress extends smartContractAddressPb.SmartContractAddress.AsObject {
        networkSymbol: BaseEnum.NetworkSymbol
    }

    export interface GameConfig extends hiloConfigPb.HiLoConfig.AsObject {
        directServerBetConfigsList: Array<BetConfig>
        smartContractBetConfigsList: Array<BetConfig>
        smartContractAddressesList: Array<SmartContractAddress>
    }

    export interface GameConfigResponse extends HiLoGetConfigReply.AsObject {
        config: GameConfig
    }
}
