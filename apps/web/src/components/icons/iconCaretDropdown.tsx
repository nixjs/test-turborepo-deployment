import React from 'react'

interface IconCaretDropdownPropArg {
    color?: string
}

export const IconCaretDropdown: React.FC<IconCaretDropdownPropArg> = React.memo(({ color }) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17 10L11 16" stroke={color || '#4E4E4E'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 10L11 16" stroke={color || '#4E4E4E'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
))

IconCaretDropdown.displayName = 'IconCaretDropdown'
