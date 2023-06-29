import { object, string } from 'yup';

export const validateLoginData = object({
  email: string()
    .email('This field must be a valid email address!')
    .required('Email field is required!'),
  password: string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&]{5,}$/,
      'Password should contain one upper letter, one lower letter, one number, one symbol, and at least 5 characters!'
    )
    .required('Email field is required!'),
});
