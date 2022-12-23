import * as Yup from 'yup'
import { passwordValidator } from 'modules/auth/validator'

export const ResetPasswordSchema = Yup.object().shape({
    otp: Yup.string()
        .required('Required')
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(6, 'Must be exactly 6 digits')
        .max(6, 'Must be exactly 6 digits'),
    password: passwordValidator(),
    confirmPassword: passwordValidator().oneOf([Yup.ref('password'), null], 'Passwords must match')
})
