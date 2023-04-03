import { object, string, ref } from 'yup';

export const userOldNewPasswordsSchema = object({
  oldPassword: string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&]{5,}$/
    )
    .required(),
  confirmOldPassword: ref('oldPassword'),
  newPassword: string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&]{5,}$/
    )
    .required(),
});
