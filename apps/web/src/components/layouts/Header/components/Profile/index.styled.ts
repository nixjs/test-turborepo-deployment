import styled from 'styled-components'

export const ProfileHeaderStyled = styled.div`
    .button {
        &-profile {
            background: var(--base-transparent);
            border: none;
            outline: 0;
            border-radius: 0.5rem;
            padding: 0.5rem 0.75rem;
            transition: background-color 0.3s ease;
            &:hover {
                background-color: var(--base-black-lightest);
            }
        }
    }
    .profile-dropdown {
        top: 100%;
        right: 0;
        box-sizing: border-box;
        visibility: hidden;
        pointer-events: none;
        display: none;
        transform: translateY(-100%);
        transition: transform 0.3s ease;
        .dropdown-inner {
            box-shadow: 0.125rem 0.75rem 1rem rgb(0 0 0 / 12%);
            border-radius: 0.5rem;
            background: var(--base-white);
            border: 1px solid var(--base-black-lighter);
            width: 24.375rem;
        }
    }
    &.active {
        .profile-dropdown {
            pointer-events: auto;
            opacity: 1;
            visibility: visible;
            cursor: initial;
            transform: translateY(0%);
        }
    }
    &.show {
        .profile-dropdown {
            display: block;
        }
    }
    .dropdown {
        &-info {
            padding: 1rem 1.5rem 1.5rem;
            border-bottom: 1px solid var(--base-black-lighter);
        }
        &-head {
            display: none;
            padding: 1rem;
            border-bottom: 1px solid var(--base-black-lighter);
        }
        &-button-close {
            right: 0.5rem;
            top: 50%;
            margin-top: -1.25rem;
        }
        &-body {
        }
        &-nav {
            .nav {
                &-link {
                    padding: 0.75rem 0;
                    display: block;
                    text-decoration: none;
                }
                &-item {
                    padding: 0 1rem;
                    margin-bottom: 0.25rem;
                    transition: background-color 0.3s ease;
                    &:hover {
                        background-color: var(--base-black-lightest);
                    }
                    &:focus,
                    &:active {
                        background-color: var(--base-black-lighter);
                    }
                    &:first-child {
                        margin-top: 0.25rem;
                    }
                    &:last-child {
                        .nav-link {
                            border-top: 0.0625rem solid var(--base-black-lighter);
                        }
                    }
                }
            }
        }
    }
`
