import React, { useEffect, useState } from 'react'
import './styles.css'
import StoreService from './services/StoreService'
import { useDispatch } from 'react-redux'
import { userActions } from './store/user'
import Navbar from './components/Navbar'
import Modal from './components/Modal'
import Routes from './components/Routes'
import { UserAuthInfo } from './types'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Sidebar from './components/Sidebar'

const App = () => {
  const dispatch = useDispatch()
  const [showSidebar, setShowSidebar] = useState(false)
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
      <Routes>
        <Sidebar setShow={setShowSidebar} show={showSidebar} />
        <Navbar showSidebar={showSidebar} setSidebar={setShowSidebar} />
      </Routes>
      <Modal/>
    </div>
  )
}

export default App
