import { storage } from "../config/firebase";
import { getMetadata, getThumbnails } from 'video-metadata-thumbnails';

export default class FormService {

  static async uploadImage (
    path:string,
    file:File|Blob
  ):Promise<string|null> {
    try {
      const { ref } = await storage
        .ref()
        .child(path)
        .child(Date.now().toString())
        .put(file)
      return await ref.getDownloadURL()
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static async uploadVideos (
    loc:string,
    files:File[]
  ) {
    try {
      const uploaded = files
        .map(async file=>{
          const { ref } = await storage
            .ref()
            .child(loc)
            .put(file)
          return await ref.getDownloadURL()
        })
      return await Promise.all(uploaded)
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static async uploadVideo (
    loc:string,
    file:File
  ):Promise<string|null> {
    try {
        const { ref } = await storage
          .ref()
          .child(loc)
          .child(Date.now().toString())
          .put(file)
        return await ref
          .getDownloadURL()
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static async generateAndUploadThumbnail (
    path:string,
    file:File
  ) {
    const {duration} = await getMetadata(file);
    const start = duration/2
    const thumbnails = await getThumbnails(file, {
      start,
      end: start,
      quality: 0.6
    })
    const { blob } = thumbnails[0]
    const uri = blob && await this
      .uploadImage(path,blob)
    return uri
  }
}

