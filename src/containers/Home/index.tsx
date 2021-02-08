import React, { useEffect, useRef, useState } from 'react'
import './style.scss'
import { Celeb, Currency } from '../../types'
import videoIcon from '../../assets/movie.png'
import closeIcon from '../../assets/close.png'
import { useDispatch } from 'react-redux'
import { modalActions } from '../../store/modal'
import Link from '../../components/Link'
import Avatar from '../../components/Avatar'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { TextArea } from '../../components/TextArea'
import CelebsService from '../../services/CelebsService'
import CraftsService from '../../services/CraftsService'
import InputOptions from '../../components/InputOptions'

const CLEAR_INTERVAL = 25000
const INIT_FORM: Partial<Celeb> = {
  alias:'',
  craft:'',
  price:{
    currency:'GHS',
    amount:0
  },
  popularity:3,
  bio:'',
  email: ''
}

function Home() {
  const dispatch = useDispatch()
  const [submitting, setSubmitting] = useState(false)
  const [image, setImage] = useState<File|null>(null)
  const [crafts, setCrafts] = useState<string[]>([])
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
  useEffect(() => {
    !!info && dispatch(modalActions.showModal({
      body:info,
      header:'',
      show: true
    }))
  }, [info,dispatch])
  useEffect(() => {
    fetchCrafts()
  }, [])

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
      body: 'Creating Celebrity...',
      header: 'Creating',
      show: true
    }))
    console.log('IMAGE: ',image)
    if (!!!image) {
      setSubmitting(false)
      return setInfo("Please upload an image. Click on the avatar above.")
    }
    console.log(form)
    const isValid = validateInputs()
    console.log(isValid)
    if (isValid) {
      const res = image && 
        await CelebsService
          .createCeleb({
            ...INIT_FORM,
            ...form,
            image,
          },
            samples||undefined
          )
      if (res) {
        setInfo('User Created.')
        setForm(INIT_FORM)
        setSamples(null)
        setImage(null)
      } else {
        setInfo('Failed to create User.')
      }
    } else {
      setInfo('Please make sure you have entered the right details')
    }
    setSubmitting(false)
  }
  const fetchCrafts = async () => {
    const data = await CraftsService
      .getCrafts()
    data && setCrafts(data)

  }
  const removeVideo = (name:string) => {
    setSamples(s=>{
      const samps = s?.filter(d=>d.name!==name)
      return samps||[]
    })
  }
  const validateInputs = () => {
    const data = Object.values(form)
    const msgs = data.filter(d=>!!!d)
    console.log(msgs.length)
    console.log(data)
    return msgs.length < 6
  }
  const getVal = (key:keyof typeof INIT_FORM) => {
    if (key === 'price') {
      return form[key]?.amount
    } else if (key==='image'||key==='samples') {
      return ''
    } else return form[key]
  }
  const getCurrency = (val:Currency) => {
    setCurrency(val)
    setForm(d=>({
      ...d,
      price:{
        ...d.price,
        currency:val
      }
    }))
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
          {samples&&samples.map((sample,i)=>{
            return <div 
              key={i} 
              className='video'>
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
            <InputOptions
              options={crafts}
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
                + Upload video Sample(s)
              </Link>}
            </div>
            <Button
              title='Create'
              onClick={onCreate}
              disabled={submitting}
            />
            <br/>
          </div>
        </div>
        <div className='offset' />
      </div>
    </div>
  )
}

export default Home
