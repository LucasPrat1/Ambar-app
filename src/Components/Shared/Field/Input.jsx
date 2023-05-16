import React from 'react';
import styles from './input.module.css';

const Input = ({ type, name, label, register, valueOptions, valueRadio, error, disabled }) => {
  return (
    <>
      {type === 'select' ? (
        <div className={styles.container}>
          <label htmlFor={name}>{label}</label>
          <select
            name={name}
            {...register(name)}
            className={error ? styles.inputError : styles.input}
            disabled={disabled && disabled}
          >
            {valueOptions.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      ) : (
        <div className={styles.container}>
          <label htmlFor={name}>{label}</label>
          <input
            type={type}
            label={label}
            name={name}
            {...register(name)}
            className={error ? styles.inputError : styles.input}
            value={valueRadio && valueRadio}
            disabled={disabled && disabled}
          ></input>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}
    </>
  );
};

export default Input;
