import { FC } from 'react';

import { SignupWelcomeSection } from '../components/SingupWelcomeSection';

export const SignupPage: FC = () => (
  <div className="w-full h-screen flex">
    <SignupWelcomeSection />
    <main
      className="w-2/3 h-screen flex justify-center items-center"
    >
      <section>
        hi
      </section>
    </main>
  </div>
);
