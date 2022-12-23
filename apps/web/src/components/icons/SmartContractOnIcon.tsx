import React from 'react'

interface IconPropArg {
    width?: number
    height?: number
}

export const IconSmartContractOn: React.FC<IconPropArg> = ({ width = 24, height = 24 }) => (
    <svg width={width} height={height} viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.3" filter="url(#filter0_f)">
            <path d="M39 15L59.7846 27V51L39 63L18.2154 51V27L39 15Z" fill="#0C0C0C" />
        </g>
        <g filter="url(#filter1_d)">
            <path d="M36 65.9986L9 50.57V19.7129L36 35.1415V65.9986Z" fill="#65E590" />
            <path d="M63 50.57L36 65.9986V35.1415L63 19.7129V50.57Z" fill="#46C070" />
            <path d="M36 35.1423L9 19.7137L36 4.28516L63 19.7137L36 35.1423Z" fill="#4CF184" />
            <path d="M63 25.6274L36 41.056V34.7988L63 19.7988V25.6274Z" fill="#4DD27B" />
            <path d="M9 25.6274L36 41.056V34.7988L9 19.7988V25.6274Z" fill="#7AFBA5" />
        </g>
        <defs>
            <filter
                id="icon_sc_on_filter0_f"
                x="16.2153"
                y="13"
                width="45.5692"
                height="52"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="1" result="effect1_foregroundBlur" />
            </filter>
            <filter
                id="filter1_d"
                x="8"
                y="3.28516"
                width="58"
                height="65.7134"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                <feOffset dx="1" dy="1" />
                <feGaussianBlur stdDeviation="1" />
                <feColorMatrix type="matrix" values="0 0 0 0 0.27451 0 0 0 0 0.752941 0 0 0 0 0.439216 0 0 0 0.59 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
        </defs>
    </svg>
)
