import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import Toast from '../component/Toast';
import '../component/style.css'
import toastService from './toastService';

interface ToastProviderProps {
  children: React.ReactNode;
}

interface ToastProps {
  id?: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description: string;
  cta?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  exiting: boolean;
  len: number;
  isHover: boolean;
}

const ToastContext = createContext<{ addToast: (toast: ToastProps) => void }>({ addToast: () => {} });
// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {

  const [toasts, setToasts] = useState<ToastProps[]>([]);
  
  const addToast = useCallback(
    ({
      title,
      description,
      type,
      cta,
      position = 'top-right',
      exiting = false,
      len = 100,
      isHover = false,
    }: ToastProps) => {
      const id = Date.now().toString();
      const obj: ToastProps = { id, title, description, type, cta, position, exiting, len, isHover };
      setToasts((prevToasts) => [...prevToasts, obj]);
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  function updateToast(id: string) {
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === id ? { ...toast, exiting: true } : toast
      )
    );
  }

  useEffect(() => {
    toastService.registerNotification((data: unknown) => {
      if (typeof data === 'object' && data !== null) {
        addToast(data as ToastProps);
      }
    });
  }, [addToast]);

  useEffect(() => {
    const interval = setInterval(() => {
      setToasts((prevToasts) =>
        prevToasts.map((toast) => {
          if (toast.len <= 0 && !toast.exiting) {
            return { ...toast, exiting: true };
          }
          if (!toast.isHover && toast.len > 0 && !toast.exiting) {
            return { ...toast, len: toast.len - 1 };
          }
          return toast;
        })
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

  function pauseNotification(id: string) {
    setToasts((prevToasts) => {
      return prevToasts.map((toast) => {
        if (toast.id === id) {
          return { ...toast, isHover: true };
        }
        return toast;
      });
    });
  }
  function resumeNotification(id: string) {
    setToasts((prevToasts) => {
      return prevToasts.map((toast) => {
        if (toast.id === id) {
          return { ...toast, isHover: false };
        }
        return toast;
      });
    });
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {toasts.length > 0 && (
        <div
          className='toast-container'
          data-position={'top-right'} 
        >
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              id={toast.id!}
              description={toast.description}
              title={toast.title}
              type={toast.type}
              onRemove={removeToast}
              exiting={toast.exiting}
              updateToast={updateToast}
              len={toast.len}
              puaseNotification={pauseNotification}
              resumeNotification={resumeNotification}
            />
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export default ToastProvider