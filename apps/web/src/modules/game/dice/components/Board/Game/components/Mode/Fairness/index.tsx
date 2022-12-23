import React from 'react'
import { useImmer } from 'use-immer'
import { toast } from 'react-hot-toast'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import classNames from 'classnames'
import { MB, Formatter } from '@lottery/utils'
import { MessageBrokerKey, MessageBrokerID } from 'modules/game/dice/consts/enum'
import { GameBaseTypes } from 'modules/game/dice/types'

export const Fairness = () => {
    const [state, setState] = useImmer({
        commitHash: '',
        commitHashTrunc: ''
    })
    const [isExpand, setIsExpand] = React.useState<boolean>(false)

    React.useEffect(() => {
        const sub = MB.messageBroker.subscribe(
            String(MessageBrokerID.DICE_CHECK_FAIRNESS),
            MessageBrokerKey.DICE_CREATE_NEW_TURN,
            ({ msgData }: MB.SubscribeData<GameBaseTypes.Turn>) => {
                if (msgData) {
                    const {
                        commitHashInfo: { commitHash }
                    } = msgData

                    setState((draft) => {
                        draft.commitHash = commitHash
                        draft.commitHashTrunc = Formatter.onElliptingMiddle(commitHash)
                    })
                }
            }
        )
        return () => {
            sub && MB.messageBroker.unsubscribe(sub)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onCopyCommitHash = (result: boolean) => {
        if (result) {
            toast.success('Copied to clipboard')
        }
    }

    const onExpand = () => {
        setIsExpand((prev) => !prev)
    }

    return (
        <div className="d-flex align-items-center justify-content-between">
            {state.commitHash && (
                <>
                    <div className="cursor-pointer d-inline-flex align-items-center">
                        <div
                            className={classNames(
                                'd-inline-flex align-items-center mr-8 text-16 user-select-none',
                                isExpand ? 'baseWhite700' : 'baseWhite500'
                            )}
                        >
                            <span onClick={onExpand} role="presentation">
                                Keccak-256
                            </span>
                            {isExpand && (
                                <CopyToClipboard text={state.commitHash} onCopy={(_text, result) => onCopyCommitHash(result)}>
                                    <div className="d-inline-flex align-items-center mr-12">
                                        <span className="mr-4">:</span>
                                        <span className="mr-8">{state.commitHashTrunc}</span>
                                        <i className="text-24 baseWhite ic ic_copy" />
                                    </div>
                                </CopyToClipboard>
                            )}
                            <i
                                className={classNames('text-22 ic', isExpand ? 'ic_left' : 'ic_right')}
                                onClick={onExpand}
                                role="presentation"
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
