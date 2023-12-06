import './centerimg.css'

const CenterImg = ({ src, alt, padding = '100' }) => {
  return (
    <div className='center__img-wrap'>
      <img src={src} alt={alt} />
      <div className='center__img-padding' style={{ paddingBottom: `${padding}%` }} />
    </div>
  )
}

export default CenterImg
