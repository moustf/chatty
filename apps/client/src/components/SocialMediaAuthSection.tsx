import { FC  } from 'react';

import GoogleIcon from '../assets/google-icon.svg';
import FacebookIcon from '../assets/facebook-icon.svg';
import TwitterIcon from '../assets/twitter-icon.svg';
import { useAuthProvider } from '../hooks/useAuthProvider';

type AuthButtonProps = {
  icon: string;
  provider: string;
  provideAuth: (provider: string) => void;
}

const SocialMediaAuthButton: FC<AuthButtonProps> = ({ icon, provider, provideAuth }) => (
  <button
    className="w-1/3 h-12 border border-grey border-solid rounded-xl flex justify-center items-center hover:shadow-z12 hover:border-grey-200"
    onClick={() => provideAuth(provider)}
  >
    <img src={icon} alt="social media icon" />
  </button>
);

export const SocialMediaAuthSection: FC = () => {
  const authProvider = useAuthProvider();

  return (
    <section className="w-full flex justify-between items-center gap-10 mb-8">
      <SocialMediaAuthButton provider="google" provideAuth={authProvider} icon={GoogleIcon} />
      <SocialMediaAuthButton provider="facebook" provideAuth={authProvider} icon={FacebookIcon} />
      <SocialMediaAuthButton provider="twitter" provideAuth={authProvider} icon={TwitterIcon} />
  </section>
  );
}
