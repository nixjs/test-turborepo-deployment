import * as Yup from 'yup'

export const DepositSchema = Yup.object().shape({
    amount: Yup.number().typeError('Amount must be a number.').required('Required.')
})
