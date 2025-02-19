import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Object Fine Payment Status
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}
export const FINEPAYMENTSTATUS = {
    PENDING: 'TERTUNDA',
    SUCCESS: 'Sukses',
    FAILED: 'Gagal',
};

// Flash Message
export function flashMessage(params) {
    return params.props.flash_message;
}

// Konversi Mata Uang Rupiah
export const formatToRupiah = (amount) => {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formatter.format(amount);
};

// Message Error
export const messages = {
    503: {
        title: 'Service Unavailable',
        description: 'Sorry, we are doing some maintenance. Please check back soon',
        status: '503',
    },
    500: {
        title: 'Server Error',
        description: 'Oops, something went wrong on our servers',
        status: '500',
    },
    404: {
        title: 'Not Found',
        description: 'Sorry, the page you are looking for could not be found',
        status: '404',
    },
    403: {
        title: 'Forbidden',
        description: 'Sorry, you are forbidden from accessing this page',
        status: '403',
    },
    401: {
        title: 'Unauthorized',
        description: 'Sorry, you are unauthorized to access this page',
        status: '401',
    },
    429: {
        title: 'Too Many Request',
        description: 'Please try again in just a second',
        status: '429',
    },
};
