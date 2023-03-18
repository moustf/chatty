import { FC } from 'react';

export const OrSeparator: FC = () => (
  <section className="flex justify-between items-center mb-8">
    <div className="w-2/5 h-1.5 bg-grey-300 rounded-xl" />
    <p className="text-h4 text-grey-600">OR</p>
    <div className="w-2/5 h-1.5 bg-grey-300 rounded-xl" />
  </section>
);
