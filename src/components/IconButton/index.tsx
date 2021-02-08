import React from 'react'
import './style.scss'
import Loader from "react-loader-spinner";
import { COLORS } from '../../config/theme';

interface IconButtonProps {
  icon: any;
  onClick?: () => void;
  className?: string;
  loading?:boolean;
}
 
const IconButton: React.FC<IconButtonProps> = ({
  icon,
  className,
  onClick,
  loading
}) => {
  return (
    <div
      className={`iconBtnContainer ${className||''}`}
      onClick={onClick&&onClick}
      role='button'>
        <>
        {!loading
        ? <span>{icon}</span>
        : <Loader
          type='Circles'
          className='loader'
          color={COLORS.iconGrey}
          height={15}
          width={15}  
        />}
        </>
    </div>
  )
}

export default IconButton
