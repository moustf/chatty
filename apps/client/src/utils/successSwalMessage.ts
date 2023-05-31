import Swal from 'sweetalert2';

export const successSwalMessage = (msg: string) => (
  Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: msg,
    showConfirmButton: false,
    timer: 1500
  })
);
