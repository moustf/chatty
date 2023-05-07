import { object, number } from 'yup';

export const validateAllMessagesQueryStrings = object({
  limit: number().required(),
  offset: number().required(),
});
