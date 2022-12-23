import styled, { css } from 'styled-components'
import { ElementTypes } from '@lottery/uikit'

export const BannerStyled = styled.section<{ height?: string } & ElementTypes.StyledProps>`
    .section-banner {
        background-color: var(--base-brand-primary);
        ${({ height }) =>
            css`
                height: ${height};
            `}
        ${(props: any) => {
            return css`
                ${props?.overrideStyled || ''}
            `
        }}
    }
`
