import React, { useEffect, useState } from 'react'
import './style.scss'
import Input from '../../components/Input'
import Button from '../../components/Button'
import CraftsService from '../../services/CraftsService'
import ListItem from '../../components/ListItem'

const Crafts = () => {
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
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
    setSubmitting(true)
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
    setSubmitting(false)
  }
  const fetchCrafts = async () => {
    setLoading(true)
    const data = await CraftsService
      .getCrafts()
    data && setCrafts(data)
    setLoading(false)
  }
  return (
    <div className='rootContainer'>
      <div className='offset' />
      <div className='craftsContainer'>
        <div className='top'>
          <h1>Crafts</h1>
          <div className='inputRow'>
            <Input
              className='addInput inputElement'
              placeholder='Add Craft'
              disabled={loading}
              onChange={onAddChange}
            />
            <Button
              className='sm addBtn'
              title='+ Add'
              disabled={loading||submitting}
              loading={loading||submitting}
              onClick={onAddCraft}
            />
          </div>
        </div>
        <p>
          {info}
        </p>
        {loading&&'Loading...'}

        <div className='list'>
          {!loading&&
          <div>
            <div className='crafts'>
              {crafts.map((craft,i)=>{
                return <ListItem 
                  key={i}
                  title={craft}
                  id={i.toString()}
                  shouldDelete
                  onDelete={()=>onDelete(craft)}
                />
              })}
            </div>
          </div>}
        </div>
      </div>
      <div className='offset' />
    </div>
  )
}

export default Crafts
