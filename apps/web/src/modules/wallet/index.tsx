import React from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { Container, Row, Col } from '@nixjs23n6/baseui-grid'
import { PaymentModal } from 'modules/payment'
import * as coingeckoSlice from 'redux/coingecko/slice'
import { WalletBanner } from './components/WalletBanner'
import { WalletBalance } from './components/WalletBalance'
import { RecentTransaction } from './components/RecentTransaction'

interface WalletArg {}

export const Wallet: React.FC<WalletArg> = () => {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(
            coingeckoSlice.onStartCoingeckoPrice({
                ids: 'ethereum,bitcoin,binancecoin,tron,binance-usd,bnb,tether',
                currencies: 'usd,btc',
                include24hrChange: true,
                include24hrVol: false
            })
        )
        return () => {
            dispatch(coingeckoSlice.onStopCoingeckoPrice())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="main-content">
            <WalletBanner />
            <div className="pt-24 pb-24">
                <Container>
                    <Row>
                        <Col lg={7} md={6}>
                            <h3 className="text-oswald text-18 mb-24">My Assets</h3>
                            <WalletBalance />
                        </Col>
                        <Col lg={{ offset: 1, size: 4, order: 0 }} md={{ offset: 1, size: 5, order: 0 }}>
                            <div className="d-flex align-items-end justify-content-between mb-24">
                                <h3 className="text-oswald text-18">Recent Transactions</h3>
                                <Link href={'/'} className="text-14">
                                    View all
                                </Link>
                            </div>
                            <RecentTransaction />
                        </Col>
                    </Row>
                </Container>
            </div>
            <PaymentModal />
        </div>
    )
}
