import * as Yup from 'yup'

export const strRequiredValidator = () => Yup.string().required('Required.')

export const emailValidator = () =>
    Yup.string()
        .required('Required.')
        .email('Invalid email address format.')
        .min(5, 'Must be least than or equal 5 characters.')
        .max(320, 'Must be greater than or equal 320 characters.')
export const passwordValidator = () =>
    Yup.string()
        .required('Required.')
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%&*()^_\-+={[}\]|:;"'<,>.?\\/~` ]).{8,}$/,
            'Must least 8 characters, one Uppercase, one Lowercase, one Number and one Special case character.'
        )
export const rePasswordValidator = () =>
    Yup.string()
        .required('Required.')
        .test('passwords-match', 'Passwords must match.', function (value) {
            return this.parent.password === value
        })
