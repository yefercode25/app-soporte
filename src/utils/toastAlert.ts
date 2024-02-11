import { ExternalToast, toast } from "sonner";

export interface ToastOptions {
  title?: string;
  description?: string;
  tipo: 'info' | 'success' | 'warning' | 'error' | 'promise';
  onClick?: () => void;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  promise?: Promise<any>;
}

export const toastAlert = ({
  title: message,
  description='',
  tipo = 'success',
  onClick,
  loadingText,
  promise,
  successText,
  errorText,
}: ToastOptions) => {
  let options: ExternalToast = {
    description,
    dismissible: true,
  }

  if(onClick !== undefined) {
    options = {
      ...options,
      action: {
        label: 'Aceptar',
        onClick,
      },
    }
  }

  if(tipo === 'success') {
    toast.success(message, options);
  } else if(tipo === 'warning') {
    toast.warning(message, options);
  } else if(tipo === 'info') {
    toast.info(message, options);
  } else if(tipo === 'promise') {
    if(promise !== undefined) {
      toast.promise(promise, {
        loading: loadingText,
        success: successText,
        error: errorText,
        ...options,
      });
    }
  } else {
    toast.error(message, options);
  }
};
