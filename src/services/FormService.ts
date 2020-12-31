import { storage } from "../config/dist/firebase";

export default class FormService {
  static storageRef = storage.ref().child('celebs/')
  static samplesRef = storage.ref().child('samples')

  static async uploadImage (file:File) {
    try {
      const { ref } = await this.storageRef.put(file)
      return await ref.getDownloadURL()
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static async uploadVideos (loc:string,files:File[]) {
    try {
      const uploaded = files.map(async file=>{
        const { ref } = await storage.ref(loc).put(file)
        return await ref.getDownloadURL()
      })
      return Promise.all(uploaded)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }
}