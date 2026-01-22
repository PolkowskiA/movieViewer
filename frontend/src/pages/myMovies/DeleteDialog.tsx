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
  const { activeDialog, close, movieDetails } = useDialogsContext();
  const open = activeDialog === "delete";

  async function handleDelete() {
    if (movieDetails) {
      await deleteFavorite(movieDetails.id);
      refresh();
    }

    close();
  }

  return (
    <Dialog isOpen={open} onClose={close} dialogTitle="Usuń z kolekcji">
      <div className="flex flex-col gap-y-10">
        <div className="flex flex-wrap gap-x-1">
          <span className="whitespace-nowrap">Czy na pewno chcesz usunąć:</span>
          <span className="font-semibold underline">
            {`${movieDetails?.title}?`}
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
