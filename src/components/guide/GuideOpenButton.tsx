import { Info } from "lucide-react";
import Button from "../ui/button.tsx";

interface Props {
  onClick?: () => void;
}

export default function GuideOpenButton({ onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      className="bg-neutral-700 p-2 rounded-xl flex items-center gap-2 font-bold text-xl h-16"
    >
      Guide
      <Info className="size-10 text-yellow-400" />
    </Button>
  );
}
