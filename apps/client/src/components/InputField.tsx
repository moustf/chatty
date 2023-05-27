import { FC, useState } from 'react';
import { InputFieldInterface } from '@chatty/types';
import { Controller, Control } from 'react-hook-form';

import EyeOff from '../assets/eye-off-line.svg';
import EyeOn from '../assets/eye-line.svg';

export const InputField: FC<InputFieldInterface & { control: Control<any>; }> = ({
  control,
  fieldName,
  placeholder,
  type,
}) => {
  const [inputType, setInputType] = useState<'text' | 'password'>('password');

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { onChange, onBlur, name } }) => {
        return type === 'password'
          ? (
            <div className='flex'>
              <input
                className="w-full h-14 h border-solid border-grey mb-6 border rounded-lg p px-4 py-2"
                type={inputType}
                name={name}
                placeholder={placeholder}
                onBlur={onBlur}
                onChange={onChange}
              />
              {
                inputType === 'password'
                  ? <img
                    className='translate-x-[-3rem] translate-y-[-0.8rem]'
                    src={EyeOn}
                    onClick={() => setInputType('text')}
                    alt="Eye open icon"
                    width="24"
                    height="24"
                  />
                  : <img
                    className='translate-x-[-3rem] translate-y-[-0.8rem]'
                    src={EyeOff}
                    onClick={() => setInputType('password')}
                    alt="Eye close icon"
                    width="24"
                    height="24"
                  />
              }
            </div>
          )
          : <input
            className="w-full h-14 h border-solid border-grey mb-6 border rounded-lg p px-4 py-2"
            type={type}
            name={name}
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={onChange}
          />
      }}
    />
  )
};
