import { object, ref, string } from 'yup';

export const userDataComponentSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required(),
  password: string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&]{5,}$/
    )
    .required(),
  confirmPassword: string()
    .oneOf([ref('password'), ''], 'Passwords must match')
    .required('Password confirmation is required'),
});
