import React from 'react';
import styles from './alert.module.css';

const Alert = ({ children, show, setShow, time, type }) => {
  if (!show) {
    return null;
  }

  setTimeout(()=> { setShow(false) },  time? time : 3500 )

  return (
    <div className={
      type === 'success' ? styles.alertSuccess :
        type === 'error' ? styles.alertError :
          type === 'warning' ? styles.alertWarning :
            styles.alertInfo
    } >
      <p>
        {children}
      </p>
      <button onClick={() => setShow(false)} className={styles.btnX}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default Alert;
