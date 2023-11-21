import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetcher } from '../utils/fetcher';
import ReactPlayer from 'react-player';

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

  // 여기서 animalInfo를 사용하여 상세 정보를 표시합니다.
  return (
    <div>
      <h1>서울 동물복지센터</h1>
      <table>
        <thead>
          <tr>
            <th>동물번호</th>
            <th>이름</th>
            <th>입소날짜</th>
            <th>종</th>
            <th>품종</th>
            <th>성별</th>
            <th>나이</th>
            <th>체중</th>
            <th>입양상태</th>
            <th>임시보호상태</th>
            <th>소개동영상URL</th>
            <th>소개내용</th>
            <th>임시보호내용</th>
          </tr>
        </thead>
        <tbody>
          <tr key={animalInfo.ANIMAL_NO._text}>
            <td>{animalInfo.ANIMAL_NO._text}</td>
            <td>{animalInfo.NM._text}</td>
            <td>{animalInfo.ENTRNC_DATE._text}</td>
            <td>{animalInfo.SPCS._text}</td>
            <td>{animalInfo.BREEDS._text}</td>
            <td>{animalInfo.SEXDSTN._text}</td>
            <td>{animalInfo.AGE._text}</td>
            <td>{animalInfo.BDWGH._text}</td>
            <td>{animalInfo.ADP_STTUS._text}</td>
            <td>{animalInfo.TMPR_PRTC_STTUS._text}</td>
            <td><ReactPlayer url={animalInfo.INTRCN_MVP_URL._text} controls={true} width="400px" height="300px"></ReactPlayer></td>
            <td dangerouslySetInnerHTML={{ __html: animalInfo.INTRCN_CN._text }} />
            <td>{animalInfo.TMPR_PRTC_CN._text}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AnimalInfo;