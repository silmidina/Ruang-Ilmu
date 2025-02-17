import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

// Object Fine Payment Status
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
export const FINEPAYMENTSTATUS = {
  PENDING: 'TERTUNDA',
  SUCCESS: 'Sukses',
  FAILED: 'Gagal',
}

// Flash Message
export default function flashMessage(params) {
  return params.props.flash_message;
}
