import React, { useEffect, useRef, useState } from 'react'
import './style.scss'

interface AvatarProps {
  img: File|null;
  setImage: (val:any)=>void;
}

export const Avatar: React.FC<AvatarProps> = ({
  setImage,
  img
}) => {
  const [url, setUrl] = useState<string|null>(null)
  useEffect(() => {
    if (img) {
      const uri = URL.createObjectURL(img)
      setUrl(uri)
    }
  }, [img])
  const fileRef = useRef<HTMLInputElement>(null)
  const onClick = () => {
    if (fileRef.current) {
      fileRef.current.click()
    }
  }
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    files && setImage(files[0])
  }
  return (
    <>
      <input onChange={onChange} ref={fileRef} type='file' className='img-selector' />
      <div 
        role='button' 
        className='avatar'
        onClick={onClick}
      >
        +
        {url&&<img
          src={url}
          alt='dp'
          className='dp'
        />}
      </div>
    </>
  )
}
