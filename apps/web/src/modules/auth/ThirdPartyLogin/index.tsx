import React from 'react'
import toast from 'react-hot-toast'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useGoogleLogin, CodeResponse } from '@react-oauth/google'
import { ButtonApple, Types as ButtonAppleTypes } from '@nixjs23n6/next-apple-login'
import { Sdk } from '@nixjs23n6/facebook-login'
import { TelegramButton, TelegramUser } from '@nixjs23n6/telegram-login'
import { Button } from '@nixjs23n6/baseui-button'
import { BaseEnum } from '@lottery/types'
import { Config } from 'configs/env'
import * as commonSlice from 'redux/common/slice'
import * as commonSelector from 'redux/common/selectors'
import * as authSocialSlice from 'redux/auth/login/social/slice'
import { ButtonSocial } from 'modules/auth/styled/ButtonSocial.css'
import { WalletLogin } from './WalletLogin'

interface ThirdPartyLoginPropArg {}

export const ThirdPartyLogin: React.FC<ThirdPartyLoginPropArg> = () => {
    const dispatch = useDispatch()
    const toastId = useSelector(commonSelector.toastIDSelector())
    const [expand, setExpand] = React.useState<boolean>(false)

    React.useEffect(() => {
        return () => {
            setExpand(false)
        }
    }, [])

    const onCloseToastAndLoading = () => {
        if (toastId) {
            toast.dismiss(toastId)
            dispatch(authSocialSlice.onSetLoading(null))
        }
    }

    const onExecuteToastAndLoading = (_toastId: string, provider: BaseEnum.AuthenticationProvider) => {
        dispatch(commonSlice.onSetToastID(_toastId))
        dispatch(
            authSocialSlice.onSetLoading({
                loading: true,
                provider
            })
        )
    }

    const onClickGoogle = () => {
        const _toastId = toast('Waiting for Google authentication to log in, please wait a moment...')
        onExecuteToastAndLoading(_toastId, BaseEnum.AuthenticationProvider.AP_GOOGLE)
    }

    const responseGoogle = useGoogleLogin({
        onSuccess: (response: CodeResponse) => {
            if (response.code) {
                dispatch(
                    authSocialSlice.onRequestLoginBySocial({
                        provider: BaseEnum.AuthenticationProvider.AP_GOOGLE,
                        google: {
                            mfaCode: '',
                            token: response.code
                        }
                    })
                )
            }
        },
        onError: () => {
            onCloseToastAndLoading()
        },
        flow: 'auth-code',
        redirect_uri: Config.AUTH_REDIRECT
    })

    const onClickFacebook = () => {
        const _id = toast('Waiting for Facebook authentication to log in, please wait a moment...')
        onExecuteToastAndLoading(_id, BaseEnum.AuthenticationProvider.AP_FACEBOOK)
        Sdk.login({
            scope: 'public_profile,email'
        })
            .then((response) => {
                if (response.status && response.authResponse && response.authResponse.accessToken) {
                    dispatch(
                        authSocialSlice.onRequestLoginBySocial({
                            provider: BaseEnum.AuthenticationProvider.AP_FACEBOOK,
                            facebook: { mfaCode: '', token: response.authResponse.accessToken }
                        })
                    )
                }
            })
            .finally(() => onCloseToastAndLoading())
    }

    const onClickApple = () => {
        const _id = toast('Waiting for Apple authentication to log in, please wait a moment...')
        onExecuteToastAndLoading(_id, BaseEnum.AuthenticationProvider.AP_APPLE)
    }

    const responseApple = (response: ButtonAppleTypes.AppleResponse) => {
        if (response.authorization?.id_token) {
            dispatch(
                authSocialSlice.onRequestLoginBySocial({
                    provider: BaseEnum.AuthenticationProvider.AP_APPLE,
                    apple: { mfaCode: '', token: response.authorization.id_token }
                })
            )
        } else {
            onCloseToastAndLoading()
        }
    }
    const responseTelegram = (response: TelegramUser) => {
        if (response.hash) {
            const { auth_date, first_name, hash, id, username, last_name, photo_url } = response
            dispatch(
                authSocialSlice.onRequestLoginBySocial({
                    provider: BaseEnum.AuthenticationProvider.AP_TELEGRAM,
                    telegram: {
                        authDate: auth_date,
                        firstName: first_name,
                        hash,
                        id,
                        lastName: last_name,
                        username,
                        photoUrl: photo_url
                    }
                })
            )
        } else {
            onCloseToastAndLoading()
        }
    }

    return (
        <>
            <Button
                type="button"
                icon={
                    <>
                        <svg className="svg-view">
                            <use xlinkHref="#svg-google" />
                        </svg>
                        <svg className="d-none svg-icon">
                            <symbol id="svg-google" viewBox="0 0 24 24" preserveAspectRatio="xMinYMin meet">
                                <path d="M23.04 0H0.96C0.429 0 0 0.429 0 0.96V23.04C0 23.571 0.429 24 0.96 24H23.04C23.571 24 24 23.571 24 23.04V0.96C24 0.429 23.571 0 23.04 0ZM17.01 17.568C15.792 18.69 14.13 19.35 12.147 19.35C9.276 19.35 6.792 17.703 5.583 15.303C5.06787 14.2782 4.79972 13.147 4.8 12C4.8 10.812 5.085 9.69 5.583 8.697C6.792 6.294 9.276 4.647 12.147 4.647C14.127 4.647 15.789 5.376 17.064 6.561L14.958 8.67C14.196 7.941 13.227 7.572 12.15 7.572C10.236 7.572 8.616 8.865 8.037 10.602C7.89 11.043 7.806 11.514 7.806 12C7.806 12.486 7.89 12.957 8.037 13.398C8.616 15.135 10.236 16.428 12.147 16.428C13.137 16.428 13.977 16.167 14.634 15.726C15.414 15.204 15.93 14.427 16.101 13.506H12.147V10.662H19.068C19.155 11.145 19.2 11.646 19.2 12.165C19.2 14.406 18.399 16.287 17.01 17.568Z" />
                            </symbol>
                        </svg>
                    </>
                }
                overrideStyled={ButtonSocial}
                className="justify-content-center rd-8 pt-16 pb-16 mr-8 mb-0 button--google"
                onClick={() => {
                    onClickGoogle()
                    responseGoogle()
                }}
            />
            <Button
                type="button"
                icon={
                    <>
                        <svg className="svg-view">
                            <use xlinkHref="#svg-facebook" />
                        </svg>
                        <svg className="d-none svg-icon">
                            <symbol id="svg-facebook" viewBox="0 0 18 18" preserveAspectRatio="xMinYMin meet">
                                <path d="M16.313,18h-4.504v-6.192h3.087V8.671h-3.087V7.135V6.831V6.814l0,0c0.01-0.328,0.277-0.591,0.607-0.591h0.067h1.113h1.62V3.086h-2.733l0,0l-0.009,0.018h-0.092c-2.051,0-3.712,1.661-3.712,3.711v0.911v0.945H6.191v3.137h2.479V18H1.687C0.755,18,0,17.242,0,16.313V1.686C0,0.754,0.755,0,1.687,0h14.626C17.244,0,18,0.754,18,1.686v14.627C18,17.242,17.244,18,16.313,18z"></path>
                            </symbol>
                        </svg>
                    </>
                }
                overrideStyled={ButtonSocial}
                className="justify-content-center rd-8 pt-16 pb-16 mr-8 mb-0 button--facebook"
                onClick={() => {
                    onClickFacebook()
                }}
            />
            <WalletLogin />
            <div
                className={classNames('d-inline-flex align-items-center login-expand', {
                    active: expand
                })}
            >
                <div className="d-inline-flex expanding-group">
                    <ButtonApple
                        clientId={Config.AUTH_APPLE_CLIENT_ID}
                        redirectURI={Config.AUTH_REDIRECT}
                        responseType="id_token"
                        responseMode="query"
                        className="reset-button rd-8 d-flex align-items-center justify-content-center mr-8 auth-button--third-party button--apple"
                        callback={responseApple}
                        triggerClick={onClickApple}
                    >
                        <svg className="svg-view">
                            <use xlinkHref="#svg-apple" />
                        </svg>
                        <svg className="d-none svg-icon">
                            <symbol id="svg-apple" viewBox="0 0 21 24" preserveAspectRatio="xMinYMin meet">
                                <path d="M19.3201 17.0726C19.1929 17.441 19.0597 17.7926 18.9181 18.1298C18.5725 18.9266 18.1645 19.6598 17.6917 20.333C17.0485 21.2522 16.5205 21.8882 16.1137 22.241C15.4837 22.8206 14.8081 23.1182 14.0845 23.1338C13.5649 23.1338 12.9397 22.9862 12.2101 22.6874C11.4793 22.3886 10.8073 22.241 10.1929 22.241C9.54852 22.241 8.85732 22.3886 8.11812 22.6874C7.37772 22.9862 6.78132 23.1434 6.32532 23.1578C5.63172 23.1878 4.94052 22.883 4.25052 22.241C3.81012 21.857 3.25932 21.1982 2.59932 20.2658C1.89132 19.2698 1.30932 18.1142 0.853317 16.7966C0.364917 15.3746 0.120117 13.997 0.120117 12.6638C0.120117 11.1362 0.450117 9.81861 1.11132 8.71461C1.63092 7.82781 2.32212 7.12821 3.18732 6.61461C4.05252 6.10101 4.98732 5.83941 5.99412 5.82261C6.54492 5.82261 7.26732 5.99301 8.16492 6.32781C9.06012 6.66381 9.63492 6.83421 9.88692 6.83421C10.0753 6.83421 10.7137 6.63501 11.7961 6.23781C12.8197 5.86941 13.6837 5.71701 14.3917 5.77701C16.3093 5.93181 17.7493 6.68781 18.7081 8.04981C16.9933 9.08901 16.1449 10.5446 16.1617 12.4118C16.1773 13.8662 16.7041 15.077 17.7409 16.0382C18.2113 16.4834 18.7369 16.8278 19.3201 17.0726ZM14.4961 0.366211C14.5117 0.518611 14.5189 0.671011 14.5189 0.822211C14.5189 1.96221 14.1025 3.02661 13.2733 4.01181C12.2713 5.18301 11.0593 5.85981 9.74532 5.75301C9.72852 5.61621 9.71892 5.47221 9.71892 5.32101C9.71892 4.22661 10.1953 3.05541 11.0413 2.09781C11.4637 1.61301 12.0013 1.20981 12.6517 0.88821C13.3021 0.57141 13.9177 0.396211 14.4961 0.366211Z" />
                            </symbol>
                        </svg>
                    </ButtonApple>
                    <TelegramButton
                        dataOnAuth={responseTelegram}
                        botName={Config.AUTH_TELEGRAM_BOT}
                        className="position-relative overflow-hidden reset-button rd-8 d-flex align-items-center justify-content-center mr-8 auth-button--third-party button--telegram"
                    >
                        <svg className="svg-view">
                            <use xlinkHref="#svg-telegram" />
                        </svg>
                        <svg className="d-none svg-icon">
                            <symbol id="svg-telegram" viewBox="0 0 25 24" preserveAspectRatio="xMinYMin meet">
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M3.03721 10.4217C7.86904 8.31656 11.091 6.92872 12.7031 6.25819C17.3061 4.34367 18.2625 4.0111 18.8859 4.00012C19.023 3.9977 19.3296 4.03168 19.5282 4.19282C19.6959 4.32888 19.742 4.51268 19.7641 4.64168C19.7862 4.77068 19.8137 5.06454 19.7918 5.29416C19.5424 7.91499 18.4631 14.275 17.914 17.2104C17.6816 18.4525 17.2242 18.8689 16.7813 18.9097C15.8187 18.9983 15.0879 18.2736 14.1556 17.6625C12.6968 16.7063 11.8727 16.111 10.4567 15.1779C8.82028 14.0995 9.88111 13.5068 10.8137 12.5382C11.0578 12.2847 15.2986 8.42727 15.3807 8.07735C15.391 8.03358 15.4005 7.87045 15.3036 7.78431C15.2067 7.69817 15.0637 7.72763 14.9604 7.75106C14.8141 7.78426 12.4837 9.32458 7.96918 12.372C7.3077 12.8262 6.70855 13.0475 6.17173 13.0359C5.57994 13.0232 4.44155 12.7013 3.59528 12.4262C2.5573 12.0888 1.73233 11.9104 1.80417 11.3374C1.84158 11.039 2.2526 10.7337 3.03721 10.4217Z"
                                    fill="#ffffff"
                                />
                            </symbol>
                        </svg>
                    </TelegramButton>
                </div>
                <Button
                    variant="secondary"
                    type="button"
                    icon={
                        <>
                            <svg className="svg-view">
                                <use xlinkHref="#svg-plus" />
                            </svg>
                            <svg className="d-none svg-icon">
                                <symbol id="svg-plus" viewBox="0 0 21 24" preserveAspectRatio="xMinYMin meet">
                                    <path d="M12 20V12M12 12V4M12 12H20M12 12H4" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                </symbol>
                            </svg>
                        </>
                    }
                    overrideStyled={ButtonSocial}
                    className="justify-content-center rd-8 pt-16 pb-16 mb-0 button--plus"
                    onClick={() => setExpand(!expand)}
                    title="Other choices"
                />
            </div>
        </>
    )
}
