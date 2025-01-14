import { User } from "firebase/auth";

interface Props {
  user: User;
}

export default function UserInfo({ user }: Props) {
  return (
    <div className="bg-neutral-800 shadow-sm rounded-xl p-6 flex items-center justify-center mb-10">
      <p className="font-bold text-2xl">
        Hello,{" "}
        <span className="text-yellow-400">
          {user.displayName || user.email}
        </span>
      </p>
    </div>
  );
}
