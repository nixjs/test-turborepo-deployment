import React from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { WALLET_TYPE, NETWORK_WALLET, Utils } from '@athena20/ts-wallet'
import { useWallet } from '@athena20/ts-wallet-react'
import { BaseEnum } from '@lottery/types'
import { Button } from '@nixjs23n6/baseui-button'
import * as commonSlice from 'redux/common/slice'
import * as authSlice from 'redux/auth/slice'
import * as walletSlice from 'redux/auth/login/wallet/slice'
import { ButtonSocial } from 'modules/auth/styled/ButtonSocial.css'

interface WalletLoginPropArg {}

const WalletProvider: Partial<Record<WALLET_TYPE, BaseEnum.AuthenticationProvider>> = {
    [WALLET_TYPE.BINANCE_CHAIN_WALLET]: BaseEnum.AuthenticationProvider.AP_BINANCE_CHAIN_WALLET,
    [WALLET_TYPE.META_MASK]: BaseEnum.AuthenticationProvider.AP_METAMASK,
    [WALLET_TYPE.TRON_LINK]: BaseEnum.AuthenticationProvider.AP_TRONLINK
}

const WalletNetwork: Partial<Record<NETWORK_WALLET, BaseEnum.NetworkSymbol>> = {
    [NETWORK_WALLET.BSC]: BaseEnum.NetworkSymbol.NS_BSC,
    [NETWORK_WALLET.ETH]: BaseEnum.NetworkSymbol.NS_ETH,
    [NETWORK_WALLET.TRON]: BaseEnum.NetworkSymbol.NS_TRX
}

export const WalletLogin: React.FC<WalletLoginPropArg> = () => {
    const { onConnect, providerConnected, signMessage, provider: ourProvider } = useWallet()

    const dispatch = useDispatch()

    const onCheckWalletInstalled = (type: WALLET_TYPE) => {
        const getWalletInstalled = Utils.onGetWalletInstalledBy(type)
        dispatch(walletSlice.onSetWalletProvider(WalletProvider[type] as BaseEnum.AuthenticationProvider))
        if (!getWalletInstalled || !getWalletInstalled.installed) {
            dispatch(walletSlice.onCheckWalletNotInstalled(true))
            dispatch(authSlice.onSetOpenAuthModal(BaseEnum.ActivateState.DEACTIVATE))
            return false
        }
        return true
    }

    const onRequestNonce = React.useCallback(
        async (provider: BaseEnum.AuthenticationProvider, toastId: string) => {
            if (ourProvider?.instance) {
                const network = await ourProvider.instance.getNetwork()
                const walletAddress = await ourProvider.instance.getAddress()
                setTimeout(() => {
                    if (network.status === 'SUCCESS') {
                        if (!network.data || ![NETWORK_WALLET.BSC, NETWORK_WALLET.ETH, NETWORK_WALLET.TRON].includes(network.data)) {
                            toast.dismiss()
                            toast.error(`Network not found or unsupported. Please switch: BSC, TRX, ETH.`)
                        } else {
                            dispatch(
                                walletSlice.onRequestNonce({
                                    networkSymbol:
                                        network.status === 'SUCCESS' && network.data
                                            ? (WalletNetwork[network.data] as BaseEnum.NetworkSymbol)
                                            : BaseEnum.NetworkSymbol.NS_NONE,
                                    walletAddress: walletAddress.status === 'SUCCESS' ? (walletAddress.data as string) : '',
                                    provider,
                                    signMessage
                                })
                            )
                        }
                    } else {
                        dispatch(commonSlice.onDismissToast(toastId))
                        toast.error(`Network not found or unsupported. Please switch: BSC, TRX, ETH.`)
                    }
                }, 400)
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [ourProvider, signMessage]
    )

    const onClickMetaMask = React.useCallback(async () => {
        const type = WALLET_TYPE.META_MASK
        if (onCheckWalletInstalled(type)) {
            const t = toast.loading('Waiting for Metamask wallet browser extension to log, please wait a moment...')
            dispatch(commonSlice.onSetToastID(t))
            dispatch(walletSlice.onSetLoading(true))
            onConnect(
                type,
                () => {
                    onRequestNonce(BaseEnum.AuthenticationProvider.AP_METAMASK, t)
                },
                () => toast.error('Failed to request Metamask wallet')
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [providerConnected, onRequestNonce])

    const onClickBsc = React.useCallback(async () => {
        const type = WALLET_TYPE.BINANCE_CHAIN_WALLET
        if (onCheckWalletInstalled(type)) {
            const t = toast.loading('Waiting for Binance chain wallet browser extension to log, please wait a moment...')
            dispatch(commonSlice.onSetToastID(t))
            dispatch(walletSlice.onSetLoading(true))
            onConnect(
                type,
                () => {
                    onRequestNonce(BaseEnum.AuthenticationProvider.AP_BINANCE_CHAIN_WALLET, t)
                },
                () => toast.error('Failed to request Binance wallet')
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [providerConnected, onRequestNonce])

    const onClickTronLink = React.useCallback(async () => {
        const type = WALLET_TYPE.TRON_LINK
        if (onCheckWalletInstalled(type)) {
            const t = toast.loading('Waiting for TronLink wallet browser extension to log, please wait a moment...')
            dispatch(commonSlice.onSetToastID(t))
            dispatch(walletSlice.onSetLoading(true))
            onConnect(
                type,
                (data) => {
                    if (data.data === '') {
                        toast.error('You’ll need to log in the wallet before you can access the website.')
                        toast.dismiss(t)
                        return
                    }
                    onRequestNonce(BaseEnum.AuthenticationProvider.AP_TRONLINK, t)
                },
                (error) => toast.error(`Failed to request TronLink wallet: ${JSON.stringify(error)}`)
            )
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [providerConnected, onRequestNonce])

    React.useEffect(() => {
        return () => {
            dispatch(walletSlice.onCheckWalletNotInstalled(false))
            dispatch(walletSlice.onSetWalletProvider(BaseEnum.AuthenticationProvider.AP_NONE))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Button
                variant="secondary"
                type="button"
                icon={
                    <>
                        <svg className="svg-view">
                            <use xlinkHref="#svg-metamask" />
                        </svg>
                        <svg className="d-none svg-icon">
                            <symbol id="svg-metamask" viewBox="0 0 36 36" preserveAspectRatio="xMinYMin meet">
                                <path
                                    d="M31.5164 4.5L19.7969 13.1716L21.9762 8.06115L31.5164 4.5Z"
                                    fill="#E17726"
                                    stroke="#E17726"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M4.48438 4.5L16.0996 13.2525L14.0246 8.06114L4.48438 4.5Z"
                                    fill="#E27625"
                                    stroke="#E27625"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M27.296 24.6074L24.1777 29.371L30.8547 31.2094L32.7674 24.7116L27.296 24.6074Z"
                                    fill="#E27625"
                                    stroke="#E27625"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M3.24414 24.7116L5.14522 31.2094L11.8106 29.371L8.70396 24.6074L3.24414 24.7116Z"
                                    fill="#E27625"
                                    stroke="#E27625"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11.4504 16.5589L9.5957 19.357L16.2031 19.6576L15.9829 12.5469L11.4504 16.5589Z"
                                    fill="#E27625"
                                    stroke="#E27625"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M24.5495 16.5598L19.9476 12.4668L19.7969 19.6585L26.4043 19.3579L24.5495 16.5598Z"
                                    fill="#E27625"
                                    stroke="#E27625"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11.8105 29.3711L15.8097 27.4402L12.367 24.7578L11.8105 29.3711Z"
                                    fill="#E27625"
                                    stroke="#E27625"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M20.1914 27.4402L24.179 29.3711L23.6342 24.7578L20.1914 27.4402Z"
                                    fill="#E27625"
                                    stroke="#E27625"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M24.179 29.3703L20.1914 27.4395L20.5159 30.0293L20.4811 31.1278L24.179 29.3703Z"
                                    fill="#D5BFB2"
                                    stroke="#D5BFB2"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11.8105 29.3703L15.52 31.1278L15.4968 30.0293L15.8097 27.4395L11.8105 29.3703Z"
                                    fill="#D5BFB2"
                                    stroke="#D5BFB2"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M15.5888 23.0465L12.2734 22.0753L14.615 21L15.5888 23.0465Z"
                                    fill="#233447"
                                    stroke="#233447"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M20.4102 23.0465L21.3839 21L23.7371 22.0753L20.4102 23.0465Z"
                                    fill="#233447"
                                    stroke="#233447"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11.8097 29.371L12.3894 24.6074L8.70312 24.7116L11.8097 29.371Z"
                                    fill="#CC6228"
                                    stroke="#CC6228"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M23.6094 24.6074L24.1774 29.371L27.2956 24.7116L23.6094 24.6074Z"
                                    fill="#CC6228"
                                    stroke="#CC6228"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M26.4043 19.3574L19.7969 19.658L20.4112 23.0458L21.385 20.9992L23.7382 22.0746L26.4043 19.3574Z"
                                    fill="#CC6228"
                                    stroke="#CC6228"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12.2734 22.0746L14.615 20.9992L15.5888 23.0458L16.2031 19.658L9.5957 19.3574L12.2734 22.0746Z"
                                    fill="#CC6228"
                                    stroke="#CC6228"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9.5957 19.3574L12.3662 24.757L12.2734 22.0746L9.5957 19.3574Z"
                                    fill="#E27525"
                                    stroke="#E27525"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M23.7371 22.0746L23.6328 24.757L26.4033 19.3574L23.7371 22.0746Z"
                                    fill="#E27525"
                                    stroke="#E27525"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M16.2043 19.6582L15.5898 23.046L16.3665 27.0464L16.5404 21.7741L16.2043 19.6582Z"
                                    fill="#E27525"
                                    stroke="#E27525"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M19.7973 19.6582L19.4727 21.7626L19.635 27.0464L20.4116 23.046L19.7973 19.6582Z"
                                    fill="#E27525"
                                    stroke="#E27525"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M20.4114 23.0455L19.6348 27.0459L20.1912 27.4391L23.634 24.7566L23.7384 22.0742L20.4114 23.0455Z"
                                    fill="#F5841F"
                                    stroke="#F5841F"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M12.2734 22.0742L12.3662 24.7566L15.809 27.4391L16.3654 27.0459L15.5888 23.0455L12.2734 22.0742Z"
                                    fill="#F5841F"
                                    stroke="#F5841F"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M20.4814 31.1286L20.5161 30.0301L20.2147 29.7758H15.7866L15.4968 30.0301L15.52 31.1286L11.8105 29.3711L13.1088 30.4348L15.7402 32.2501H20.2495L22.8924 30.4348L24.1791 29.3711L20.4814 31.1286Z"
                                    fill="#C0AC9D"
                                    stroke="#C0AC9D"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M20.1908 27.4399L19.6344 27.0469H16.3655L15.8091 27.4399L15.4961 30.0299L15.7859 29.7755H20.214L20.5154 30.0299L20.1908 27.4399Z"
                                    fill="#161616"
                                    stroke="#161616"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M32.0152 13.7381L33.0005 8.95143L31.5167 4.5L20.1914 12.8826L24.5499 16.5593L30.7053 18.3515L32.0616 16.7675L31.4704 16.3396L32.4093 15.4841L31.6906 14.9291L32.6296 14.2122L32.0152 13.7381Z"
                                    fill="#763E1A"
                                    stroke="#763E1A"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M3 8.95143L3.99691 13.7381L3.35936 14.2122L4.30989 14.9291L3.59119 15.4841L4.53014 16.3396L3.93895 16.7675L5.29521 18.3515L11.4506 16.5593L15.8091 12.8826L4.48377 4.5L3 8.95143Z"
                                    fill="#763E1A"
                                    stroke="#763E1A"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M30.7039 18.3507L24.5486 16.5586L26.4033 19.3567L23.6328 24.7561L27.2959 24.7099H32.7673L30.7039 18.3507Z"
                                    fill="#F5841F"
                                    stroke="#F5841F"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M11.4512 16.5586L5.29592 18.3507L3.24414 24.7099H8.70396L12.367 24.7561L9.59654 19.3567L11.4512 16.5586Z"
                                    fill="#F5841F"
                                    stroke="#F5841F"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M19.7962 19.6574L20.1904 12.8819L21.9755 8.06055H14.0234L15.8086 12.8819L16.2027 19.6574L16.3534 21.7848L16.365 27.0456H19.6339L19.6455 21.7848L19.7962 19.6574Z"
                                    fill="#F5841F"
                                    stroke="#F5841F"
                                    strokeWidth="0.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </symbol>
                        </svg>
                    </>
                }
                overrideStyled={ButtonSocial}
                className="justify-content-center rd-8 pt-16 pb-16 mr-8 mb-0 button--metamask"
                onClick={onClickMetaMask}
            />
            <Button
                variant="secondary"
                type="button"
                icon={
                    <>
                        <svg className="svg-view">
                            <use xlinkHref="#svg-bsc" />
                        </svg>
                        <svg className="d-none svg-icon">
                            <symbol id="svg-bsc" viewBox="0 0 21 24" preserveAspectRatio="xMinYMin meet">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M12.0511 2L6.73933 5.06342L8.6922 6.19513L12.0511 4.26342L15.41 6.19513L17.3629 5.06342L12.0511 2ZM15.41 7.79513L17.3629 8.92685V11.1903L14.004 13.122V16.9854L12.0511 18.1171L10.0983 16.9854V13.122L6.73933 11.1903V8.92685L8.6922 7.79513L12.0511 9.72682L15.41 7.79513ZM17.3629 12.7903V15.0537L15.41 16.1854V13.9219L17.3629 12.7903ZM15.3905 17.7854L18.7495 15.8537V11.9902L20.7023 10.8586V16.9854L15.3905 20.0488V17.7854ZM18.7495 8.12684L16.7966 6.99513L18.7495 5.86342L20.7023 6.99513V9.25855L18.7495 10.3903V8.12684ZM10.0983 20.8683V18.6049L12.0511 19.7366L14.004 18.6049V20.8683L12.0511 22L10.0983 20.8683ZM8.6922 16.1854L6.73933 15.0537V12.7903L8.6922 13.9219V16.1854ZM12.0511 8.12684L10.0983 6.99513L12.0511 5.86342L14.004 6.99513L12.0511 8.12684ZM7.30565 6.99513L5.35277 8.12684V10.3903L3.3999 9.25855V6.99513L5.35277 5.86342L7.30565 6.99513ZM3.3999 10.8586L5.35277 11.9902V15.8537L8.71171 17.7854V20.0488L3.3999 16.9854V10.8586Z"
                                    fill="#F0B90B"
                                />
                            </symbol>
                        </svg>
                    </>
                }
                overrideStyled={ButtonSocial}
                className="justify-content-center rd-8 pt-16 pb-16 mr-8 mb-0 button--metamask"
                onClick={onClickBsc}
            />

            <Button
                type="button"
                icon={
                    <>
                        <svg className="svg-view">
                            <use xlinkHref="#svg-tronlink" />
                        </svg>
                        <svg className="d-none svg-icon">
                            <symbol id="svg-tronlink" viewBox="0 0 36 36" preserveAspectRatio="xMinYMin meet">
                                <path
                                    d="M31.1328 12.0378C29.8011 10.7394 27.959 8.75657 26.4587 7.35034L26.3699 7.28472C26.2222 7.15946 26.0557 7.06122 25.8772 6.9941C22.2596 6.28161 5.42327 2.95821 5.0948 3.0004C5.00276 3.01401 4.91478 3.04925 4.83735 3.10352L4.75301 3.17383C4.64916 3.28521 4.57029 3.41976 4.52219 3.56758L4.5 3.62851V3.96132V4.01288C6.39537 9.58625 13.8792 27.8438 15.3529 32.1281C15.4416 32.4188 15.6103 32.9719 15.9255 33H15.9965C16.1652 33 16.8842 31.9969 16.8842 31.9969C16.8842 31.9969 29.739 15.5346 31.0396 13.7815C31.2079 13.5656 31.3565 13.3333 31.4834 13.0878C31.5158 12.8957 31.5005 12.698 31.4391 12.514C31.3776 12.33 31.2721 12.1659 31.1328 12.0378ZM20.1823 13.9549L25.6686 9.15032L28.8867 12.2815L20.1823 13.9549ZM18.0516 13.6409L8.60588 5.46599L23.8887 8.44251L18.0516 13.6409ZM18.9039 15.783L28.5716 14.1378L17.519 28.2001L18.9039 15.783ZM7.32307 6.2816L17.2615 15.1877L15.8234 28.2094L7.32307 6.2816Z"
                                    fill="#FF060A"
                                />
                            </symbol>
                        </svg>
                    </>
                }
                overrideStyled={ButtonSocial}
                className="justify-content-center rd-8 pt-16 pb-16 mr-8 mb-0 button--tronlink"
                onClick={() => {
                    onClickTronLink()
                }}
            />
        </>
    )
}
