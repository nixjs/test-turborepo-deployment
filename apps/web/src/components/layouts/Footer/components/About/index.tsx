import React from 'react'
import { AboutFooterStyled } from './index.styled'

interface AboutFooterPropArg {}

export const AboutFooter: React.FC<AboutFooterPropArg> = () => {
    return (
        <AboutFooterStyled>
            <h3 className="text-16 base-brand-third w700 mb-8 widget-title">About DeFi</h3>
            <span className="text-16 base-black-darkest">
                DeFi.io is owned and operated by Inspire Labs Technologies. It is licensed and regulated by the Government of Malaysia under
                the gaming license 1668/JAZ.
            </span>
        </AboutFooterStyled>
    )
}
