import React from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { css } from 'styled-components'
import { Button } from '@nixjs23n6/baseui-button'
import { QRCode } from '@nixjs23n6/qrcode-react'
import { Input } from '@lottery/uikit'
import { BaseNetworkInfo } from 'consts/network'
import * as depositSelector from 'redux/payment/deposit/selectors'
import { DepositNotFound } from '../components/DepositNotFound'
import { CoinListSelect } from 'modules/payment/components/CoinList'

interface DepositInternalPropArg {}

export const DepositInternal: React.FC<DepositInternalPropArg> = () => {
    const depsCurrencySelected = useSelector(depositSelector.depsCurrencySelectedSelector())
    const depsWalletInfo = useSelector(depositSelector.depsAddressByCurrencyByNetworkSelector())
    const token = useSelector(depositSelector.depsTokenListByNetworkSelectedSelector())

    const onCopyAddress = (result: boolean) => {
        if (result) {
            toast.success('Copied to clipboard')
        }
    }

    return (
        <>
            {depsWalletInfo?.address ? (
                <>
                    <Input
                        label="Deposit Wallet Address"
                        classNameWrapper="mb-24"
                        classNameLabel="mb-8 w400 base-black-darker"
                        classNameContent="d-flex flex-fill"
                        className="text-overflow-ellipsis"
                        id="address"
                        name="address"
                        type={'text'}
                        placeholder="Your deposit wallet address"
                        autoComplete="off"
                        spellCheck="false"
                        readOnly
                        disabled
                        value={depsWalletInfo.address}
                        suffixHTML={
                            <CopyToClipboard text={depsWalletInfo.address} onCopy={(_text: any, result: boolean) => onCopyAddress(result)}>
                                <Button
                                    autoWidth
                                    variant="dark"
                                    className="base-white"
                                    overrideStyled={css`
                                        --base-button-height: 2.25rem;
                                        --base-button-radius: 0.375rem;
                                    `}
                                >
                                    Copy
                                </Button>
                            </CopyToClipboard>
                        }
                    />
                    <CoinListSelect />
                    {token && (
                        <div className="mt-24 text-center">
                            <QRCode
                                value={depsWalletInfo.address}
                                imageSettings={{
                                    image: `/tokens/ic24px_${depsCurrencySelected?.symbol.toLowerCase() || 'none'}.svg`
                                }}
                                bgColor="#e7e7e7"
                                className="rd-8 mb-24"
                            />
                            <div className="MT-24 base-black">
                                {token?.minDeposit && (
                                    <p className="base-black-darker mb-24">
                                        Minimum deposit: <span className="base-black">{`${token.minDeposit} ${token.symbol}`}</span>
                                    </p>
                                )}
                                <p className="base-black-darker mb-8">
                                    Ensure the network is{' '}
                                    <span className="w700 base-black">
                                        {(BaseNetworkInfo as any)[depsWalletInfo.networkSymbol].value || 'Unknown'}
                                    </span>
                                </p>
                                <p className="base-black-darker">{`Send only ${token?.symbol} to this deposit address.`}</p>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <DepositNotFound className="base-black-darker" message="Unsupported" fillColor={'#7b7b7b'} />
            )}
        </>
    )
}
