import React from 'react'

interface IconPropArg {
    width?: number
    height?: number
}

export const IconSmartContractOff: React.FC<IconPropArg> = ({ width = 24, height = 24 }) => (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.9999L3 16.857V6.57129L12 11.7141V21.9999Z" fill="#B3B3B3" fillOpacity="0.84" />
        <path d="M21 16.857L12 21.9999V11.7141L21 6.57129V16.857Z" fill="#B4B4B4" fillOpacity="0.7" />
        <path d="M12 11.7144L3 6.57157L12 1.42871L21 6.57157L12 11.7144Z" fill="#D2D2D2" />
        <path d="M12 11.7141L3 6.57129V8.11415L12 13.257L21 8.11415V6.57129L12 11.7141Z" fill="#A5A5A5" />
    </svg>
)
