import { object, string, array } from 'yup';

export const validateMessageData = object({
  userId: string().required(),
  chatId: string().required(),
  type: string()
    .matches(/message|action/)
    .required(),
  text: string(),
  action: string(),
  filesUris: array(string()),
});
