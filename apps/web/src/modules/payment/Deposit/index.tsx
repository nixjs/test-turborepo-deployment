import React from 'react'
import { useSelector } from 'react-redux'
import { Tabs } from '@nixjs23n6/baseui-tab'
import * as depositSelector from 'redux/payment/deposit/selectors'
import { TabCss } from './Tab.css'
import { CurrencyNetwork } from '../components/CurrencyNetwork'
import { SelectNetworkRequired } from '../components/SelectNetworkRequired'
import { DepositInternal } from './Internal'
import { DepositExternal } from './External'

interface DepositComponentPropArg {}

export const DepositComponent: React.FC<DepositComponentPropArg> = () => {
    const network = useSelector(depositSelector.depsNetworkSelectedSelector())

    const renderDepositContent = React.useCallback(() => {
        if (!network) {
            return <SelectNetworkRequired className="mt-32" />
        }
        return (
            <Tabs overrideStyled={TabCss}>
                <Tabs.List>
                    <Tabs.Tab eventKey="first">Manual Deposit</Tabs.Tab>
                    <Tabs.Tab eventKey="second">Pay With Wallet</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panels>
                    <Tabs.Panel eventKey="first" className="first">
                        <DepositInternal />
                    </Tabs.Panel>
                    <Tabs.Panel eventKey="second" className="second">
                        <DepositExternal />
                    </Tabs.Panel>
                </Tabs.Panels>
            </Tabs>
        )
    }, [network])

    return (
        <div>
            <h3 className="text-center text-oswald text-20 w500">Deposit</h3>
            <div className="pt-24 pl-16 pr-16">
                <CurrencyNetwork />
            </div>
            <div className="payment-content pl-16 pr-16 pt-16">{renderDepositContent()}</div>
        </div>
    )
}
