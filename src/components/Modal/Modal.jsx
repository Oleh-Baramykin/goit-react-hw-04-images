import PropTypes from 'prop-types';
import { ModalBox, Overlay } from './Modal.styled';
import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    dataImage: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleEscpClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscpClick);
  }

  handleEscpClick = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  onClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    const { src, alt } = this.props.dataImage;
    return createPortal(
      <Overlay onClick={this.onClick}>
        <ModalBox>
          <img src={src} alt={alt} />
        </ModalBox>
      </Overlay>,
      modalRoot
    );
  }
}
