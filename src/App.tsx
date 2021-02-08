import React, { useEffect } from 'react'
import './styles.css'
import StoreService from './services/StoreService'
import { useDispatch } from 'react-redux'
import { userActions } from './store/user'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import Routes from './components/Routes'
import { UserAuthInfo } from './types'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const checkUser = async () => {
      const data: UserAuthInfo = await StoreService.get('user')
      data && dispatch(userActions.getUser(data))
      console.log('checking',data)
    }
    checkUser()
  }, [dispatch])
  return (
    <div>
      {/* {showDash&&<Navbar 
        showDash={setShowDash}
        showCelebs={setShowCelebs}
      />}
      {showDash&&!showCelebs&&<Home/>}
      {showDash&&showCelebs&&<Celebs/>}
      {!showDash&&<Login/>} */}
      <Routes>
        <Navbar
        />
      </Routes>
      <Modal/>
    </div>
  )
}

export default App
