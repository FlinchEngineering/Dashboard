import { db } from "../config/firebase";

export default class ScriptService {
  static celebRef = db.collection('celebs')
  static async updatePriceFields () {
    try {
      const data = await this.celebRef
        .where('price','>',0)
        .get()
      const response = data.docs.map(async doc=>{
        const {id} = doc
        const d = doc.data()
        const price = d.price
        await this.celebRef.doc(id).set({
          ...d,
          price: {
            amount: price,
            currency: 'GHS'
          }
        })
        return true
      })
      return Promise.all(response)
    } catch (e) {
      console.log(e.message)
      alert('failed')
      return null
    }
  }
}