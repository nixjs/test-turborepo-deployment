import * as Yup from 'yup'
import { emailValidator, strRequiredValidator } from 'modules/auth/validator'

export const LoginSchema = Yup.object().shape({
    email: emailValidator(),
    password: strRequiredValidator()
})
