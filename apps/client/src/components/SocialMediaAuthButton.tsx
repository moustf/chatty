import { FC } from 'react';

type AuthButtonProps = {
  icon: string;
}

export const SocialMediaAuthButton: FC<AuthButtonProps> = ({ icon }) => (
  <button
    className="w-1/3 h-14 border border-grey border-solid rounded-xl flex justify-center items-center hover:shadow-z12 hover:border-grey-200"
  >
    <img src={icon} alt="social media icon" className="" />
  </button>
);
