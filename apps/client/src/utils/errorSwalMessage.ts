import Swal from 'sweetalert2';

export const errorSwalMessage = (error: any) => (
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: error?.response.data.msg + " " + error?.response.status,
  })
);
