import { object, ref, string } from 'yup';

export const userDataComponentSchema = object({
  firstName: string().required('First name field is required!'),
  lastName: string().required('Last name field is required!'),
  email: string()
    .email('This field must be a valid email address!')
    .required('Email field is required!'),
  password: string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&]{5,}$/,
      'Password should contain one upper letter, one lower letter, one number, one symbol, and at least 5 characters!'
    )
    .required('Email field is required!'),
  confirmPassword: string()
    .oneOf([ref('password'), ''], 'Passwords must match')
    .required('Password confirmation is required'),
});
