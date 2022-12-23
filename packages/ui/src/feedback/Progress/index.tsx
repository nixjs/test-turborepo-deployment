import React from 'react'
import { ElementTypes } from '../../types/element'
import { ProcessingTypes } from './types'
import { ProgressStyled } from './index.styled'

export const Progress: React.FC<ProcessingTypes.ProgressPropArg & ElementTypes.StyledProps> = ({
    variant = 'legendary',
    size = 'md',
    progress,
    className,
    overrideStyled
}) => (
    <ProgressStyled className={className} variant={variant} size={size} progress={progress} overrideStyled={overrideStyled}>
        <div className="track">
            <div className="thumb" />
        </div>
    </ProgressStyled>
)
