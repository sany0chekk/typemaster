import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Section({ children, className = "" }: Props) {
  return (
    <section className={`${className} py-10 flex flex-col w-full`}>
      {children}
    </section>
  );
}
