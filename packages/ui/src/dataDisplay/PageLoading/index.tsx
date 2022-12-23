import React from 'react'
import { PageLoadingStyled } from './index.styled'

interface PageLoadingPropArg {}

export const PageLoading: React.FC<PageLoadingPropArg> = () => {
    return (
        <PageLoadingStyled>
            <div className="loader">
                <span className="loader__animation">
                    <div className="cube">
                        <div className="cube__face cube__face--front"></div>
                        <div className="cube__face cube__face--back"></div>
                        <div className="cube__face cube__face--right"></div>
                        <div className="cube__face cube__face--left"></div>
                        <div className="cube__face cube__face--top"></div>
                        <div className="cube__face cube__face--bottom"></div>
                    </div>
                </span>
                <p className="loader__message">Preparing page...</p>
                <span className="loader__progress">
                    <div className="loader__progress-bar"></div>
                </span>
            </div>
        </PageLoadingStyled>
    )
}
