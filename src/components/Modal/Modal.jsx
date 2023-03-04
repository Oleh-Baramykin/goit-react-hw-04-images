import PropTypes from 'prop-types';
import { ModalBox, Overlay } from './Modal.styled';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ dataImage, closeModal }) => {
  useEffect(() => {
    const handleEscpClick = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEscpClick);
    return () => window.removeEventListener('keydown', handleEscpClick);
  }, [closeModal]);

  const onClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const { src, alt } = dataImage;
  return createPortal(
    <Overlay onClick={onClick}>
      <ModalBox>
        <img src={src} alt={alt} />
      </ModalBox>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  dataImage: PropTypes.string.isRequired,
};
