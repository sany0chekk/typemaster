import Button from "../ui/button.tsx";
import { History } from "lucide-react";

interface Props {
  onClick?: () => void;
}

export default function UserHistoryOpenButton({ onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      className="bg-yellow-600 h-16 p-4 rounded-xl text-xl font-bold flex items-center gap-2"
    >
      History
      <History className="size-8" />
    </Button>
  );
}
