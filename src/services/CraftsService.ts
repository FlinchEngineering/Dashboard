import { db } from "../config/firebase";

export default class CraftsService {
  static CraftsRef = db.collection('crafts')
  static async getCrafts () {
    try {
      const res = await this.CraftsRef
        .doc('crafts')
        .get()
      return (res.data() as any)
        .list
    } catch (e) {
      console.log(e.message)
      return null
    }
  }

  static async deleteCraft (craft:string) {
    try {
      let deleted = false
      const CraftDocRef = this.CraftsRef
        .doc('crafts')
      await db.runTransaction(async transaction=>{
        const res = await transaction.get(CraftDocRef)
        const data:string[] = res.exists &&
          (res.data() as any).list
        const updated = data && 
          data.filter(d=>d!==craft)
        transaction.set(CraftDocRef,{
          list: updated
        })
        deleted = true
      })
      return deleted
    } catch (e) {
      console.log(e.message)
      return false
    }
  }

  static async addCraft (craft:string) {
    try {
      let added = false
      const CraftDocRef = this.CraftsRef
        .doc('crafts')
      await db.runTransaction(async transaction=>{
        const res = await transaction
          .get(CraftDocRef)
        const data:string[] = res.exists && 
          (res.data() as any).list
        data && transaction
          .set(CraftDocRef,{
            list: [...data,craft]
          })
        added = true
      })
      return added
    } catch (e) {
      console.log(e.message)
      return false
    }
  }
}