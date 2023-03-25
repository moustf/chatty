import { FC } from 'react';

import { SignupLoginWelcomeSection } from '../components/SignupLoginWelcomeSection';

export const LoginPage: FC = () => (
  <div className="w-full h-screen flex">
    <SignupLoginWelcomeSection text="Hi, Welcome Back!" />
    <main
      className="w-full h-screen flex justify-center lg:w-2/3"
    >
      hello
    </main>
  </div>
);
