import React from 'react'
import Image from 'next/image'
import { TokenDefaultIcon } from './TokenDefaultIcon'

interface SymbolPropArg {
    source?: string
    className?: string
    name?: string
    width?: number
    height?: number
}

export const Symbol: React.FC<SymbolPropArg> = ({ className, source, name, width = 24, height = 24 }) => {
    if (!source) {
        return <TokenDefaultIcon width={width} height={height} />
    }
    return <Image className={className || ''} src={source} width={width} height={height} alt={name || ''} />
}

Symbol.displayName = 'Symbol'
