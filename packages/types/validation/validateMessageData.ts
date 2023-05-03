import { object, string } from 'yup';

export const validateMessageData = object({
  userId: string().required(),
  type: string()
    .matches(/image|text|action/)
    .required(),
  text: string(),
  fileName: string(),
  fileData: string(),
});
