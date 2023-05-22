import { FC } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler, FieldValue } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@chatty/types';
import { userDataSchema } from '@chatty/types';
import axios from 'axios';
import Swal from 'sweetalert2';

import { SignupLoginWelcomeSection } from '../components/SignupLoginWelcomeSection';
import { SocialMediaAuthSection } from '../components/SocialMediaAuthSection';
import { OrSeparator } from '../components/OrSeparator';
import { InputField } from '../components/InputField';

const baseUrl = import.meta.env.BASE_URL

export const SignupPage: FC = () => {
  axios.defaults.withCredentials = true;

  const { mutate } = useMutation({
    mutationFn: (user: User) => (
      axios.post(`${baseUrl}/api/v1/auth/signup`, user, {
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
        title: 'The user has account has been created successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    },
  });
  const {
    handleSubmit, control, formState: { errors, dirtyFields }
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: yupResolver(userDataSchema),
  });

  const isValid = (
    dirtyFields.firstName
    && dirtyFields.lastName
    && dirtyFields.email
    && dirtyFields.password
    && dirtyFields.confirmPassword
  );

  const onSignupSubmit: SubmitHandler<FieldValue<any>> = handleSubmit((data: User) => mutate(data));

  if (Object.keys(errors).length) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errors.firstName
        ? 'First Name is required!'
        : errors.lastName
          ? 'Last Name is required!'
          : errors.email
            ? 'Please provide a valid email!'
            : errors.password
              ? 'Password should contain one upper letter, one lower letter, on number, on symbol, and at least 5 characters!'
              : 'The two passwords should match!',
    });
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
          <form onSubmit={onSignupSubmit}>
            {
              [
                { name: 'firstName', type: 'text', placeholder: 'First Name' },
                { name: 'lastName', type: 'text', placeholder: 'Last Name' },
                { name: 'email', type: 'email', placeholder: 'Email' },
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
            <button
              className={
                `w-full h-14 mt-2 lg:mt-12 bg-secondary rounded-lg text-[#fff] text-btn font-bold cursor-pointer hover:shadow-secondary ${!isValid && 'cursor-not-allowed'}`
              }
              type="submit"
              disabled={!isValid}
            >Sign Up</button>
          </form>
        </section>
      </main>
  </div>
  );
};
