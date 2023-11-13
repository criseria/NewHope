import './centerimg.css'

const CenterImg = ({ src, alt }) => {
  return (
    <div className='center__img-wrap'>
      <img src={src} alt={alt} />
      <div className='center__img-padding' />
    </div>
  )
}

export default CenterImg
