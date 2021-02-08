import React, { useEffect } from 'react'
import { useModal } from '../../hooks/useModal';
import './style.scss';
import closeIcon from '../../assets/close.png'
import { useDispatch } from 'react-redux';
import { modalActions } from '../../store/modal';
interface ModalProps {
  title?: string;
  msg?: string;
  show?: boolean;
}

const Modal: React.FC<ModalProps> = () => {
  const dispatch = useDispatch()
  const {
    body,
    header,
    show
  } = useModal()
  useEffect(() => {
    if(show) {
      document.body.scrollTop = 0
      document.body.style.overflow ='hidden'
    } else {
      document.body.style.overflow='scroll'
    }
  }, [show])
  const close = () => {
    dispatch(modalActions.clearModal())
  }
  return show 
  ? <div className='modal-container'>
      <div className='modal'>
        <span onClick={close} className='close'>
          <img src={closeIcon} alt='close' />
        </span>
        <h3>{header}</h3>
        <div className='body'>
          {body}
        </div>
      </div>
    </div>
  : null
}

export default Modal
