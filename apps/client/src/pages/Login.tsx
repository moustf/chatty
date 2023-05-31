import { FC } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler, FieldValue } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { LoginData, validateLoginData } from '@chatty/types';

import { SignupLoginWelcomeSection } from '../components/SignupLoginWelcomeSection';
import { SocialMediaAuthSection } from '../components/SocialMediaAuthSection';
import { OrSeparator } from '../components/OrSeparator';
import { InputField } from '../components/InputField';
import { apiClient, errorSwalMessage, successSwalMessage } from '../utils';
import { useErrorMessage } from '../hooks';

export const LoginPage: FC = () => {
  const navigate = useNavigate();
  const { errorMessage, setError } = useErrorMessage();

  const { mutate } = useMutation({
    mutationFn: (data: LoginData) => (
      apiClient.post('/auth/login', data)
    ),
    onError: (error: any) => {
      errorSwalMessage(error);
    },
    onSuccess: () => {
      successSwalMessage('The user has logged in successfully!');

      setTimeout(() => {
        navigate('/main');
      }, 1500);
    }
  });

  const { handleSubmit, control, formState: { errors, dirtyFields } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validateLoginData),
  });

  const isValid = Object.keys(dirtyFields).length === 2;

  if (Object.keys(errors).length && !errorMessage) {
    setError(
      errors.email
        ? 'You must enter a valid email!'
        : errors.password
          ? 'Password should contain one upper letter, one lower letter, one number, one symbol, and at least 5 characters!'
          : 'Unknown error!'
    );
  }

  const onLoginSubmit: SubmitHandler<FieldValue<any>> = handleSubmit((data: LoginData) => mutate(data));

  return (
    <div className="w-full h-screen flex">
    <SignupLoginWelcomeSection text="Hi, Welcome Back!" />
    <main
      className="w-full h-screen flex justify-center lg:w-2/3"
    >
        <section
          className="w-4/5 h-screen flex flex-col justify-center lg:w-2/3"
        >
          <section className="mb-10">
            <h2 className="text-bold text-h3 md:text-h2 mb-8">Sign in to Chatty!</h2>
            <p className="text-subtitle1 text-grey-600">
              Don't you have an account?
              <a className="text-[#2065D1] underline hover:text-info-darker visited:text-secondary" href="/signup">Sign up</a>
              {"  "}
              .
            </p>
          </section>
          <SocialMediaAuthSection />
          <OrSeparator />
          {errorMessage && (
            <div className="text-error text-[0.8rem] my-2">{errorMessage}</div>
          )}
          <form onSubmit={onLoginSubmit}>
            <InputField
              control={control}
              fieldName="email"
              placeholder="Please enter your email!"
              type="email"
            />
            <InputField
              control={control}
              fieldName="password"
              placeholder="Please enter your password!"
              type="password"
            />
            <button
              className={
                `w-full h-12 mt-2 lg:mt-8 bg-secondary rounded-lg text-[#fff] text-btn font-bold hover:shadow-secondary ${!isValid ? 'cursor-not-allowed' : 'cursor-pointer'}`
              }
              type="submit"
              disabled={!isValid}
            >Login</button>
          </form>
        </section>
    </main>
  </div>
  );
};
