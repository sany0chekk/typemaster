interface Props {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export default function StatsItem({ title, value, icon }: Props) {
  return (
    <li className="bg-yellow-600 rounded-xl p-4">
      <p className="flex flex-col gap-1 items-center font-semibold text-white capitalize">
        <span className="text-4xl font-bold">{value}</span>
        <p className="flex items-center gap-2 uppercase">
          {title} {icon}
        </p>
      </p>
    </li>
  );
}
