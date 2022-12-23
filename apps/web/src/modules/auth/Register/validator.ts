import * as Yup from 'yup'
import { strRequiredValidator, emailValidator, passwordValidator, rePasswordValidator } from 'modules/auth/validator'

export const RegisterSchema = Yup.object().shape({
    name: strRequiredValidator()
        .min(5, 'Must be least than or equal 5 characters.')
        .max(256, 'Must be greater than or equal 256 characters.'),
    email: emailValidator(),
    password: passwordValidator(),
    confirmPassword: rePasswordValidator()
})
