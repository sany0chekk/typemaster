import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className = "" }: Props) {
  return (
    <div
      className={`${className} flex-grow w-full max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg px-4 mx-auto`}
    >
      {children}
    </div>
  );
}
