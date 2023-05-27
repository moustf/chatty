import { FC } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler, FieldValue } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginData, validateLoginData } from '@chatty/types';
import axios from 'axios';
import Swal from 'sweetalert2';

import { SignupLoginWelcomeSection } from '../components/SignupLoginWelcomeSection';
import { SocialMediaAuthSection } from '../components/SocialMediaAuthSection';
import { OrSeparator } from '../components/OrSeparator';
import { InputField } from '../components/InputField';
import { baseUrl } from '../config/environment';

export const LoginPage: FC = () => {
  axios.defaults.withCredentials = true;

  const { mutate } = useMutation({
    mutationFn: (data: LoginData) => (
      axios.post(`${baseUrl}/api/v1/auth/login`, data, {
        withCredentials: true,
        headers: {
          'content-type': 'application/json',
          'Accept': 'application/json',
        },
      })
    ),
    onError: (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.response.data.msg + " " + error?.response.status,
      });
    },
    onSuccess: () => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'The user has logged in successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
  const { handleSubmit, control, formState: { errors, dirtyFields } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(validateLoginData),
  });

  const isValid = dirtyFields.email && dirtyFields.password;

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
                `w-full h-12 mt-2 lg:mt-8 bg-secondary rounded-lg text-[#fff] text-btn font-bold cursor-pointer hover:shadow-secondary ${!isValid && 'cursor-not-allowed'}`
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
