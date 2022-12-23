import * as Yup from 'yup'
import { emailValidator } from 'modules/auth/validator'

export const RequestOTPSchema = Yup.object().shape({
    email: emailValidator()
})
