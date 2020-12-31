import React from 'react'
import './style.scss'

interface FormBarProps {
  options: string[];
  setActive: (val:string)=>void
}

const FormBar: React.FC<FormBarProps> = ({
  options,
  setActive,
}) => {
  return (
    <div className='formBarContainer'>
      <span role='button' className='active'>
        Details
      </span>
      <span role='button'>
        Upload Sample
      </span>
    </div>
  )
}

export default FormBar
