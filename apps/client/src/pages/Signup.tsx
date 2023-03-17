import { FC } from 'react';

import Logo from '../assets/Logo.svg';
import SideImage from '../assets/sl-side-image.svg';

export const SignupPage: FC = () => (
  <div className="w-full h-screen flex">
    <section
      className="w-1/3 h-screen shadow-z24 flex flex-col gap-64"
    >
      <img
        src={Logo}
        alt="logo"
        width="64"
        height="64"
      />
      <section className="w-full">
        <h1>Welcome to Chatty!</h1>
        <img src={SideImage} alt="side welcome" width="480" height="360" />
      </section>
    </section>
    <main></main>
  </div>
);
