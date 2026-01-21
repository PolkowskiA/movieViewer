import type { JSX } from "react";

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  dialogTitle: string | JSX.Element;
}

export type ButtonProps = {
  onClick?: () => void;
};
