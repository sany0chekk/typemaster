interface Props {
  title: string;
  value: string | number;
}

export default function StatsItem({ title, value }: Props) {
  return (
    <li className="bg-yellow-400 rounded-xl p-2 w-28">
      <p className="flex flex-col items-center font-semibold text-white capitalize">
        <span className="text-4xl font-bold ">{value}</span>
        {title}
      </p>
    </li>
  );
}
