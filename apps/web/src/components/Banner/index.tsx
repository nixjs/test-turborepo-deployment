import React from 'react'
import classNames from 'classnames'
import { Container } from '@nixjs23n6/baseui-grid'
import { ElementTypes } from '@lottery/uikit'
import { BannerStyled } from './index.styled'

interface BannerPropArg {
    children?: React.ReactNode
    className?: string
    height?: string
}

export const Banner: React.FC<BannerPropArg & ElementTypes.StyledProps> = ({
    children,
    className,
    height = '10.8125rem',
    overrideStyled
}) => {
    return (
        <BannerStyled height={height} overrideStyled={overrideStyled}>
            <div className={classNames('rd-top-left-12 rd-top-right-12 section-banner', className)}>
                <Container>{children}</Container>
            </div>
        </BannerStyled>
    )
}
