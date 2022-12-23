import styled from 'styled-components'

export const SidebarStyled = styled.div`
    .s-menu {
        height: 100%;
        width: 80%;
        min-width: 20rem;
        max-width: 20rem;
        position: fixed;
        transform: translate3d(0, 0, 0);
        inset: 0px auto 0px 0px;
        top: 0;
        z-index: 99;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        padding: 0px;
        margin: 0px;
        transform: translateX(-100rem);
        transition: all 0.3s ease 0s;
        background-color: var(--base-white);
        &.active {
            transform: translateX(0);
        }
        &__mburger {
            width: 2.5rem;
            height: 2.5rem;
            position: absolute;
            left: 0.25rem;
            top: 0.375rem;
            display: block;
            text-align: center;
            line-height: 2.5rem;
            cursor: pointer;
        }
        &__head {
            background: var(--base-brand-third);
        }
        &__heading {
            font-family: Oswald;
            font-size: 1.75rem;
            line-height: 2.5rem;
            color: var(--base-white);
        }
        &__panel {
            height: 100%;
            display: flex;
        }
        &__box-top {
            padding: 2.375rem 1rem 0;
        }
        &__head {
            padding: 1.125rem 0 1.5rem;
        }
        &__list {
            padding: 1rem 0 1.625rem;
            flex: 1;
            flex-direction: column;
            display: flex;
            flex-grow: 1;
            overflow: hidden;
            &--wrap {
                overflow-x: hidden;
                -webkit-overflow-scrolling: touch;
                flex: 1;
                display: flex;
                flex-direction: column;
                -webkit-transition-property: width, -webkit-transform;
                transition-property: width, -webkit-transform;
                -o-transition-property: transform, width;
                transition-property: transform, width;
                transition-property: transform, width, -webkit-transform;
                transform: translate3d(0, 0, 0);
            }
        }
        &__games {
            margin: 0 -0.5rem 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            &:last-child {
                margin-bottom: 0;
            }
        }
        &__group {
            padding-bottom: 0.5rem;
            margin-bottom: 0.5rem;
            border-bottom: 0.0625rem solid var(--base-black-lighter);
            &:last-child {
                margin-bottom: 0;
                border-bottom: none;
            }
        }
        &__link {
            color: var(--base-brand-third);
            padding: 0.75rem 0 0.75rem 1rem;
            transition: background-color 0.2s ease 0s, color 0.1s ease 0s;
            &--logout {
                color: var(--base-black-darker);
                cursor: pointer;
            }
            &:hover {
                background-color: var(--base-black-lighter);
            }
            &:visited {
                background-color: var(--base-black-normal);
            }
            &.active {
                background-color: var(--base-transparent);
                color: var(--base-brand-primary);
            }
            > span {
                margin-left: 0.375rem;
                vertical-align: middle;
            }
        }
        &__game-item {
            border: 0.125rem solid var(--base-white);
            color: var(--base-white);
            border-radius: 0.5rem;
            padding-left: 0.125rem;
            padding-right: 0.125rem;
            margin: 0 0.5rem;
            flex: 1;
            text-align: center;
            text-decoration: none;
            &:hover {
                --base-button-color: var(--base-brand-third);
                background: var(--base-white);
            }
        }
        &__overlay {
            background: var(--base-black);
            overflow: hidden;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            inset: 0px;
            z-index: 90;
            display: none;
            opacity: 0;
            transform: translate3d(0, 0, 0);
            transition: opacity 0.3s ease-in 0s;
            &.active {
                display: block;
                opacity: 0.8;
            }
        }
    }
`
