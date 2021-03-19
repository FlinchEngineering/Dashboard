import React from 'react'
import Loader from 'react-loader-spinner'
import { COLORS } from '../../config/theme'
import './style.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  invert?: boolean;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  children,
  invert,
  className,
  loading,
  ...props
}) => {
  const styleName = invert 
    ? 'btn-invert'
    : 'btn-container'
  return (
    <button 
      {...props}
      disabled={loading}
      title={title}
      className={`${styleName} ${className}`}>
      {loading
        ? <Loader
          className='loader'
          type='Oval'
          color={COLORS.white}
        />
        : title||children}
    </button>
  )
}

export default Button
