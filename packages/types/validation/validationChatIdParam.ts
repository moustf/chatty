import { string, object } from 'yup';

export const validateChatIdParam = object({
  chatId: string()
    .matches(/^[a-z0-9]{24}$/i)
    .required(),
});
