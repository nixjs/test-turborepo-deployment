import React from 'react'
import Image from 'next/image'
import Select from 'react-select'
import { SelectStyled } from 'components/styled/select'
import { DropdownIndicator } from 'components/DropdownIndicator'
import { WebConfig } from 'consts/web'
import { LanguageFooterStyled } from './index.styled'

const options = Object.keys(WebConfig.Base.language).map((item) => {
    const lang = WebConfig.Base.language[item]
    return {
        value: lang.key,
        label: lang.name,
        icon: <Image src={`/languages/${lang.key}.svg`} alt={lang.name || ''} width="22" height="20" />
    }
})

const SingleValue = ({ data }: { data: { icon: JSX.Element; label: string } }) => (
    <div className="lottery-select__single-value">
        {data.icon && <span className="d-flex lottery-select__single-icon">{data.icon}</span>}
        <span className="lottery-select__single-title">{data.label}</span>
    </div>
)

interface LanguageFooterPropArg {}

export const LanguageFooter: React.FC<LanguageFooterPropArg> = () => {
    return (
        <LanguageFooterStyled>
            <h3 className="text-16 base-brand-third w700 mb-8 widget-title">Languages</h3>
            <SelectStyled className="language-dropdown">
                <Select
                    instanceId="language-dropdown"
                    classNamePrefix="lottery-select"
                    defaultValue={options[0]}
                    isSearchable={false}
                    options={options}
                    components={{ SingleValue, DropdownIndicator }}
                />
            </SelectStyled>
        </LanguageFooterStyled>
    )
}
