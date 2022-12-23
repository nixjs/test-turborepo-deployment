import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import classNames from 'classnames'
import { Router } from 'consts/router'
import { Balance } from 'components/Balance'
import { GameCardItemStyled } from './styled'

interface CardData {
    title?: string
    image?: string
    amount?: number
    drawDate?: string
}

interface GameCardItemPropArg {
    className?: string
    data: CardData
}

export const GameCardItem: React.FC<GameCardItemPropArg> = React.memo(({ data, className }) => {
    return (
        <GameCardItemStyled className={classNames('game-item', className)}>
            <Link href={Router.ROUTER_GAME_DETAIL} as={`${Router.ROUTER_GAME}/665`} className="game-link">
                <div className="game-inner">
                    <div className="mb-12 overflow-hidden position-relative game-image">
                        <Image src={data?.image || ''} alt={data?.title || ''} fill sizes="100%" quality={100} />
                    </div>
                    <div className="text-left game-body">
                        <div className="game-balance">
                            <Balance price={data?.amount || 0} />
                        </div>
                        <div className="text-14 mt-4 base-black-darkest game-date">{data?.drawDate}</div>
                    </div>
                </div>
            </Link>
        </GameCardItemStyled>
    )
})

GameCardItem.displayName = 'GameCardItem'
