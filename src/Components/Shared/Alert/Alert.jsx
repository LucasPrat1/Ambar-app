import React from 'react';
import styles from './alert.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { setShowAlert } from '../../../redux/alert/actions';

const Alert = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert)

  if (!alert.show) {
    return null;
  }

  const closeAlert = () => {
    dispatch(setShowAlert(false));
   }

  setTimeout(()=> { closeAlert() },  alert.time )

  return (
    <div className={
      alert.type === 'success' ? styles.alertSuccess :
        alert.type === 'error' ? styles.alertError :
          alert.type === 'warning' ? styles.alertWarning :
            styles.alertInfo
    } >
      <p>
        {alert.message}
      </p>
      <button onClick={() => closeAlert()} className={styles.btnX}>
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default Alert;
