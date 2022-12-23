import React from 'react'
import Link from 'next/link'
import { PageExpiredStyled } from './index.styled'

interface PageSessionExpiredPropArg {}

export const PageSessionExpired: React.FC<PageSessionExpiredPropArg> = () => {
    return (
        <PageExpiredStyled>
            <div className="text-center">
                <div className="pt-24 pb-24  mb-16 text-center text-oswald text-24 base-brand-third">Session Expired</div>
                <p className="text-center mb-8 box-description">Please refresh the page or try to login again.</p>
                <Link href="/">Home</Link>
            </div>
        </PageExpiredStyled>
    )
}
