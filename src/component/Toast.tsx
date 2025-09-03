import React from 'react'
import './style.css'
import success from '../assets/success.svg'
import error from '../assets/error.svg'
import info from '../assets/info.svg'

const TYPE_TOAST = {
  success: success,
  error: error,
  info: info
}

interface ToastProps {
  id: string;
  title: string;
  description: string;
  cta?: string;
  onRemove: (id: string) => void;
  type?: 'success' | 'error' | 'info';
  exiting: boolean;
  updateToast: (id: string) => void;
  len: number;
  puaseNotification: (id: string) => void;
  resumeNotification: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({
  id,
  title,
  description,
  onRemove,
  cta,
  type = 'success',
  exiting,
  updateToast,
  len, 
  puaseNotification,
  resumeNotification
}) => {

  const handleOnClick = () => {
    updateToast(id);
  }

  let className = 'toast';
  if (exiting) className += ' exiting-toast';

  function handleMouseOver() {
    puaseNotification(id);
  }
  function handleMouseLeave() {
    resumeNotification(id);
  }

  return (
    <React.Fragment>
      <div 
        data-type={type} 
        className={className}
        onAnimationEnd={() => onRemove(id)}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <button onClick={handleOnClick} className='close'>&times;</button>
        <div className='toast-content'>
          <div className='toast-info'>
            <img src={TYPE_TOAST[type]} height={18} width={18} />
            <div className='toast-title-description'>
              <span>{title}</span>
              {!!description && <span>{description}</span>}
            </div>
          </div>
          {!!cta && <div className='toast-cta'>
            {cta}
          </div>}
        </div>
        <div style={{width: `${len}%`}} type-param={type} className='toast-progress'></div>
      </div>
    </React.Fragment>
  )
}

export default Toast