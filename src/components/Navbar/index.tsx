import React from 'react'
import './style.scss'
import logo from '../../assets/flinchLogo.png'
import Button from '../Button'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/user'

interface NavbarProps {
  showDash?: (val:boolean)=>void
}

const Navbar: React.FC<NavbarProps> = ({
  showDash
}) => {
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(userActions.clear())
    showDash&&showDash(false)
  }
  return (
    <div className='nav-container'>
      <div className='offset' />
      <div className='content'>
        <div>
          <img
            className='logo'
            alt='logo'
            src={logo}
          />
        </div>
        <div>
          <Button
            invert
            title='Logout'
            onClick={onLogout}
          />
        </div>
      </div>
      <div className='offset' />
    </div>
  )
}

export default Navbar
