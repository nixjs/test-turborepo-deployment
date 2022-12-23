import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BrandHeaderStyled } from './index.styled'

interface BrandHeaderPropArg {}

export const BrandHeader: React.FC<BrandHeaderPropArg> = () => {
    return (
        <BrandHeaderStyled className="flex-fill d-flex align-items-center">
            <Link href="/">
                <Image className="main__brand-logo" src="/logo/defi_logo_dark.svg" alt="DeFi" width="104" height="36" />
            </Link>
        </BrandHeaderStyled>
    )
}
