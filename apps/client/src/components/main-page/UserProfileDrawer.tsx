import { FC, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import EmailIcon from '../../assets/EmailIcon.svg';
import CalendarIcon from '../../assets/Calendar.svg';
import { UpdatePasswordForm } from './UpdatePasswordForm';

const baseUrl = import.meta.env.BASE_URL;

export const UserProfileDrawer: FC<{ isVisible: boolean }> = ({ isVisible }) => {
  axios.defaults.withCredentials = true;

  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  // ? The personal information for the user request.
  const { data } = useQuery({
    queryKey: ['userData'],
    queryFn: () => axios.get(`${baseUrl}/api/v1/user`, {
      withCredentials: true,
    }),
    onError: (error) => console.log(error),
  });

  // ? The request that checks if the user can change his password or not.
  const { data: isAllowed } = useQuery({
    queryKey: ['isAllowedToChangePassword'],
    queryFn: () => axios.get(`${baseUrl}/api/v1/user/password`, {
      withCredentials: true,
    }),
    onError: (error) => console.log(error),
  });

  const createdAt = new Date(data?.data.data.created_at);

  return (
    <section
      className={`w-4/6 md:w-5/6 lg:w-2/6 bg-[#fff] h-full lg:h-5/6 overflow-auto absolute left-0 bottom-0 md:left-[-33%] lg:left-auto lg:right-0 flex flex-col items-center gap-20 ${!isVisible && 'hidden'} p-4 md:p-10 shadow-z24 z-50`}
    >
      <img
        src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${data?.data.data.firstName}`}
        alt="avatar"
        width="152"
        height="152"
        className=""
      />
      <h2 className="text-h4 md:text-h2 font-bold">{data?.data.data.firstName} {data?.data.data.lastName}</h2>
      <section className="w-full px-4 md:px-12 flex flex-col gap-8">
        <div className="w-full flex flex-col md:flex-row items-center gap-12">
          <img src={EmailIcon} alt="email icon" width="40" height="40" />
          <p className="text-grey-600 text-h5 md:text-h3">{data?.data.data.email}</p>
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-12">
          <img src={CalendarIcon} alt="calendar icon" width="40" height="40" />
          <p className="text-grey-600 text-h3">{createdAt.getFullYear()} - {createdAt.getMonth()} - {createdAt.getDay()}</p>
        </div>
        <button
          disabled={!isAllowed?.data.data}
          onClick={() => setIsFormVisible((prevValue) => !prevValue)}
          className={`w-full md:w-fit text-bold text-h4 underline cursor-not-allowed ${isAllowed?.data.data ? "text-[#2065D1]" : "text-grey-500"} ${isAllowed?.data.data && 'cursor-pointer'}`}
        >Change Password?</button>
        {isFormVisible && <UpdatePasswordForm />}
      </section>
    </section>
  );
};
