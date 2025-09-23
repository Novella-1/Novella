import * as Yup from 'yup';

type AuthType = 'login' | 'register';

export const authValidationSchema = (authVariant: AuthType) =>
  Yup.object().shape({
    firstName:
      authVariant === 'register' ?
        Yup.string().required('Enter your first name').min(3)
      : Yup.string().notRequired(),
    lastName:
      authVariant === 'register' ?
        Yup.string().required('Enter your last name').min(3)
      : Yup.string().notRequired(),
    email: Yup.string()
      .required('Enter your email')
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        'Incorrect email format',
      ),
    password: Yup.string().required('Enter your password').min(6),
    confirmPassword: Yup.string().when('password', (password, schema) =>
      authVariant === 'register' ?
        schema
          .required('Confirm your password')
          .oneOf([Yup.ref('password')], 'Passwords must match')
      : schema.notRequired(),
    ),
  });
