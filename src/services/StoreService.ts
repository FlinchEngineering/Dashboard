export default class StoreService {
  
  static save (key:string,val:any) {
    localStorage.setItem(key,JSON.stringify(val))
  }

  static delete (key:string) {
    try {
      localStorage.removeItem(key)
      return true
    } catch (e) {
      console.log(e.message)
      return false
    }
  }

  static async get (key:string) {
    const val = await localStorage.getItem(key)
    return val && JSON.parse(val)
  }
  
}