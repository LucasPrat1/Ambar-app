import React from 'react';
import styles from './buttons.module.css';

const Button = ({
  backgroundColor,
  color,
  borderRadius,
  width,
  maxWidth,
  height,
  fontSize,
  onClick,
  children
}) => {
  return (
    <button
      onClick={onClick}
      className={styles.button}
      style={{
        backgroundColor,
        borderRadius,
        height,
        width,
        maxWidth
      }}
    >
      <p className={styles.text} style={{ color, fontSize }}>
        {children}
      </p>
    </button>
  );
};

export default Button;
