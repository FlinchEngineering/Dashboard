import React, { useRef, useState } from 'react'
import { Celeb } from '../../types'
import IconButton from '../IconButton'
import './style.scss'
import { v4 as uuid } from 'uuid'
import Link from '../Link'
import UploadModal from '../UploadModal'

interface ListItemProps {
  id: string;
  title: string;
  showData?: boolean;
  data?: Celeb;
  edit?: boolean;
  shouldDelete?: boolean;
  onDelete?: ()=>Promise<void>;
  onEdit?: ()=>void;
}
type keys = keyof Celeb
const ListItem: React.FC<
  ListItemProps
> = ({
  title,
  shouldDelete,
  edit,
  data,
  showData,
  onDelete
}) => {
  const [deleteLoader, setDeleteLoader] = useState(false)
  const [view, setView] = useState(false)
  const [editting, setEditting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [info, setInfo] = useState('')
  const [files, setFiles] = useState<File[]|null>(null)
  let uploadFileRef = useRef<HTMLInputElement|null>(null)
  const clicked = view ? 'active' : ''
  const { 
    samples
  } = data || {
    samples:null
  }
  const onView = () => {
    setView(!view)
  }
  const onEditting = () => {
    setView(true)
    setEditting(!editting)
  }
  const onAddSample = () => {
    setShowModal(true)
  }  
  const onUpload = () => {
    uploadFileRef.current &&
      uploadFileRef.current.click()
  }
  const remove = async () => {
    setDeleteLoader(true)
    onDelete&& await onDelete()
    setDeleteLoader(false)
  }
  const reset = () => {
    const dt = new DataTransfer()
    setFiles(null)
    if (uploadFileRef.current) {
      uploadFileRef.current.files = dt.files
    }
  }
  const removeVid = (name:string) => {
    console.log(name)
    setFiles(s=>{
      const samps = s?.filter(d=>d.name!==name)
      return samps||[]
    })
    if (uploadFileRef.current) {
      const dt = new DataTransfer()
      let { files } = uploadFileRef.current
      const list = files && Array.from(files)
      list?.forEach(item=>{
        if (item.name!==name) dt.items.add(item)
      })
      uploadFileRef.current.files = dt.files
    }
  }
  const closeModal = () => {
    setShowModal(false)
    reset()
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
    console.log(list)
    if (list&&list?.length>0) {
      setFiles(s=>{
        if(!s) {
          return [...list]
        } else return ([...s,...list])
      })
    }
  }
  const renderData = () => {
    const keys = data&&Object
      .keys(data)
      .sort()
    return <>
      {keys?.map((k)=>{
        const v = data && data[k as keys]
        if (
          k==='id'||
          k==='image'||
          k==='token' ||
          k==='alias' ||
          !!!v
        ) return null
        const isImage = k==='imageUrl'
        const isSamples = k === 'samples'
        const hasSamples = samples && samples?.length>0
        const val = k==='price'
          ? `${(v as any).currency}${(v as any).amount}`
          : v
        return <div 
          className='dataItem' 
          key={uuid()}>
            <h4>{k}</h4>
            {!isImage&&
              !isSamples &&
              <p>{val}</p>}
            {isImage&&
              !isSamples &&
              <img
                className='celebDp'
                src={val as any}
                height={50}
                width={50}
                alt={data?.alias}
              />}
            {isSamples &&
              <div className='samplesContainer'>
                {samples?.map(sample=>(
                  <div key={uuid()}>
                    <span className='vidContainer'>
                      <img
                        className='vidImg'
                        alt={sample.uri}
                        src={sample.thumbnail}
                      />
                    </span>
                  </div>
                ))}
                {isSamples&&
                <Link onClick={onAddSample}>
                  +Add Sample
                </Link>}
              </div>}
          </div>
        })}
    </>
  }
  return (
    <>
      <div 
        className={`listContainer ${clicked}`}
        role='button'
        onClick={onView}
        >
        <div
          className='listTitle'>
          {title}
        </div>
        <div className='btns'>
          {edit&&<IconButton
            onClick={onEditting}
            className='info'
            icon={<i className="fas fa-pencil-alt"/>}
          />}
          {shouldDelete&&<IconButton
            onClick={remove}
            loading={deleteLoader}
            className='danger'
            icon={<i className="far fa-trash-alt"/>}
          />}
        </div>
      </div>
      {showData&&view&&<div
        className='dataInfo'
      >
        {renderData()}
      </div>}
      <UploadModal
        celebId={data?.id||''}
        currentSamps={samples&&samples}
        show={showModal}
        files={files}
        addSample={addSample}
        close={closeModal}
        onUpload={onUpload}
        removeVid={removeVid}
        title='Add Sample'
        uploadFileRef={uploadFileRef}
      />
    </>
  )
}

export default ListItem
