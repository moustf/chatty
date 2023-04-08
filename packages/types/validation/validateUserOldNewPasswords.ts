import { object, string, ref } from 'yup';

export const userOldNewPasswordsSchema = object({
  oldPassword: string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&]{5,}$/
    )
    .required(),
  newPassword: string()
    .matches(
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&]{5,}$/
    )
    .required(),
  confirmNewPassword: ref('newPassword'),
});
