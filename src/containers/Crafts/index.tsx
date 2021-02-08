import React, { useEffect, useState } from 'react'
import './style.scss'
import Input from '../../components/Input'
import Button from '../../components/Button'
import CraftsService from '../../services/CraftsService'
import ListItem from '../../components/ListItem'

const Crafts = () => {
  const [loading, setLoading] = useState(false)
  const [crafts, setCrafts] = useState<string[]>([])
  const [craft, setCraft] = useState<string|null>(null)
  const [info, setInfo] = useState('')
  useEffect(() => {
    fetchCrafts()
  }, [])
  const onDelete = async (craft:string) => {
    const isDeleted = await CraftsService
      .deleteCraft(craft)
    isDeleted&&setCrafts(crafts=>{
      return crafts.filter(c=>c!==craft)
    })
  }
  const onAddChange = (
    e:React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target
    setCraft(value)
  }
  const onAddCraft = async () => {
    const craftExists = craft && crafts
      .includes(craft)
    console.log('Craft exists',craftExists)
    const added = !craftExists &&
      craft &&
      await CraftsService
      .addCraft(craft)
    console.log('Craft Added', added)
    added && craft &&
    setCrafts(c=>{
      return [
        ...c,
        craft
      ]
    })
    added
    ? setInfo(`${craft} added.`)
    : setInfo('Failed to add craft.')
  }
  const fetchCrafts = async () => {
    setLoading(true)
    const data = await CraftsService
      .getCrafts()
    data && setCrafts(data)
    setLoading(false)
  }
  return (
    <div>
      <div className='craftsContainer'>
        <h1 className='header'>
          Crafts
        </h1>
        <div className='inputRow'>
          <Input
            placeholder='Add Craft'
            disabled={loading}
            onChange={onAddChange}
          />
          <Button
            className='sm'
            title='+ Add'
            disabled={loading}
            onClick={onAddCraft}
          />

        </div>
        <p>
          {info}
        </p>
        {loading&&'Loading...'}
        <div className='list'>
          {!loading&&
            crafts.map((craft,i)=>{
            return <ListItem 
              key={i}
              title={craft}
              id={i.toString()}
              shouldDelete
              onDelete={()=>onDelete(craft)}
            />
          })}
        </div>
      </div>
    </div>
  )
}

export default Crafts
