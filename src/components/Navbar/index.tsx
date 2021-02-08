import React, { useEffect, useState } from 'react'
import './style.scss'
import logo from '../../assets/logo-lg.png'
import Button from '../Button'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/user'
import Link from '../Link'
import { useHistory, useLocation } from 'react-router-dom'
import { useUser } from '../../hooks/useUser'

interface NavbarProps {
  showDash?: (val:boolean)=>void;
  showCelebs?: (val:boolean)=>void
}

const Navbar: React.FC<NavbarProps> = () => {
  const dispatch = useDispatch()
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
  const add = async () => {
    push('dash')
  }
  const onLogout = () => {
    dispatch(userActions.logout())
  }
  const onViewCelebs = () => {
    push('celebs')
  }
  const onLogoClicked = () => {
    push('/')
  }
  const onViewCrafts = () => {
    push('/crafts')
  }
  if (!show) return null
  return (
    <div className='nav-container'>
      {/* <div className='offset' /> */}
      <div className='content'>
        <div role='link' onClick={onLogoClicked}>
          <img
            className='logo'
            alt='logo'
            src={logo}
          />
        </div>
        <div className='right'>
          <Link white onClick={add}>
            Add Celebrity
          </Link>
          <Link white onClick={onViewCrafts}>
            Crafts
          </Link>
          <Link white onClick={onViewCelebs}>
            Celebrities
          </Link>
          <Button
            invert
            title='Logout'
            onClick={onLogout}
          />
        </div>
      </div>
      {/* <div className='offset' /> */}
    </div>
  )
}

export default Navbar
