import DeleteIcon from "./icons/DeleteIcon";

type DeleteButtonProps = {
  onClick?: () => void;
};

export function DeleteButton({ onClick }: Readonly<DeleteButtonProps>) {
  return (
    <button
      onClick={onClick}
      className="group inline-flex cursor-pointer items-center gap-2"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 transition-colors group-hover:bg-red-700">
        <DeleteIcon className="h-4 w-4 text-gray-800 transition-colors group-hover:text-gray-300" />
      </span>
      <span className="text-sm font-medium text-gray-300">Usuń</span>
    </button>
  );
}
