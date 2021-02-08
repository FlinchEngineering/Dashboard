import React, { useState } from 'react'
import { Celeb } from '../../types'
import IconButton from '../IconButton'
import './style.scss'
import { v4 as uuid } from 'uuid'

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
  const { 
    samples
  } = data || {
    samples:null
  }
  const onView = () => {
    setView(true)
  }
  const onEditting = () => {
    setView(true)
    setEditting(!editting)
  }
  const remove = async () => {
    setDeleteLoader(true)
    onDelete&& await onDelete()
    setDeleteLoader(false)
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
            {!isSamples&&<h4>{k}</h4>}
            {isSamples&&hasSamples&&<h4>{k}</h4>}
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
              hasSamples &&
              <div>
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
              </div>}
          </div>
        })}
    </>
  }
  return (
    <>
      <div 
        className='listContainer'
        role='button'
        >
        <div 
          onClick={onView}
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
    </>
  )
}

export default ListItem
