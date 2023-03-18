import { FC } from 'react';

import Logo from '../assets/Logo.svg';
import SideImage from '../assets/sl-side-image.svg';

export const SignupWelcomeSection: FC = () => (
  <section
    className="w-1/3 h-screen shadow-z24 flex-col gap-60 hidden lg:flex"
  >
    <img
      className="ml-12 mt-14"
      src={Logo}
      alt="logo"
      width="64"
      height="64"
    />
    <section className="w-full">
      <h1
        className="text-bold ml-12 mb-8 lg:text-h3 xl:text-h1"
      >Welcome to Chatty!</h1>
      <img src={SideImage} alt="side welcome" width="480" height="360" />
    </section>
  </section>
);
