import { useEffect, useId, useRef, type ReactNode } from "react";
import DeleteIcon from "../../components/icons/DeleteIcon";
import type { DialogProps } from "../../types/common";

export default function Dialog({
  isOpen,
  onClose,
  dialogTitle,
  children,
  ...rest
}: Readonly<
  DialogProps & {
    children: ReactNode;
  } & React.HTMLAttributes<HTMLDialogElement>
>) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (!dialog.open) dialog.showModal();
    } else {
      document.body.style.overflow = "";
      if (dialog.open) dialog.close();
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => onClose();
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener("close", handleClose);
    dialog.addEventListener("cancel", handleCancel);

    return () => {
      dialog.removeEventListener("close", handleClose);
      dialog.removeEventListener("cancel", handleCancel);
    };
  }, [onClose]);

  return (
    <dialog
      {...rest}
      className={`fixed z-50 m-auto rounded-2xl border border-gray-100 backdrop:bg-black/85 md:w-2xl ${rest.className ?? ""}`}
      ref={dialogRef}
      aria-labelledby={dialogId}
    >
      <div className="animate-fade-in-scale z-10 box-border flex h-full w-full flex-col overflow-auto rounded-2xl bg-gray-900 p-2 md:p-6">
        <div className="sticky top-0 mb-4 backdrop-blur-lg">
          <h2 id={dialogId} className="mr-9 text-2xl font-semibold">
            {dialogTitle}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 cursor-pointer rounded-lg hover:bg-gray-100 hover:text-black"
            aria-label="Close modal"
          >
            <DeleteIcon className="w-8" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
