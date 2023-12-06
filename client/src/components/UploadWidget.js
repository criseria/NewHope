import { useState, useEffect, useRef } from 'react'
import CenterImg from '../components/image/CenterImg'

const UploadWidget = ({ value, setValue }) => {
  const cloudinaryRef = useRef()
  const widgetRef = useRef()
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary
    widgetRef.current = cloudinaryRef.current.createUploadWidget({
      cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
      uploadPreset: process.env.REACT_APP_UPLOAD_PRESET
    }, function (error, result) {
      if (result.event === 'success') {
        setValue(result.info.secure_url)
      }
    })
  }, [])

  const onUpload = () => {
    widgetRef.current.open()
  }
  return (
    <div className={'image__upload-section'}>
      {value !== ""
        ?
        <CenterImg src={value} />
        :
        <div className='image__upload-message-wrap' onClick={onUpload}>
          <div className='image__upload-message'>
            <div className='image__upload-message-txt'>
              <p>이미지를 업로드해주세요.</p>
              <p>권장되는 이미지 비율은 1:1입니다.</p>
            </div>
          </div>
          <div className='image__upload-message-bg' />
        </div>
      }
      <button className={'image__upload-button'} type={'button'} onClick={onUpload}>
        썸네일 업로드
      </button>
    </div>
  )
}

export default UploadWidget
