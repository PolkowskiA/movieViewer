import { deleteFavorite } from "../../api/movieApi";
import { CancelButton } from "../../components/CancelButton";
import { DeleteButton } from "../../components/DeleteButton";
import { useDialogsContext } from "../../context/dialogContext/useDialogsContext";
import Dialog from "./Dialog";

export default function DeleteDialog({
  refresh,
}: Readonly<{
  refresh: () => void;
}>) {
  const { activeDialog, close, selectedItem } = useDialogsContext();
  const open = activeDialog === "delete";

  async function handleDelete() {
    if (selectedItem) {
      await deleteFavorite(selectedItem.id);
      refresh();
    }

    close();
  }

  return (
    <Dialog isOpen={open} onClose={close} dialogTitle="Usuń z kolekcji">
      <div className="grid gap-y-10">
        <div className="">
          <span className="flex gap-x-1">
            <span className="whitespace-nowrap">
              Czy na pewno chcesz usunąć:
            </span>
            <span className="font-semibold underline">
              {`${selectedItem?.title}?`}
            </span>
          </span>
        </div>
        <div className="flex justify-around">
          <CancelButton onClick={close} />
          <DeleteButton onClick={handleDelete} />
        </div>
      </div>
    </Dialog>
  );
}
