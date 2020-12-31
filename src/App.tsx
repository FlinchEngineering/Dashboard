import React, { useEffect, useState } from 'react'
import './styles.css'
import Login from './components/pages/Login'
import { useUser } from './hooks/useUser'
import Home from './components/pages/Home'
import StoreService from './services/StoreService'
import { useDispatch } from 'react-redux'
import { userActions } from './store/user'
import Navbar from './components/Navbar'
import Modal from './components/Modal'

function App() {
  const user = useUser()
  const [showDash, setShowDash] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    const checkUser = async () => {
      const data = await StoreService.get('user')
      console.log('ddd',data)
      data && dispatch(userActions.getUser(data as any))
    } 
    checkUser()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if(!!user.uid ) {
      setShowDash(true)
      StoreService.save('user',user)
    }
  }, [user])
  return (
    <div>
      {showDash&&<Navbar showDash={setShowDash}/>}
      {showDash&&<Home/>}
      {!showDash&&<Login/>}
      <Modal/>
    </div>
  )
}

export default App
