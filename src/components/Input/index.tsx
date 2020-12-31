import React from 'react'
import { Currency } from '../../types'
import './style.scss'

const CURRENCY = [
  'GHS',
  'NGN',
  '$'
]

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mode?: 'currency';
  setCurrency?: (val:Currency)=>void;
}

const Input: React.FC<InputProps> = ({
  className,
  placeholder,
  type,
  mode,
  setCurrency,
  ...props
}) => {
  const onCurrencyChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency && 
    setCurrency(e.target.value as Currency)
  }
  const renderCurrency = () => {
    return <div>
      <select 
        className='options'
        onChange={onCurrencyChange}
      >
        {CURRENCY.map(d=><option>
          {d}
        </option>)}
      </select>
    </div>
  }
  const showCurrency = mode==='currency'
    ? renderCurrency()
    : undefined
  return (
    <div className='input-main-container'>
      {showCurrency}
      <input 
        className='input-container' 
        placeholder={placeholder}
        type={type}
        {...props}
      />
    </div>
    
  )
}

export default Input
