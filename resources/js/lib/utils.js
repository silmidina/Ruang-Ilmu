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
export function flashMessage(params) {
  return params.props.flash_message;
}

// Konversi Mata Uang Rupiah
export const formatToRupiah = (amount)=>{
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formatter.format(amount);
}