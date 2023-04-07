import { FC } from 'react';
import { useForm, SubmitHandler, FieldValue, Controller } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Swal from 'sweetalert2';

import { userOldNewPasswordsSchema } from '@chatty/types';

type ChangePasswords = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const baseUrl = import.meta.env.VITE_APP_BASE_URL;

export const UpdatePasswordForm: FC = () => {
  const { handleSubmit, control, formState: { errors } } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: yupResolver(userOldNewPasswordsSchema),
  });
  const { mutate } = useMutation({
    mutationFn: (data: ChangePasswords) => axios.put(`${baseUrl}/api/v1/user/password`, data, {
      withCredentials: true,
    }),
    onSuccess: () => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: "The user's password has been changed in successfully!",
        showConfirmButton: false,
        timer: 1500
      });
    },
    onError: (error: any) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.response.data.msg + " " + error?.response.status,
      });
    }
  });

  const onFormSubmit: SubmitHandler<FieldValue<any>> = handleSubmit((data: ChangePasswords) => mutate(data));

  return (
    <form onSubmit={onFormSubmit}>
      <Controller
        name="oldPassword"
        control={control}
        render={({ field: { onChange, onBlur, name } }) => (
          <input
            className="w-full h-16 h border-solid border-grey mb-6 border rounded-lg p px-4 py-2"
            type="password"
            name={name}
            placeholder="Old Password"
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      />
      {errors.oldPassword && (
        <span className="text-[#E04622] text-sm">Please enter your valid current password.</span>
      )}
      <Controller
        name="newPassword"
        control={control}
        render={({ field: { onChange, onBlur, name } }) => (
          <input
            className="w-full h-16 h border-solid border-grey mb-6 border rounded-lg p px-4 py-2"
            type="password"
            name={name}
            placeholder="New Password"
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      />
      {errors.newPassword && (
        <span className="text-[#E04622] text-sm">Please enter your valid new password.</span>
      )}
      <Controller
        name="confirmNewPassword"
        control={control}
        render={({ field: { onChange, onBlur, name } }) => (
          <input
            className="w-full h-16 h border-solid border-grey mb-6 border rounded-lg p px-4 py-2"
            type="password"
            name={name}
            placeholder="Confirm New Password"
            onBlur={onBlur}
            onChange={onChange}
          />
        )}
      />
      {errors.confirmNewPassword && (
        <span className="text-[#E04622] text-sm">Please confirm your new password.</span>
      )}
      <button
        className={
          `w-full h-14 mt-2 lg:mt-12 bg-secondary rounded-lg text-[#fff] text-btn font-bold cursor-pointer hover:shadow-secondary`
        }
        type="submit"
      >Set</button>
    </form>
  );
}
