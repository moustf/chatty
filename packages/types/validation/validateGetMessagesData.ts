import { string, number, object } from 'yup';

export const validateGetMessagesData = object({
  chatId: string()
    .matches(/^[a-z0-9]{24}$/i)
    .required(),
  offset: number().required(),
  limit: number().required(),
});
