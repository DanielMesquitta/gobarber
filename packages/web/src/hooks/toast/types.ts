export interface ToastContextState {
  addToast: (toast: Omit<ToastMessage, 'id'>) => string;
  removeToast: (id: string) => void;
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
}

export interface ToastProviderProps {
  toastTimeout?: number;
}
