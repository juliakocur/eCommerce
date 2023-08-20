import { toast } from 'react-toastify';

export enum NotificationType {
  error = 'error',
  success = 'success',
  info = 'info',
  warning = 'warning',
  warn = 'warn',
}

export interface INotification {
  msg: string;
  type?: NotificationType;
}

export const AppNotification = ({
  msg,
  type = NotificationType.error,
}: INotification) => {
  toast[type](msg, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};
