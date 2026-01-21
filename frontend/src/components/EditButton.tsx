import type { ButtonProps } from "../types/common";

export function EditButton({ onClick }: Readonly<ButtonProps>) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex cursor-pointer items-center gap-2"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 transition-colors group-hover:bg-blue-700">
        <svg
          className="h-4 w-4 text-gray-800 transition-colors group-hover:text-gray-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.414 2.586a2 2 0 0 0-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 0 0 0-2.828zM5 13v2h2l7.586-7.586-2-2L5 13z" />
        </svg>
      </span>
      <span className="text-sm font-medium text-gray-300 select-none">
        Edytuj
      </span>
    </button>
  );
}
