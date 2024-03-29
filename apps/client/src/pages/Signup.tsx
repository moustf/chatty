import { FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler, FieldValue } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@chatty/types';
import { userDataComponentSchema } from '@chatty/types';
import { useNavigate } from 'react-router-dom';

import { SignupLoginWelcomeSection } from '../components/SignupLoginWelcomeSection';
import { SocialMediaAuthSection } from '../components/SocialMediaAuthSection';
import { OrSeparator } from '../components/OrSeparator';
import { InputField } from '../components/InputField';
import { apiClient, errorSwalMessage, successSwalMessage } from '../utils';
import { useErrorMessage } from '../hooks';

export const SignupPage: FC = () => {
  const [step, setStep] = useState<number>(1);
  const { errorMessage, setError } = useErrorMessage();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (user: User) => (
      apiClient.post('/auth/signup', user)
    ),
    onError: (error: any) => {
      errorSwalMessage(error);
    },
    onSuccess: () => {
      successSwalMessage('The user has account has been created successfully!');

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    },
  });

  const {
    handleSubmit, control, reset, formState: { errors, dirtyFields }
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(userDataComponentSchema),
  });

  const isValid = Object.keys(dirtyFields).length === 5;

  const onSignupSubmit: SubmitHandler<FieldValue<any>> = handleSubmit((data: User) => mutate(data));

  if (Object.keys(errors).length && !errorMessage) {
    setError(
      errors.firstName
        ? 'First Name is required!'
        : errors.lastName
          ? 'Last Name is required!'
          : errors.email
            ? 'Please provide a valid email!'
            : errors.password
              ? 'Password should contain one upper letter, one lower letter, one number, one symbol, and at least 5 characters!'
              : errors.confirmPassword
                ? 'The two passwords should match!'
                : 'Unknown error!'
    );
  }

  return (
    <div className="w-full h-screen flex">
      <SignupLoginWelcomeSection text="Welcome to Chatty!" />
      <main
        className="w-full h-screen flex justify-center lg:w-2/3"
      >
        <section
          className="w-4/5 h-screen flex flex-col justify-center lg:w-2/3"
        >
          <section className="mb-10">
            <h2 className="text-bold text-h3 md:text-h2 mb-8">Sign up on Chatty!</h2>
            <p className="text-subtitle1 text-grey-600">
              Do you have an account?
              <a className="text-[#2065D1] underline hover:text-info-darker visited:text-secondary" href="/login">Log in</a>
              {"  "}
              .
            </p>
          </section>
          <SocialMediaAuthSection />
          <OrSeparator />
          {errorMessage && (
            <div className="text-error text-[0.8rem] my-2">{errorMessage}</div>
          )}
          <form onSubmit={onSignupSubmit}>
            <section className={`${step === 1 ? 'flex' : 'hidden'} flex-col`}>
              {
                [
                  { name: 'firstName', type: 'text', placeholder: 'First Name' },
                  { name: 'lastName', type: 'text', placeholder: 'Last Name' },
                  { name: 'email', type: 'email', placeholder: 'Email' },
                ].map((obj, ind) => (
                  <InputField
                    key={ind}
                    control={control}
                    fieldName={obj.name}
                    type={obj.type}
                    placeholder={obj.placeholder}
                  />
                ))
              }
            </section>
            <section className={`${step === 2 || step === 3 ? 'flex' : 'hidden'} flex-col`}>
              {
                [
                  { name: 'password', type: 'password', placeholder: 'Password' },
                  { name: 'confirmPassword', type: 'password', placeholder: 'Confirm Password' },
                ].map((obj, ind) => (
                  <InputField
                    key={ind}
                    control={control}
                    fieldName={obj.name}
                    type={obj.type}
                    placeholder={obj.placeholder}
                  />
                ))
              }
            </section>
            <button
              className={
                `w-full h-12 mt-2 lg:mt-8 bg-secondary rounded-lg text-[#fff] text-btn font-bold cursor-pointer hover:shadow-secondary ${!isValid && 'cursor-not-allowed'}`
              }
              type={step === 1 || step === 2 ? 'button' : 'submit'}
              onClick={
                step === 1 && !isValid
                  ? () => setStep(2)
                  : step === 2 && !isValid
                    ? () => setStep(1)
                    : () => setStep(3)
              }
              disabled={step === 3 && !isValid}
            >{
                step === 1 && !isValid
                  ? 'Next'
                  : step === 2 && !isValid
                    ? 'Back'
                    : 'Submit'
              }</button>
          </form>
        </section>
      </main>
  </div>
  );
};
