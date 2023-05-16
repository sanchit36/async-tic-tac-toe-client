import React from 'react';
import styles from '../styles/components/button.module.css';

const Button = ({
  children,
  color = 'yellow',
  size = 'large',
  className,
  disabled,
  children,
  color = 'yellow',
  size = 'large',
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={`${styles['btn']}
      ${color === 'blue' ? styles['btnBlue'] : ''}
      ${size === 'small' ? styles['btnSmall'] : ''}
      ${disabled === true ? styles['btnDisabled'] : ''}
      ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
    <button
      className={`${styles['btn']}
      ${color === 'blue' ? styles['btnBlue'] : ''}
      ${size === 'small' ? styles['btnSmall'] : ''}
      ${disabled === true ? styles['btnDisabled'] : ''}
      ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
