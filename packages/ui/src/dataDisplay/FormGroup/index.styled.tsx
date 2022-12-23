import styled, { css } from 'styled-components'
import { StyledProps } from '@nixjs23n6/baseui-core'

interface StyledFormGroupProp {}

export const FormGroupStyled = styled.div<StyledFormGroupProp & StyledProps>`
    ${(props: any) => {
        return css`
            ${props?.overrideStyled || ''}
        `
    }}
`
