import React, { useEffect, useState } from 'react'
import ListItem from '../../components/ListItem'
import CelebsService from '../../services/CelebsService'
import { Celeb } from '../../types'
import './style.scss'

const Celebs = () => {
  const [celebs, setCelebs] = useState<Celeb[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getCelebs()
  }, [])
  const getCelebs = async () => {
    setLoading(true)
    const data = await CelebsService.getAllCelebs()
    data && setCelebs(data)
    setLoading(false)
  }
  const onDelete = async (id:string) => {
    console.log('deleting')
    // TODO: CHANGE DELETE SERVICE TO ONLY DELETE 
    // FROM DELETE COLLECTION
    // WITH CelebsService.deleteCeleb()
    const res = await CelebsService.deleteCelebUser(id)
    console.log('deleted:: ',res)
    res && setCelebs(c=>{
      return c.filter(d=>d.id!==id)
    })
  }
  return loading 
    ? (
      <div>
        Loading.....
      </div>
    )
    : <div className='celebsContainer'>
      <div className='offset' />
      {celebs.map((celeb,i)=>(
        <ListItem 
          key={i}
          id={celeb.id||''}
          title={celeb.alias}
          shouldDelete
          onDelete={()=>onDelete(celeb.id||'')}
          data={celeb}
          showData
        />
      ))}
    </div>
}

export default Celebs
