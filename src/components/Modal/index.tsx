import React from 'react'
import { useModal } from '../../hooks/useModal';
import './style.scss';

interface ModalProps {
  title?: string;
  msg?: string;
  show?: boolean;
}

const Modal: React.FC<ModalProps> = () => {
  const {
    body,
    header,
    show
  } = useModal()
  return show 
  ? <div className='modal-container'>
      <div className='modal'>
        <h3>{header}</h3>
        <div className='body'>
          {body}
        </div>
      </div>
    </div>
  : null
}

export default Modal
