import { ChangeEvent, FC, useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UsersInterface } from '@chatty/types';
import axios from 'axios';

import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { UserBox } from './UserBox';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const AddUserDrawer: FC<{ isVisible: boolean }> = ({ isVisible }) => {
  axios.defaults.withCredentials = true;

  const controller = new AbortController();

  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebouncedValue(query);
  const [users, setUsers] = useState<UsersInterface[] | []>([]);

  const { mutate, data, error } = useMutation({
    mutationFn: (data: string) => (
      axios.get(`${baseUrl}/api/v1/user/find?q=${data}`, {
        withCredentials: true,
        signal: controller.signal,
      })
    ),
  });

  useEffect(() => {
    if (debouncedQuery) {
      mutate(debouncedQuery);
    }

    setUsers(data?.data.data);

    if (error) setUsers([]);
    if (query === '') setUsers([]);

    return () => controller.abort();
  }, [debouncedQuery])

  return (
    <section
      className={`w-4/6 md:w-5/6 lg:w-2/6 bg-[#fff] h-full lg:h-5/6 overflow-auto absolute left-0 md:left-[-35%] bottom-0 lg:left-0 flex flex-col items-center gap-20 ${!isVisible && 'hidden'} p-10 shadow-z24 z-50`}
    >

      <input
        className="w-full h-16 border-solid border-grey mb-6 border rounded-lg p px-4 py-2"
        name="search"
        type="search"
        placeholder='Search for Users from here'
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
      />
      <div className="w-4/5 h-2 rounded-lg bg-grey-300" />
      <section className="w-full h-content p-4 flex flex-col justify-center align-center gap-10">
        {
          users?.map((user: UsersInterface) => (
            <UserBox key={user._id} fname={user.firstName} lname={user.lastName} email={user.email} />
          ))
        }
      </section>
    </section>
  );
}