import React from 'react';
import styles from './modal.module.css';

const Modal = ({ children, show, handleClose, size }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.shade} >
      <div className={styles.billboard} style={size && {width: size.width, height: size.height}}>
        <button onClick={handleClose} className={styles.btnX}>
          <i className="fa-solid fa-circle-xmark"></i>
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
