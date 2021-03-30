import { ToastType } from '~/hooks/toast/types';

interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
}

export interface ToastProps {
  type?: ToastType;
}

export interface Props {
  messages: ToastMessage[];
}
