import React from 'react'
import classNames from 'classnames'
// import Fuse from 'fuse.js'
import { useSelector, useDispatch } from 'react-redux'
import { Checkbox } from '@lottery/uikit'
import { LotteryCommonTypes } from '@lottery/types'
import * as KenoGameSlice from 'modules/lottery/keno/redux/game/slice'
import * as KenoGameSelector from 'modules/lottery/keno/redux/game/selectors'
import { DrawSelectionStyled } from './index.styled'

// const options = {
//     includeScore: true,
//     keys: ['formattedCode', 'name', 'official_symbol']
// }

interface DrawSelectionPropArg {}

export const DrawSelection: React.FC<DrawSelectionPropArg> = () => {
    const dispatch = useDispatch()
    const draws = useSelector(KenoGameSelector.drawMapByDateSelector())
    const drawSelectedList = useSelector(KenoGameSelector.drawSelectedListSelector())

    const onSelectDraw = (draw: LotteryCommonTypes.Draw) => {
        dispatch(KenoGameSlice.onSetDrawSelected(draw))
    }

    const onSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { checked }
        } = e
        if (checked) {
            dispatch(KenoGameSlice.onSetDrawSelectedAll())
        } else dispatch(KenoGameSlice.onRemoveDrawSelectedAll())
    }

    if (!draws) return <></>

    return (
        <DrawSelectionStyled>
            <label htmlFor="draw" className="w500 mb-8">
                Draw
            </label>
            <div className="form-group">
                {/* <div className="form-content">
                    <input type={'text'} className="form-input" placeholder="Find draw" />
                </div> */}
                <div className="mb-8 d-flex align-items-center">
                    <Checkbox type={'checkbox'} id="draw-select-all" onChange={onSelectAll} />
                    <label htmlFor="draw-select-all" className="cursor-pointer ml-8" style={{ userSelect: 'none' }}>
                        Select all
                    </label>
                </div>
                <div className="form-dropdown rd-8" style={{ border: '1px solid #ddd' }}>
                    <div className="dropdown-inner scroll-bar">
                        {Object.keys(draws).map((item) => {
                            const list = draws[item]
                            return (
                                <div className="pt-8 pb-8 pl-16 pr-16" key={item}>
                                    <h3 className="text-16" style={{ color: '#ff7f50' }}>
                                        {item}
                                    </h3>
                                    {list &&
                                        list.map((l) => (
                                            <div
                                                className={classNames('pb-8 pt-8 draw-item', {
                                                    activated: !!drawSelectedList?.[l.id]
                                                })}
                                                style={{ borderBottom: '1px dashed #ddd' }}
                                                key={l.formattedCode}
                                                onClick={() => onSelectDraw(l)}
                                                role={'presentation'}
                                            >
                                                <div className="pl-8 pr-8 pb-8 pt-8 rd-4">
                                                    <div className="mb-8 d-flex justify-content-between">
                                                        <span>Draw ID</span>
                                                        <span className="w600">{l.formattedCode}</span>
                                                    </div>
                                                    <div className="mb-8 d-flex justify-content-between">
                                                        <span>Draw Time</span>
                                                        {l.ourDrawTime}
                                                    </div>
                                                    <div className="d-flex justify-content-between">
                                                        <span>Id</span>
                                                        {l.id}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </DrawSelectionStyled>
    )
}
