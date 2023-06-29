import { User } from '../../models';

export const searchForUser = (searchText: string) =>
  User.find(
    {
      $or: [
        {
          firstName: {
            $regex: new RegExp(`^${searchText}`),
            $options: 'i',
          },
        },
        {
          lastName: {
            $regex: new RegExp(`^${searchText}`),
            $options: 'i',
          },
        },
        {
          email: {
            $regex: new RegExp(`^${searchText}`),
            $options: 'i',
          },
        },
      ],
    },
    { firstName: 1, lastName: 1, email: 1, createdAt: 1 }
  );
