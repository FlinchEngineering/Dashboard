import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'
import './style.scss';
import closeIcon from '../../assets/close.png'
import VideoIcon from '../VideoIcon';
import Button from '../Button';
import Link from '../Link';
import CelebsService from '../../services/CelebsService';
import { Sample } from '../../types';


interface ModalProps {
  celebId:string;
  title?: string;
  show?: boolean;
  files?: File[]|null;
  currentSamps?: Sample[]|null;
  uploadFileRef?: React.MutableRefObject<HTMLInputElement | null>;
  info?:string;
  addSample?: (e:React.ChangeEvent<HTMLInputElement>)=>void;
  close?: ()=>void;
  removeVid?: (v:string)=>void;
  onUpload?: ()=>void
}

const UploadModal: React.FC<ModalProps> = ({
  celebId,
  show,
  title,
  files,
  uploadFileRef,
  currentSamps,
  addSample,
  removeVid,
  onUpload,
  close
}) => {
  const [info, setInfo] = useState('')
  const [submitting, setSubmitting] = useState(false)
  useEffect(() => {
    if(show) {
      document.body.scrollTop = 0
      document.body.style.overflow ='hidden'
    } else {
      document.body.style.overflow='scroll'
    }
  }, [show])
  const hasFiles = files && (files.length > 0)
  const onSubmit = async () => {
    setSubmitting(true)
    console.log('Submitting files')
    setInfo('Submitting samples')
    const samples = files && await CelebsService
      .generateCelebSamples(files)
    console.log('Updating Samples')
    setInfo('Updating Celeb Samples')
    const hasRes = samples && samples.length > 0
    if (samples && hasRes) {
      const val = currentSamps
        ? [...samples,...currentSamps]
        : samples||[]
      console.log('Values:: ',val)
      await CelebsService
        .updateCeleb({
          id: celebId,
          samples:val
        })
    }
    console.log('Samples Updated')
    setInfo('Samples updated')
    setSubmitting(false)
  }
  return show 
  ? <div className='modal-container'>
      <div className='modal'>
        <span onClick={close} className='modalClose'>
          <img src={closeIcon} alt='close' />
        </span>
        <h3>{title}</h3>
        <div className='body'>
        <>
          <input
            ref={uploadFileRef}
            type='file'
            onChange={addSample}
            className='uploadFileInput'/>
          {hasFiles
            ? <div className='samplesUploadContainer'> 
              <div className='samples'>
                {files?.map(samp=>{
                  return <VideoIcon
                    sample={samp}
                    key={uuid()}
                    removeVideo={removeVid}
                  />
                })}
              </div>
              <Link 
                className='addSample' 
                onClick={onUpload}>
                +
              </Link>
            </div>
            :<div className='uploadSamps'>
              <Button 
                title='Upload Sample'
                onClick={onUpload}/>
            </div>}
          </>
        </div>
        {hasFiles&&
          <div className='footer'>
            <Button 
              onClick={onSubmit}
              loading={submitting}
              title='Submit' 
              />
              <span>
                {info}
              </span>
          </div>}
      </div>
    </div>
  : null
}

export default UploadModal
