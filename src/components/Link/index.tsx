import React from 'react'
import './style.scss'

interface LinkProps extends React.HTMLAttributes<HTMLParagraphElement> {

}

const Link: React.FC<LinkProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div {...props} className={`link ${className}`} role='button'>
      {children}
    </div>
  )
}

export default Link
