import React from 'react'
import './style.scss'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {

}

export const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  ...props
}) => {
  return (
    <textarea 
      className='area-container'
      placeholder={placeholder}
      {...props}
    >
      
    </textarea>
  )
}
