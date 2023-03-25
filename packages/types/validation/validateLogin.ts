import { object, string } from 'yup';

export const validateLoginData = object({
  email: string().email().required(),
  password: string().matches(
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&]{5,}$/
  ),
});
