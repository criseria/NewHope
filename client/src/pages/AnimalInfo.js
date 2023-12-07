import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetcher } from '../utils/fetcher';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../pages/AnimalInfo.css'
import Footer from '../components/Footer';

const AnimalInfo = () => {
  const location = useLocation();
  const aniNo = new URLSearchParams(location.search).get('aniNo');

  const [animalInfo, setAnimalInfo] = useState(null);

  useEffect(() => {
    const fetchAnimalInfo = async () => {
      try {
        const data = await fetcher('GET', `/animal/animalInfo/${aniNo}`);
        setAnimalInfo(data);
      } catch (error) {
        console.error('동물 정보 가져오기 에러:', error);
      }
    };

    if (aniNo) {
      fetchAnimalInfo();
    }
  }, [aniNo]);

  if (!aniNo) {
    return <div>No animal selected.</div>;
  }

  if (!animalInfo) {
    return <div>Loading...</div>;
  }

  // 슬라이더 설정
  const sliderSettings = {
    dots: true,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'custom-slider',
  };

  return (
    <div>
      <div className="animal-info-container">
        <div className="slider-container">
          <Slider {...sliderSettings}>
            {animalInfo.PHOTOS.map((photo, index) => (
              <div key={index}>
                <img src={`https://${photo}`} alt={`Animal Photo ${index + 1}`} />
              </div>
            ))}
          </Slider>
        </div>
        <div className="details-container">
          <h3 className='animal-name'>{animalInfo.NM._text}</h3>
          <p></p>
          <div className='animal-info-manage'>
            <dl>
              <dt>입소날짜</dt>
              <dd>{animalInfo.ENTRNC_DATE._text}</dd>
            </dl>
          </div>
          <table>
            <tbody>
              <tr>
                <th>품종</th>
                <td>{animalInfo.BREEDS._text}</td>
              </tr>
              <tr>
                <th>성별</th>
                <td>{animalInfo.SEXDSTN._text}</td>
              </tr>
              <tr>
                <th>나이</th>
                <td>{animalInfo.AGE._text}</td>
              </tr>
              <tr>
                <th>체중</th>
                <td>{animalInfo.BDWGH._text}(Kg)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="additional-info-container">
        <div className="introduction" dangerouslySetInnerHTML={{ __html: animalInfo.INTRCN_CN._text }} />
        <div className="video-url">
          <ReactPlayer url={animalInfo.INTRCN_MVP_URL._text} controls={true} width="500px" height="300px" />
        </div>
      </div>
      <div className='animal-concern'>
        서울동물복지지원센터내의 입양대기동물들은 입양 전 교육 이수 후 첫만남이 가능합니다.
        나이는 추정나이로써 실제 나이와 일치하지 않을 수 있으며, 성격 또한 입양 후 생활패턴이나 환경, 시간 등 변화에 따라 달라질 수 있으니 충분히 고려해보신 후 입양신청 해주세요.
      </div>
      <div className='button-container'>

        <button className='button'>입양절차안내</button>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default AnimalInfo;