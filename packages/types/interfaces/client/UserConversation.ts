export type UserConversation = {
  id: string;
  name: string;
  message: string;
  type: 'individual' | 'group';
  createdAt: string;
  usersNumber: number;
};
