import { User } from "firebase/auth";

interface Props {
  user: User;
}

export default function UserInfo({ user }: Props) {
  return (
    <p className="font-bold text-2xl mb-10">
      Hello,{" "}
      <span className="text-yellow-400">{user.displayName || user.email}</span>
    </p>
  );
}
