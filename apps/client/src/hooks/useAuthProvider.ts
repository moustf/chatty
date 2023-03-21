import { User } from '@chatty/types';
import axios from 'axios';
import { GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from '../firebaseSetup';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const useAuthProvider = () => async (provider: string) => {
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const twitterProvider = new TwitterAuthProvider();

  const sendToken = (user: User) => {
    axios.post(`${baseUrl}/api/v1/auth/providers`, user);
  };

  try {
    if (provider === 'google') {
      const googleRes = await signInWithPopup(auth, googleProvider);
      const googleToken = GoogleAuthProvider.credentialFromResult(googleRes)?.idToken;
      const { displayName, email, providerData } = googleRes.user;

      const [firstName, lastName] = displayName?.split(' ') as string[];

      sendToken({ firstName, lastName, email, token: googleToken, provider: providerData[0].providerId });
    } else if (provider === 'facebook') {
      const facebookRes = await signInWithPopup(auth, facebookProvider);
      const facebookToken = FacebookAuthProvider.credentialFromResult(facebookRes)?.idToken;
      const { displayName, email, providerData } = facebookRes.user;

      const [firstName, lastName] = displayName?.split(' ') as string[];

      sendToken({ firstName, lastName, email, token: facebookToken, provider: providerData[0].providerId });
    } else if (provider === 'twitter') {
      const twitterRes = await signInWithPopup(auth, twitterProvider);
      const twitterToken = TwitterAuthProvider.credentialFromResult(twitterRes)?.idToken;
    } else throw new Error('No provider type given');
  } catch (error: any) {
    if (error.code) {
      const { code, message, customData: { email } } = error;

      throw new Error(`${message} was thrown with status code: ${code} with the email: ${email}`);
    }
  }
}
