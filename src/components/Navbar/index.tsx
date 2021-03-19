import React, { useEffect, useState } from 'react'
import './style.scss'
import logo from '../../assets/logo-lg.png'
import { useHistory, useLocation } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'
import IconButton from '../IconButton'

interface NavbarProps {
  showSidebar: boolean;
  setSidebar: (val:boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  showSidebar,
  setSidebar
}) => {
  const [show, setShow] = useState(true)
  const { pathname } = useLocation()
  const { push, replace } = useHistory()
  const { uid } = useUser()
  const hasUser = !!uid
  const isAuth = pathname.includes('login')
  useEffect(() => {
    isAuth
      ? setShow(false)
      : setShow(true)
  }, [setShow,isAuth])
  useEffect(() => {
    console.log('hasUser',hasUser)
    !hasUser && replace('login')
  }, [hasUser,replace])
  const onLogoClicked = () => {
    push('/')
  }
  const openSidebar = () => {
    setSidebar(true)
  }
  // const closeSidebar = () => {
  //   setSidebar(false)
  // }
  if (!show) return null
  return (
    <div className='nav-container'>
      <div className='content'>
        <div role='link' onClick={onLogoClicked}>
          <img
            className='logo'
            alt='logo'
            src={logo}
          />
        </div>
        {!showSidebar&&<IconButton 
          onClick={openSidebar}
          className='hamburger' 
          icon={<i className="fas fa-bars" />} />}
      </div>
    </div>
  )
}

export default Navbar
