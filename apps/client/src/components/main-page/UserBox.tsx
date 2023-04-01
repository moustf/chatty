import { FC } from 'react';

export const UserBox: FC<{ fname: string; lname: string; email: string }> = (
  { fname, lname, email }
) => (
  <div className="w-full flex flex-col gap-6">
    <section className="w-full lg:h-24 flex flex-col gap-8 lg:gap-0 lg:flex-row justify-between items-center py-4">
      <img
        className="rounded-lg"
        src={`https://api.dicebear.com/6.x/pixel-art/svg?seed=${fname}`}
        alt="avatar"
        width="62"
        height="62"
      />
      <div className="flex flex-col justify-center items-center gap-4">
        <h3 className="text-h5 lg:text-h3">{fname} {lname}</h3>
        <p className="text-subtitle2 text-grey-300">{email}</p>
      </div>
      <button
        className="w-20 h-9 font-bold bg-secondary-lighter shadow-z24 hover:border hover:border-solid hover:border-black"
        type="button">Add</button>
    </section>
    <div className="w-full h-1 rounded-lg bg-grey-300" />
  </div>
);
