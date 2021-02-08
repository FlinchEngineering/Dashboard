import React from 'react'
import './style.scss'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  invert?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  children,
  invert,
  className,
  ...props
}) => {
  const styleName = invert 
    ? 'btn-invert'
    : 'btn-container'
  return (
    <button 
      {...props}
      title={title}
      className={`${styleName} ${className}`}>
      {title||children}
    </button>
  )
}

export default Button
