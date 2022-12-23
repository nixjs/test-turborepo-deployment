import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import ReactJson from 'react-json-view'
import classNames from 'classnames'
import { Modal } from '@nixjs23n6/baseui-modal'
import { Button } from '@nixjs23n6/baseui-button'
import * as KenoGameSlice from 'modules/lottery/keno/redux/game/slice'
import * as KenoGameSelector from 'modules/lottery/keno/redux/game/selectors'
import { ModalCss, ButtonCss } from './Modal.css'

interface LuckyPickModalPropArg {}

export const LuckyPickModal: React.FC<LuckyPickModalPropArg> = () => {
    const dispatch = useDispatch()

    const numbers = useSelector(KenoGameSelector.numbersSelector())
    const tickets = useSelector(KenoGameSelector.ticketSessionSelector())
    const ticketNumber = useSelector(KenoGameSelector.ticketSessionSelectedSelector())
    const open = useSelector(KenoGameSelector.numberChoiceModalSelector())
    const spot = useSelector(KenoGameSelector.spotSelectedSelector())
    const [numberChoices, setNumberChoice] = React.useState<number[]>([])

    const [ticketCurrent, setTicketCurrent] = React.useState<number>(0)

    // const [open, setOpen] = React.useState<boolean>()
    const paymentRef = React.useRef(null)

    React.useEffect(() => {
        if (ticketNumber && ticketNumber.numbers.length > 0) {
            const ourNumbers = ticketNumber.numbers.filter((n) => n !== -1)
            setNumberChoice(ourNumbers)
        }
    }, [ticketNumber])

    const updateSessionItem = React.useCallback(() => {
        if (ticketNumber?.id) {
            dispatch(
                KenoGameSlice.onUpdateSessionItem({
                    id: ticketNumber.id,
                    numbers: numberChoices
                })
            )
        }
    }, [dispatch, numberChoices, ticketNumber])

    const onCloseModal = () => {
        dispatch(KenoGameSlice.onSetNumberChoiceModal(false))
        dispatch(KenoGameSlice.onSetTicketSessionSelected())
        dispatch(KenoGameSlice.onResetTicketSession())
    }

    const onConfirm = React.useCallback(() => {
        if (numberChoices.length > 0 && numberChoices.length < spot) {
            toast.error('Please complete the spot selection process to confirm')
            return false
        }
        const ourTickets = Object.keys(tickets)
        if (ticketNumber?.id)
            dispatch(
                KenoGameSlice.onUpdateSessionItem({
                    id: ticketNumber.id,
                    numbers: numberChoices
                })
            )
        if (ourTickets.length > 0) {
            const unCompleted: string[] = []
            for (let t = 0; t < ourTickets.length; t++) {
                const ticket = ourTickets[t]
                const nums = tickets[ticket].numbers.filter((n) => n !== -1)
                if (nums.length > 0 && nums.length < spot) {
                    unCompleted.push(ticket)
                }
            }
            if (unCompleted.length > 0) {
                toast.error('Please complete the spot selection process to confirm')
                console.table(unCompleted)
                return false
            } else {
                if (ticketNumber?.id) {
                    dispatch(KenoGameSlice.onMergeTicketOrderFromSession())
                    dispatch(KenoGameSlice.onSetNumberChoiceModal(false))
                    dispatch(KenoGameSlice.onSetTicketSessionSelected())
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numberChoices, spot, ticketNumber, tickets])

    const onPrev = React.useCallback(() => {
        updateSessionItem()
        let index = ticketCurrent
        if (ticketCurrent === 0) {
            index = Object.keys(tickets).length - 1
        } else {
            index = ticketCurrent - 1
        }
        setTicketCurrent(index)

        const ticket = Object.keys(tickets)[index]
        setNumberChoice(tickets[ticket].numbers)
        dispatch(
            KenoGameSlice.onSetTicketSessionSelected({
                ...tickets[ticket],
                id: ticket
            })
        )
    }, [dispatch, ticketCurrent, tickets, updateSessionItem])

    const onNext = React.useCallback(() => {
        updateSessionItem()
        let index = ticketCurrent
        if (ticketCurrent === Object.keys(tickets).length - 1) {
            index = 0
        } else {
            index = ticketCurrent + 1
        }
        setTicketCurrent(index)

        const ticket = Object.keys(tickets)[index]
        setNumberChoice(tickets[ticket].numbers)
        dispatch(
            KenoGameSlice.onSetTicketSessionSelected({
                ...tickets[ticket],
                id: ticket
            })
        )
    }, [dispatch, ticketCurrent, tickets, updateSessionItem])

    const onRandom = React.useCallback(() => {
        if (ticketNumber && Object.keys(ticketNumber).length > 0) dispatch(KenoGameSlice.onRandomNumberTicket(ticketNumber.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ticketNumber])

    const onSelectNumber = React.useCallback(
        (num: number) => {
            if (numberChoices.length > 0) {
                const idx = numberChoices.findIndex((n) => n === num)
                if (idx !== -1) {
                    setNumberChoice((prev) => prev.filter((n) => n !== num))
                } else if (numberChoices.length < spot) {
                    setNumberChoice((prev) => prev.concat(num))
                }
            } else {
                setNumberChoice((prev) => prev.concat(num))
            }
        },
        [numberChoices, spot]
    )

    const renderNumbers = React.useCallback(() => {
        if (numbers.length > 0) {
            return numbers.map((num) => (
                <ButtonCss
                    key={num}
                    type="button"
                    className={classNames('rd-4', {
                        active: numberChoices.includes(num),
                        disabled: numberChoices.length >= spot
                    })}
                    onClick={() => onSelectNumber(num)}
                >
                    {num}
                </ButtonCss>
            ))
        }
        return <></>
    }, [numbers, numberChoices, onSelectNumber, spot])

    return (
        <Modal
            as={'div'}
            open={open}
            onClose={onCloseModal}
            animation
            animationName="fadeIn"
            closeOnEsc
            closeOnClickOutside={false}
            showClose
            unmountOnExit
            ref={paymentRef}
            className="auth-modal"
            overrideStyled={ModalCss}
        >
            <Modal.Body>
                <div className="payment_container">
                    <div className="payment_dialog">
                        <div className="pl-16 pr-16 payment_content-body">
                            <h3 className="text-uppercase text-center">Select number</h3>
                            <br />
                            <h4 className="text-16 w400">
                                Selected <span className="w600" style={{ color: '#d2691e' }}>{`${numberChoices?.length} / ${spot}`}</span>{' '}
                                numbers
                            </h4>
                            <br />
                            {renderNumbers()}
                            <br />
                            <br />
                            <div className="d-flex justify-content-center">
                                <Button variant="info" autoWidth className="text-white mr-16" onClick={onPrev}>
                                    onPrev
                                </Button>
                                <Button variant="info" autoWidth className="text-white mr-16" onClick={onRandom}>
                                    Lucky Pick
                                </Button>
                                <Button variant="info" autoWidth className="text-white" onClick={onNext}>
                                    onNext
                                </Button>
                            </div>
                            <br />
                            {ticketNumber && (
                                <div className="d-flex flex-column">
                                    Ticket selected:
                                    <ReactJson src={ticketNumber} />
                                </div>
                            )}
                            <br />
                            <br />
                            <div className="d-flex justify-content-center">
                                <Button variant="secondary" autoWidth className="text-white mr-16" onClick={onCloseModal}>
                                    Cancel
                                </Button>
                                <Button variant="info" autoWidth className="text-white" onClick={onConfirm}>
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}
