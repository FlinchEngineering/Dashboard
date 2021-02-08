import firebase from 'firebase'
import { auth } from "../config/firebase";
import Axios from 'axios'
import { API } from '../config/constants';

export default class AuthService {
  static async login (
    email:string,
    pass:string,
    callback?:any
  ):Promise<Partial<firebase.UserInfo>|null> {
    try {
      const {user}:any = await auth.signInWithEmailAndPassword(email,pass)
      const d = {
        displayName: user?.displayName||'',
        email: user?.email||'',
        phoneNumber: user?.phoneNumber||'',
        photoURL: user?.photoURL||'',
        uid: user?.uid||''
      }
      return d
    } catch (e) {
      callback(e.message)
      return null
    }
  }

  static async createUser (email:string,pass:string) {
    try {
      const res = await auth
        .createUserWithEmailAndPassword(email, pass)
      return res.user
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static async deleteUser (id:string) {
    try {
      const res = await Axios.post(
        `${API}deleteUser`,
        {id},
        {
          headers: {
            'Content-Type':'application/json'
          }
        }
      )
      return res.data
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

}