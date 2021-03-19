import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './style.scss'
import logo from '../../assets/logo.png'
import { userActions } from '../../store/user'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useUser } from '../../hooks/useUser'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const user = useUser()
  const { push } = useHistory()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    console.log('uid',user.uid)
    if (!!user.uid) {
      push('dash')
    }
  }, [user,push])
  const onEmailChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setEmail(value)
  }
  const onPassChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setPass(value)
  }
  const onLogin = async () => {
    setError('')
    const callback = () => push('dash')
    if (email&&pass) {
      dispatch(
        userActions
        .login(email,pass,callback,setError)
      )
    }else {
      setError('Email and password fields must have values.')
    }
  }
  return (
    <div className='container'>
      <div className='form'>
        <div>
          <img
            className='logo'
            src={logo}
            alt='logo'
          />
        </div>
        <div>
          <input onChange={onEmailChange} placeholder='Email' />
        </div>
        <div>
          <input onChange={onPassChange} placeholder='Password' type='password' />
        </div>
        <Button
          title='Login'
          className='btn'
          onClick={onLogin}
        />
        <br/>
        {!!error&&
        <p className='error'>
          {error}
        </p>}
      </div>
    </div>
  )
}

export default Login
