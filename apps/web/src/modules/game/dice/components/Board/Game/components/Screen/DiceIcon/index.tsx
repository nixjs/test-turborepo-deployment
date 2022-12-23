import React from "react"
import classNames from "classnames"
import { DiceIconStyled } from "./DiceIcon.styled"

interface DiceIconPropArg {
    active?: boolean
    className?: string
    scale?: number
}

const DiceIcon: React.FC<DiceIconPropArg> = ({ active = false, className, scale = 1 }) => (
    <DiceIconStyled scale={scale} className={className}>
        <div id="dice" className={classNames({ active })}>
            <div className="side front">
                <div className="dot center" />
            </div>
            <div className="side front inner" />
            <div className="side top">
                <div className="dot dtop dleft" />
                <div className="dot dbottom dright" />
            </div>
            <div className="side top inner" />
            <div className="side right">
                <div className="dot dtop dleft" />
                <div className="dot center" />
                <div className="dot dbottom dright" />
            </div>
            <div className="side right inner" />
            <div className="side left">
                <div className="dot dtop dleft" />
                <div className="dot dtop dright" />
                <div className="dot dbottom dleft" />
                <div className="dot dbottom dright" />
            </div>
            <div className="side left inner" />
            <div className="side bottom">
                <div className="dot center" />
                <div className="dot dtop dleft" />
                <div className="dot dtop dright" />
                <div className="dot dbottom dleft" />
                <div className="dot dbottom dright" />
            </div>
            <div className="side bottom inner" />
            <div className="side back">
                <div className="dot dtop dleft" />
                <div className="dot dtop dright" />
                <div className="dot dbottom dleft" />
                <div className="dot dbottom dright" />
                <div className="dot center dleft" />
                <div className="dot center dright" />
            </div>
            <div className="side back inner" />
            <div className="side cover x" />
            <div className="side cover y" />
            <div className="side cover z" />
        </div>
    </DiceIconStyled>
)

export default React.memo(DiceIcon)
