import React from 'react'
import './style.scss'

interface InputOptionsProps {
  value: string|number|undefined,
  options: string[],
  onChange: (e:React.ChangeEvent<HTMLSelectElement>) => void
}

const InputOptions: React.FC<
  InputOptionsProps
> = ({
  options,
  onChange,
  value
}) => {
  return (
    <select 
      className='selectContainer'
      value={value}
      onChange={onChange}>
      {options.map(c=>{
        return <option 
          key={c}
          className='selectOption'>
          {c}
        </option>
      })}
    </select>
  )
}

export default InputOptions
