import { db } from "../config/dist/firebase"
import { User } from "../types"
import _ from 'lodash'
import AuthService from "./AuthService"
import FormService from "./FormService"

export default class UserService {
  static CelebRef = db.collection('celebs')
  static UserRef = db.collection('users')

  static async createCeleb (data:Partial<User>,videos?:File[]) {
    try {
      const batch = db.batch()
      console.log('Creating User')
      const res = data.email && await AuthService.createUser(data.email,'1234567')
      if (res) {
        const { uid } = res
        console.log('Uploading Celeb image')
        const url = data.image && await FormService.uploadImage(data.image)
        console.log('Uploading Video Samples')
        const samples = videos && 
          await FormService.uploadVideos('samples',videos)
        if (url) {
          const celebDocRef = this.CelebRef.doc()
          const userDocRef = this.UserRef.doc(uid)
          const celebData = {
            ..._.omit(data,'image'),
            imageUrl:url,
            samples,
            price: {
              ...data.price,
              amount: Number(data.price?.amount)
            }
          }
          const userData = {
            displayName: data.alias,
            email: data.email,
            imageUrl: data.imageUrl,
            celebId: celebDocRef.id,
            id: userDocRef.id,
          }
          batch.set(celebDocRef,celebData)
          batch.set(userDocRef,userData)
          await batch.commit()
          return true
        }
      }
      return false
    } catch (e) {
      console.log(e.message)
      return false
    }
  }

}