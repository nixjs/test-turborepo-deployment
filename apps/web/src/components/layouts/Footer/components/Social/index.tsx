import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { WebConfig } from 'consts/web'
import { SocialFooterStyled } from './index.styled'

interface SocialFooterPropArg {}

export const SocialFooter: React.FC<SocialFooterPropArg> = () => {
    return (
        <SocialFooterStyled>
            <h3 className="text-16 base-brand-third w700 mb-8 widget-title">Connect with us</h3>
            <Link href={WebConfig.Base.social.twitter} className="social-link" target="_blank" rel="noreferrer" title="Twitter">
                <Image src="/twitter.svg" alt="DeFi" width="48" height="48" />
            </Link>
            <Link href={WebConfig.Base.social.facebook} className="social-link" target="_blank" rel="noreferrer" title="Facebook">
                <Image src="/facebook.svg" alt="DeFi" width="48" height="48" />
            </Link>
            <Link href={WebConfig.Base.social.youtube} className="social-link" target="_blank" rel="noreferrer" title="Youtube">
                <Image src="/youtube.svg" alt="DeFI" width="48" height="48" />
            </Link>
        </SocialFooterStyled>
    )
}
