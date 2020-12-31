import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import Input from '../../Input'
import { TextArea } from '../../TextArea'
import Button from '../../Button'
import { Avatar } from '../../Avatar'
import UserService from '../../../services/UserService'
import Link from '../../Link'
import { Currency, User } from '../../../types'
import videoIcon from '../../../assets/movie.png'
import closeIcon from '../../../assets/close.png'
import { useDispatch } from 'react-redux'
import { modalActions } from '../../../store/modal'

const CLEAR_INTERVAL = 10000
const INIT_FORM: Omit<User,'celebrity'|'image'> = {
  alias:'',
  craft:'',
  price:{
    currency:'GHS',
    amount:''
  },
  popularity:3,
  bio:'',
  email: '',
  imageUrl: '',
}

function Home() {
  const dispatch = useDispatch()
  const [submitting, setSubmitting] = useState(false)
  const [image, setImage] = useState<File|null>(null)
  const [form, setForm] = useState(INIT_FORM)
  const [currency, setCurrency] = useState<Currency>('GHS')
  const [info, setInfo] = useState('')
  const sampleRef = useRef<HTMLInputElement>(null)
  const [samples, setSamples] = useState<File[]|null>(null)
  const hasSamples = samples&&samples?.length > 0
  useEffect(() => {
    const timer = !!info && window.setTimeout(() => {
      setInfo('')
    }, CLEAR_INTERVAL);
    return () => {
      timer && 
      clearTimeout(timer)
    }
  }, [info])
  const onChange = (key: keyof typeof INIT_FORM, val:any) => {
    if (key==='price') {
      return setForm(form=>(
        {
          ...form, 
          [key]: {...form[key], 
          ...{
            amount: val,
            currency
          }
        }
      }))
    }
    setForm(form=>({...form, [key]:val}))
  }
  const onCreate = async () => {
    setSubmitting(true)
    dispatch(modalActions.showModal({
      body: 'Creating Celeb...',
      header: 'Creating',
      show: true
    }))
    const isValid = validateInputs()
    if (isValid) {
      if (!image) {
        setSubmitting(false)
        return setInfo("Please upload an image. Click on the avatar above.")
      }
      const res = image && await UserService.createCeleb({
        ...INIT_FORM,
        ...form,
        image,
      },
        samples||undefined
      )
      if (res) {
        setInfo('User Created.')
        setForm(INIT_FORM)
      } else {
        setInfo('Failed to create User.')
      }
    } else {
      setInfo('Please make sure you have entered the right details')
    }
    setSubmitting(false)
  }
  const removeVideo = (name:string) => {
    setSamples(s=>{
      const samps = s?.filter(d=>d.name!==name)
      return samps||[]
    })
  }
  const validateInputs = () => {
    const data = Object.values(form)
    const msgs = data.filter(d=>((!!d)===false))
    return msgs.length === 1
  }
  const getVal = (key:keyof typeof INIT_FORM) => {
    if (key === 'price') {
      return form[key]?.amount
    } else return form[key]
  }
  const getCurrency = (val:Currency) => {
    setCurrency(val)
    setForm(d=>({...d,price:{...d.price,currency:val}}))
  }
  const uploadSamples = () => {
    sampleRef.current &&
    sampleRef.current.click()
  } 
  const validateFiles = (files:FileList) => {
    let list = files && Array.from(files)
    list = list.filter(v=>{
      if (v.type.indexOf('video') > -1){
        return true
      }
      setInfo('Only videos are allowed')
      return false
    })
    return list
  }
  const addSample = (e:React.ChangeEvent<HTMLInputElement>) => {
    let {files} = e.target
    const list = files && validateFiles(files)
    if (list&&list?.length>0) {
      setSamples(s=>{
        if(!s) {
          return [...list]
        } else return ([...s,...list])
      })
    }
  }
  const renderSamples = () => {
    return(
      <>
        <div className='samples'>
          {samples&&samples.map((sample)=>{
            return <div className='video'>
              <span 
                onClick={()=>removeVideo(sample.name)} 
                className='close' 
                role='button'>
                <img src={closeIcon} alt='close' />
              </span>
              <img className='vidIcon' src={videoIcon} alt='video icon'/>
              <p>{sample.name}</p>
            </div>
          })}
        </div>
        <Link className='add' onClick={uploadSamples}>
          +
        </Link>
      </>
    )
  }
  return (
    <div>
      <div className='home-container'>
        <div className='offset' />
        <div className='content'>
          <h1>Create Celebrity</h1>
          <Avatar setImage={setImage} img={image}/>
          <div className='inputs'>
            <Input
              placeholder='Alias'
              onChange={({target})=>onChange('alias',target.value)}
              value={getVal('alias')}
            />
            <Input
              placeholder='Email'
              value={getVal('email')}
              onChange={({target})=>onChange('email',target.value)}
            />
            <Input
              placeholder='Craft'
              value={getVal('craft')}
              onChange={({target})=>onChange('craft',target.value)}
            />
            <Input
              placeholder='Price'
              onChange={({target})=>onChange('price',target.value)}
              value={getVal('price')}
              type='number'
              mode='currency'
              setCurrency={getCurrency}
            />
            <Input
              placeholder='Popularity'
              onChange={({target})=>onChange('popularity',target.value)}
              type='number'
              value={getVal('popularity')}
              max={5}
              min={1}
            />
            <TextArea
              placeholder='Bio'
              onChange={({target})=>onChange('bio',target.value)}
              value={getVal('bio')}
            />
            <div className='extra'>
              <input
                onChange={addSample}
                className='sample' 
                ref={sampleRef} 
                type='file'/>
              {hasSamples
              ? renderSamples()
              :<Link onClick={uploadSamples}>
                + Upload video Sample
              </Link>}
            </div>
            <Button
              title='Create'
              onClick={onCreate}
              disabled={submitting}
            />
            <br/>
            {info}
          </div>
        </div>
        <div className='offset' />
      </div>
    </div>
  )
}

export default Home
