import React from "react";

export default function StatsList({ children }: { children: React.ReactNode }) {
  return <ul className="mt-20 flex items-center gap-10">{children}</ul>;
}
