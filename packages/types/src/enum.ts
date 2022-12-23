import { GameSymbol } from '@athena20/game-portal/common/game_symbol_pb'
import { NetworkSymbol } from '@athena20/game-portal/common/network_symbol_pb'
import { PlayingMode } from '@athena20/game-portal/common/playing_mode_pb'
import { SocialProvider } from '@athena20/game-portal/user/model/social_provider_pb'
import { AuthenticationProvider } from '@athena20/game-portal/user/model/authentication_provider_pb'
import { FlowStatus } from '@athena20/game-portal/user/model/flow_status_pb'
import { SecurityChallenge } from '@athena20/game-portal/user/model/security_challenge_pb'
import { WalletProvider } from '@athena20/game-portal/payment/model/wallet_provider_pb'
import { TokenStandard } from '@athena20/game-portal/payment/model/token_standard_pb'
import { AppType } from '@athena20/game-portal/user/model/app_type_pb'

enum BalanceChangeType {
    BCT_NONE = 0,
    BCT_GAME = 1,
    BCT_DEPOSIT = 2,
    BCT_WITHDRAW = 3,
    BCT_MINING = 4,
    BCT_STAKING = 5
}

enum BalanceWalletTypes {
    LIVE_WALLET = 1,
    EXTERNAL_WALLET
}

enum BoolFilter {
    BF_NONE = 0,
    BF_TRUE = 1,
    BF_FALSE = 2,
    BF_ALL = 3
}

enum ActivateState {
    ACTIVATE = 1,
    DEACTIVATE
}

export {
    GameSymbol,
    NetworkSymbol,
    PlayingMode,
    BalanceChangeType,
    BalanceWalletTypes,
    BoolFilter,
    SocialProvider,
    AuthenticationProvider,
    ActivateState,
    FlowStatus,
    SecurityChallenge,
    WalletProvider,
    TokenStandard,
    AppType
}
