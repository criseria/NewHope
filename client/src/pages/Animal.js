import React, { useState, useEffect } from 'react';
import { fetcher } from '../utils/fetcher';
import '../pages/Animal.css';
import { Link } from 'react-router-dom';

function AnimalComponent() {
  const [combinedData, setCombinedData] = useState([]);
  const [filter, setFilter] = useState('all');
  const [dogCount, setDogCount] = useState(0);
  const [catCount, setCatCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const animalResponse = await fetcher('GET', '/animal/animal');
        const combinedData = animalResponse || [];

        // 각 필터에 해당하는 동물 수 세기
        const dogCount = combinedData.filter(animal => animal.SPCS._text === 'DOG').length;
        const catCount = combinedData.filter(animal => animal.SPCS._text === 'CAT').length;

        setDogCount(dogCount);
        setCatCount(catCount);
        setCombinedData(combinedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);



  return (
    <div className='body-container'>
      <h1>서울 동물복지센터 보호현황</h1>

      <div className='filter-button'>
        <button
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          전체 {combinedData.length}마리
        </button>
        <button
          className={filter === 'DOG' ? 'active' : ''}
          onClick={() => setFilter('DOG')}
        >
          강아지 {dogCount}마리
        </button>
        <button
          className={filter === 'CAT' ? 'active' : ''}
          onClick={() => setFilter('CAT')}
        >
          고양이 {catCount}마리
        </button>
      </div>

      <div className="animal-container">
        {combinedData
          .filter(animal => filter === 'all' || animal.SPCS._text === filter)
          .map(animal => (
            <div key={animal.ANIMAL_NO._text} className="animal-item">
              <Link to={`/animal/view?aniNo=${animal.ANIMAL_NO._text}&curPage=1`}>
                <div className="flag-area"></div>
                <div className="thumb">
                  {animal.PHOTOS && (
                    <img
                      src={`https://${animal.PHOTOS[0]}`}
                      alt={`${animal.NM._text} 이미지`}
                    />
                  )}
                </div>
                <div className="text">
                  <strong className="title">{animal.NM._text}</strong>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AnimalComponent;