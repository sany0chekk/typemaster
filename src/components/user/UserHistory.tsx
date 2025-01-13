import Modal from "../layouts/Modal.tsx";
import { GameHistory } from "../../types/history.ts";

interface Props {
  isVisible: boolean;
  onCloseHistory: () => void;
  history: GameHistory[];
}

export default function UserHistory({
  isVisible,
  onCloseHistory,
  history = [],
}: Props) {
  return (
    <Modal isVisible={isVisible} onClose={onCloseHistory}>
      <table className="">
        <thead>
          <tr className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center pb-4 border-b-2 border-b-neutral-700">
            <th className="uppercase ">Date</th>
            <th className="uppercase ">WPM</th>
            <th className="uppercase max-md:hidden">Accuracy</th>
            <th className="uppercase max-md:hidden">Errors</th>
          </tr>
        </thead>
        <tbody>
          {history.map(({ id, date, speed, accuracy, errors }, index) => {
            return (
              <tr
                className={`${index % 2 === 0 ? "" : "bg-neutral-700"} p-3 rounded-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center`}
                key={id}
              >
                <td className="font-semibold text-yellow-400">
                  {date.toString()}
                </td>
                <td className="font-bold">{speed}</td>
                <td className="max-md:hidden">{accuracy}</td>
                <td className="max-md:hidden">{errors}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Modal>
  );
}
