import type { ButtonProps } from "../types/common";
import CancelIcon from "./icons/CancelIcon";

export function CancelButton({ onClick }: Readonly<ButtonProps>) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex cursor-pointer items-center gap-2"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 transition-colors group-hover:bg-green-700">
        <CancelIcon className="h-4 w-4 text-gray-800 transition-colors group-hover:text-gray-300" />
      </span>
      <span className="text-sm font-medium text-gray-300">Anuluj</span>
    </button>
  );
}
