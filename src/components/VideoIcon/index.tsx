import React from 'react'
import closeIcon from '../../assets/close.png'
import videoIcon from '../../assets/movie.png'
import './style.scss'

interface VideoIconProps {
  sample: File;
  removeVideo?:(val:string)=>void;
}

const VideoIcon: React.FC<VideoIconProps> = ({
  sample,
  removeVideo
}) => {
  return (
    <div
      className='video'>
      <span 
        onClick={()=>removeVideo&&
          removeVideo(sample.name)} 
        className='close' 
        role='button'>
        <img src={closeIcon} alt='close' />
      </span>
      <img className='vidIcon' src={videoIcon} alt='video icon'/>
      <p>{sample.name}</p>
    </div>
  )
}

export default VideoIcon
