import styled, { css } from 'styled-components'

export const WalletBalanceStyled = styled.div`
    .balance {
        &-item {
            border-bottom: 1px solid var(--base-black-lighter);
            transition: all 0.3s ease;
            &:last-child {
                border-color: var(--base-transparent);
            }
            &:hover {
                border-radius: 0.25rem;
                background-color: var(--base-black-lighter);
            }
        }
    }
`

export const PaginationStyled = css`
    --base-pagination-item-background: var(--base-transparent);
    --base-pagination-item-color: var(--base-black);
    --base-pagination-item-disabled-color: var(--base-black-7);
    --pagination-item-active-background: var(--base-brand-primary);
    .pagination {
        &-item {
            border: 1px solid var(--base-black-normal);
            &:hover {
                --base-pagination-item-background: var(--base-black-normal);
            }
            &--number {
                &.active {
                    border-color: var(--base-brand-primary);
                    --base-pagination-item-color: var(--base-white);
                }
            }
        }
    }
`
