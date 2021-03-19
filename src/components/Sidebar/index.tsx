import { useHistory, useLocation } from 'react-router-dom'
import styles from './style.module.scss'
import logo from '../../assets/flinchLogo.png'
import Link from '../Link'
import { useDispatch } from 'react-redux'
import { userActions } from '../../store/user'
import Button from '../Button'
import IconButton from '../IconButton'
import { useEffect } from 'react'

interface ISidebarProps {
  show: boolean;
  setShow: (val:boolean) => void;
}

const Sidebar: React.FC<ISidebarProps> = ({
  show,
  setShow
}) => {
  const dispatch = useDispatch()
  const { push } = useHistory()
  const { pathname } = useLocation()
  useEffect(() => {
    if(pathname.indexOf('login') > -1){
      setShow(false)
    }
  }, [pathname,setShow])
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
  const onClose = () => {
    setShow(false)
  }
  if (!show) return null
  return (
    <div className={styles['container']}>
      <IconButton 
        onClick={onClose}
        className={styles.close} 
        icon={<i className="fas fa-times" />} />
      <div 
        onClick={onLogoClicked} 
        className={styles['logoContainer']}>
        <img className={styles['logo']} src={logo} alt='logo' />
      </div>
      <div className={styles['menuContainer']}>
        <div className={styles['menuItems']}>
          <Link onClick={add} >
            Add Celebrity
          </Link>
          <Link onClick={onViewCrafts}>
            Crafts
          </Link>
          <Link onClick={onViewCelebs}>
            Celebrities
          </Link>
        </div>
        <Button
          title='Logout'
          onClick={onLogout}
        />
      </div>
    </div>
  )
}

export default Sidebar
