import { db } from "../config/firebase";
import { Celeb, Sample, User } from "../types";
import AuthService from "./AuthService";
import FormService from "./FormService";
import UtilService from "./UtilService";
import _ from 'lodash'

export default class CelebsService {
  static CelebsRef = db.collection('celebs')
  static UserRef = db.collection('users')

  static async createCeleb (
    data:Partial<Celeb>,
    videos?:File[]
  ) {
    let userId = null
    try {
      const batch = db.batch()
      console.log('Creating User')
      const pass = UtilService.generatePassword()
      const res = data.email && await AuthService
        .createUser(data.email,pass)
      if (res) {
        const { uid } = res
        userId = uid
        console.log('Uploading Celeb image')
        const url = data.image && await FormService
          .uploadImage('celebs/',data.image)
        console.log('image url:: ',url)
        console.log('Uploading Video Samples')
        const samples = videos && 
          await this
            .generateCelebSamples(videos)
        console.log('Video Samples generated',samples)
        if (url) {
          const celebDocRef = this.CelebsRef.doc()
          const userDocRef = this.UserRef.doc(uid)
          const celebData: Partial<Celeb> = {
            ..._.omit(data,'image'),
            imageUrl:url,
            samples:(samples&&samples)||[],
            price: {
              amount: Number(data.price?.amount)||0,
              currency: 'GHS',
              ...data.price,
            }
          }
          const userData: User = {
            displayName: data.alias||'',
            email: data.email||'',
            imageUrl: url,
            token: '',
            celebrity: {
              isCeleb: true,
              id: celebDocRef.id
            }
          }
          batch.set(celebDocRef,celebData)
          batch.set(userDocRef,userData)
          await batch.commit()
          console.log('Celeb created.')
          return true
        }
      }
      return false
    } catch (e) {
      console.log(e.message)
      console.log('User creation failed')
      userId && await AuthService.deleteUser(userId)
      return false
    }
  }
  static async generateCelebSamples (
    videos:File[]
  ):Promise<Sample[]|null> {
    try {
      const promise = videos.map(async v => {
        const thumbUri = await FormService
          .generateAndUploadThumbnail('samplesThumb',v)
        const videoUri = await FormService
          .uploadVideo('samples',v)
        return {
          uri: videoUri||'',
          thumbnail: thumbUri||''
        }
      })
      return promise && await Promise.all(promise)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }
  static async getAllCelebs() {
    try {
      const res = await this.CelebsRef
        .orderBy('alias','desc')
        .get()
      return res.docs.map(d=>({id:d.id,...d.data()} as Celeb))
    } catch (e) {
      console.log(e.message)
      return null
    }
  }
  static async deleteCeleb(id:string) {
    try {
      await this.CelebsRef
        .doc(id)
        .delete()
      return true
    } catch (e) {
      alert(e.message)
      return false
    }
  }
  static async deleteCelebUser(
    id:string,
  ) {
    let deleted = null
    try {
      await db.runTransaction(async transaction =>{
        const celebDocRef = this.CelebsRef
          .doc(id)
        const user = await this.getUserByCelebId(id)
        const userDocRef = user && this.UserRef
          .doc(user.id)
        deleted = user && await AuthService
          .deleteUser(user.id||'')
        if (deleted) {
          transaction.delete(celebDocRef)
          userDocRef && transaction.delete(userDocRef)
        }
      })
      return !!deleted
    } catch (e) {
      alert(e)
      return false
    }
  }

  static async getUserByCelebId (id:string) {
    try {
      const data = await this.UserRef
        .where('celebrity.id','==',id)
        .get()
      const res = data.docs[0]
      return {id:res.id,...res.data()} as User
    } catch (e) {
      console.log(e.message)
      return null
    }
  }
}