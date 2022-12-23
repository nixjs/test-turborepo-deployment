import React from 'react'
import Link from 'next/link'
import { GameCardItem } from './gameCardItem'
import { MegaMenuStyled } from './index.styled'
import data from './mock'

interface MegaMenuPropArg {}

export const MegaMenu: React.FC<MegaMenuPropArg> = () => {
    return (
        <MegaMenuStyled className="mega-menu">
            <div className="mega-container">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="mega-widget">
                                <h3 className="text-oswald text-28 base-black-darkest mb-16 w400 meta-widget-title">Games</h3>
                                <div className="mega-widget-content">
                                    <Link href="/" className="nav-link text-default d-block">
                                        Jackports
                                    </Link>
                                    <Link href="/" className="nav-link text-default d-block">
                                        High Frequency
                                    </Link>
                                    <Link href="/" className="nav-link text-default d-block">
                                        Instants
                                    </Link>
                                    <Link href="/" className="nav-link text-default d-block">
                                        Classic Games
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="offset-lg-1 col-lg-8">
                            <div className="meta-widget">
                                <h3 className="text-oswald text-28 base-black-darkest mb-16 w400 meta-widget-title">Upcoming Games</h3>
                                <div className="meta-widget-content">
                                    <div className="game-lists">
                                        {data &&
                                            data.length > 0 &&
                                            data.map((item, idx) => <GameCardItem className="mega-card-game" key={idx} data={item} />)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MegaMenuStyled>
    )
}
