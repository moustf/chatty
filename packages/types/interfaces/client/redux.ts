import { CustomMessagesHashTable } from '../../custom_data_types/CustomHashMap';

export type Payload = {
  auth: {
    userData: { id: string; email: string; iat: number };
    isLoading: boolean;
    error: string;
  };
  chat: { isChatsListShown: boolean };
  messages: typeof CustomMessagesHashTable;
};
