import { object, ref, string } from 'yup';

export const userDataSchema = object({
  firstName: string().required(),
  lastName: string().required(),
  email: string().email().required(),
  password: string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&]{5,}$/
    )
    .required(),
  passwordConfirmation: ref('password'),
});
