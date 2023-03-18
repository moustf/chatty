import { Control } from 'react-hook-form';

export type InputFieldInterface = {
  control: Control<any>;
  fieldName: string;
  type: string;
  placeholder: string;
};
