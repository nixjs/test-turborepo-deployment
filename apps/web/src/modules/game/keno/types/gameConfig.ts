import * as kenoConfigPb from '@athena20/game-portal/inhouse-game/model/instant_keno_config_pb'
import { InstantKenoGetConfigReply } from '@athena20/game-portal/inhouse-game/rpc/instant_keno_get_config_pb'
import * as smartContractAddressPb from '@athena20/game-portal/inhouse-game/model/smart_contract_address_pb'
import * as instantKenoMultiplierPb from '@athena20/game-portal/inhouse-game/model/instant_keno_multiplier_pb'
import { InstantKenoRiskProfile } from '@athena20/game-portal/inhouse-game/model/instant_keno_risk_profile_pb'
import { BaseEnum } from '@lottery/types'

export { InstantKenoRiskProfile }

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

    export interface InstantKenoSpotMultiplier extends instantKenoMultiplierPb.InstantKenoSpotMultiplier.AsObject {}

    export interface InstantKenoMultiplier extends instantKenoMultiplierPb.InstantKenoMultiplier.AsObject {
        riskProfile: InstantKenoRiskProfile
        spotMultiplierMapMap: Array<[number, InstantKenoSpotMultiplier]>
    }

    export interface GameConfig extends kenoConfigPb.InstantKenoConfig.AsObject {
        directServerBetConfigsList: Array<BetConfig>
        smartContractBetConfigsList: Array<BetConfig>
        smartContractAddressesList: Array<SmartContractAddress>
        profileMultipliersList: Array<InstantKenoMultiplier>
    }

    export interface GameConfigResponse extends InstantKenoGetConfigReply.AsObject {
        config: GameConfig
    }
}
