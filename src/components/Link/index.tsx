import React from 'react'
import './style.scss'

interface LinkProps extends React.HTMLAttributes<HTMLParagraphElement> {
  white?:boolean;
}

const Link: React.FC<LinkProps> = ({
  children,
  className,
  white,
  ...props
}) => {
  return (
    <div 
      {...props} 
      className={`link ${className} ${white&&'white'}`} 
      role='button'>
      {children}
    </div>
  )
}

export default Link
