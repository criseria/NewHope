import React, { useState, useEffect } from 'react';
import { fetcher } from '../utils/fetcher';
import '../pages/Animal.css';
import { Link } from 'react-router-dom';

function AnimalComponent() {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const animalResponse = await fetcher('GET', '/animal/animal');
        const combinedData = animalResponse || [];

        setCombinedData(combinedData);
        } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>서울 동물복지센터</h1>
      <div className="animal-container">
        {combinedData.map(animal => (
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