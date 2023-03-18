import { FC } from 'react';
import { InputFieldInterface } from '@chatty/types';
import { Controller } from 'react-hook-form';

export const InputField: FC<InputFieldInterface> = ({
  control,
  fieldName,
  placeholder,
  type,
}) => (
  <Controller
    name={fieldName}
    control={control}
    render={({ field: { onChange, onBlur, name } }) => (
      <input
        className="w-full h-16 h border-solid border-grey mb-6 border rounded-lg p px-4 py-2"
        type={type}
        name={name}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
      />
    )}
  />
);
