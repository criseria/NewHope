import React, { useEffect, useState } from 'react';
import { MarkerData } from './MarkerData';

const { kakao } = window;



export default function MapTest() {

    const [InputText, setInputText] = useState('')
    const [Place, setPlace] = useState('')

    const onChange = (e) => {
      setInputText(e.target.value)
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      setPlace(InputText)
      setInputText('')
    }

    
    useEffect(() => {
        mapscript();
      }, []);
    
      const mapscript = () => {
        let container = document.getElementById("map");
        let options = {
          center: new kakao.maps.LatLng(37.528650, 126.965284),
          level: 8,
        };
    
        //map
        const map = new kakao.maps.Map(container, options);

    MarkerData.forEach((el) => {
        // 마커를 생성합니다
        new kakao.maps.Marker({
          //마커가 표시 될 지도
          map: map,
          //마커가 표시 될 위치
          position: new kakao.maps.LatLng(el.lat, el.lng),
          //마커에 hover시 나타날 title
          title: el.title,
        });
    });
};
      

    return <div id="map" style={{ width: "100vw", height: "50vh" }}>
        
    </div>;
}
