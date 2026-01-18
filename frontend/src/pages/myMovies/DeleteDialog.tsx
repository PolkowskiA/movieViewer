import { DeleteButton } from "../../components/DeleteButton";
import { useDialogsContext } from "../../context/dialogContext/useDialogsContext";
import type { TmdbMovie } from "../../types";
import Dialog from "./Dialog";

export default function DeleteDialog({
  onDeleted,
}: Readonly<{
  onDeleted: (id: number) => void;
}>) {
  const { activeDialog, close, selectedItem } = useDialogsContext();
  const open = activeDialog === "delete";

  function handleDelete() {
    const data = localStorage.getItem("movies");
    const parsedData = JSON.parse(data ?? "[]") as TmdbMovie[];
    const filteredData = parsedData.filter((x) => x.id !== selectedItem?.id);

    localStorage.setItem("movies", JSON.stringify(filteredData));

    if (selectedItem) {
      onDeleted(selectedItem.id);
    }

    close();
  }

  return (
    <Dialog isOpen={open} onClose={close} dialogTitle="Usuń film">
      <div className="grid gap-y-10">
        <div className="">
          <span>
            {`Czy na pewno chcesz usunąć: `}
            <span className="font-semibold underline">
              {selectedItem?.title}
            </span>
            {`?`}
          </span>
        </div>
        <div className="flex justify-around">
          <DeleteButton onClick={handleDelete} />
          <DeleteButton onClick={handleDelete} />
        </div>
      </div>
    </Dialog>
  );
}
