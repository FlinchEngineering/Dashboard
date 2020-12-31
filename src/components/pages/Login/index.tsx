import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '../../Button'
import Input from '../../Input'
import './style.scss'
import logo from '../../../assets/logo.png'
import { userActions } from '../../../store/user'
import { useUser } from '../../../hooks/useUser'

const Login = () => {
  const dispatch = useDispatch()
  const user = useUser()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
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
    if (email&&pass) {
      dispatch(userActions.login(email,pass,setError))
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
        <Input
          placeholder='Email'
          onChange={onEmailChange}
          value={email}
        />
        <Input
          placeholder='Password'
          type='password'
          onChange={onPassChange}
          value={pass}
        />
        <Button
          title='Login'
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
