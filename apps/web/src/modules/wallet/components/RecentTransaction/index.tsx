import React from 'react'
import { TxStyled } from './index.styled'

interface RecentTransactionPropArg {}

export const RecentTransaction: React.FC<RecentTransactionPropArg> = () => {
    return (
        <div>
            <TxStyled className="d-flex align-items-center justify-content-between tx-item tx-item--deposit">
                <div className="d-flex align-items-center">
                    <div className="d-flex justify-content-center rd-4 tx-icon">
                        <i className="iconic_deposit1" />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="mb-4 text-16 text-oswald w500">Deposit</div>
                        <div className="text-14">2022-09-27 20:00:38</div>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div className="text-14 text-oswald w600">+ 0.100353 TRX</div>
                    <div className="d-flex justify-content-end">
                        <div className="css-1egq4zc"></div>
                        <div className="text-14">Completed</div>
                    </div>
                </div>
            </TxStyled>
            <TxStyled className="d-flex align-items-center justify-content-between tx-item tx-item--withdraw">
                <div className="d-flex align-items-center">
                    <div className="d-flex justify-content-center rd-4 tx-icon">
                        <i className="iconic_withdrawal" />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="mb-4 text-16 text-oswald w500">Withdraw</div>
                        <div className="text-14">2022-09-27 20:00:38</div>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div className="text-14 text-oswald w600">+ 0.100353 TRX</div>
                    <div className="d-flex justify-content-end">
                        <div className="css-1egq4zc"></div>
                        <div className="text-14">Completed</div>
                    </div>
                </div>
            </TxStyled>
            <TxStyled className="d-flex align-items-center justify-content-between tx-item tx-item--deposit">
                <div className="d-flex align-items-center">
                    <div className="d-flex justify-content-center rd-4 tx-icon">
                        <i className="iconic_deposit1" />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="mb-4 text-16 text-oswald w500">Deposit</div>
                        <div className="text-14">2022-09-27 20:00:38</div>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div className="text-14 text-oswald w600">+ 0.100353 TRX</div>
                    <div className="d-flex justify-content-end">
                        <div className="css-1egq4zc"></div>
                        <div className="text-14">Completed</div>
                    </div>
                </div>
            </TxStyled>
            <TxStyled className="d-flex align-items-center justify-content-between tx-item tx-item--withdraw">
                <div className="d-flex align-items-center">
                    <div className="d-flex justify-content-center rd-4 tx-icon">
                        <i className="iconic_withdrawal" />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="mb-4 text-16 text-oswald w500">Withdraw</div>
                        <div className="text-14">2022-09-27 20:00:38</div>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div className="text-14 text-oswald w600">+ 0.100353 TRX</div>
                    <div className="d-flex justify-content-end">
                        <div className="css-1egq4zc"></div>
                        <div className="text-14">Completed</div>
                    </div>
                </div>
            </TxStyled>
            <TxStyled className="d-flex align-items-center justify-content-between tx-item tx-item--deposit">
                <div className="d-flex align-items-center">
                    <div className="d-flex justify-content-center rd-4 tx-icon">
                        <i className="iconic_deposit1" />
                    </div>
                    <div className="d-flex flex-column">
                        <div className="mb-4 text-16 text-oswald w500">Deposit</div>
                        <div className="text-14">2022-09-27 20:00:38</div>
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <div className="text-14 text-oswald w600">+ 0.100353 TRX</div>
                    <div className="d-flex justify-content-end">
                        <div className="css-1egq4zc"></div>
                        <div className="text-14">Completed</div>
                    </div>
                </div>
            </TxStyled>
        </div>
    )
}
