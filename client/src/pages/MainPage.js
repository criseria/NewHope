import React, { useState, useEffect } from "react";
import './MainPage.css';
import Footer from "../components/Footer";
import Chatbot from "../components/ChatBot";

const images = [
  'image/mainimg1.jpg',
  'image/mainimg2.jpg',
  'image/mainimg3.jpg',
];

const MainPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSection, setSelectedSection] = useState(null); // 추가된 부분


  const [isAdoptionVisible, setIsAdoptionVisible] = useState(false);
  const [isFamContentVisible, setIsFamContentVisible] = useState(false);
  const [isFaqVisible, setIsFaqVisible] = useState(false);
  const [isDetailViewVisible, setIsDetailViewVisible] = useState(false); // New state

  
  useEffect(() => {
    const handleScroll = () => {
      const adoptionProcess = document.querySelector(".adoption-process");
      const famContent = document.querySelector(".fam-content");
      const faqContent = document.querySelector(".faq-content");

      const adoptionPosition = adoptionProcess.offsetTop;
      const famContentPosition = famContent.offsetTop;
      const faqContentPosition = faqContent.offsetTop;

      const scrollPosition = window.scrollY;

      setIsAdoptionVisible(scrollPosition > adoptionPosition - window.innerHeight + 100);
      setIsFamContentVisible(scrollPosition > famContentPosition - window.innerHeight + 100);
      setIsFaqVisible(scrollPosition > faqContentPosition - window.innerHeight + 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleSeeDetails = () => {
    setIsDetailViewVisible(!isDetailViewVisible);
  };

  const handleSectionClick = (index) => {
    setSelectedSection(index === selectedSection ? null : index);
  };

  const handleOutsideClick = (event) => {
    // 클릭된 엘리먼트가 섹션 영역에 속하지 않으면 섹션을 닫음
    if (!event.target.closest(".faq-content")) {
      setSelectedSection(null);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [currentIndex]);
  return (
    <>
      {/* 메인 사진 */}
      <div className="mainpage-container">
        <button onClick={prevSlide} className="arrow-button left">
          {'<'}
        </button>
        <div className="carousel-wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {images.map((image, index) => (
            <img
              key={index}
              src={process.env.PUBLIC_URL + image}
              alt={`Slide ${index + 1}`}
              className="carousel-image"
            />
          ))}
        </div>
        <button onClick={nextSlide} className="arrow-button right">
          {'>'}
        </button>
      </div><br /><br /><br /><br /><br /><br /><br />


      {/* 입양 절차 */}
      <div className={`adoption-process ${isAdoptionVisible ? "visible" : ""}`}>
        <ul>
          <h2>입양 절차 안내</h2><br/><br/>
          <ul>
            <div>
              <h5>1. 입양 전 확인</h5>
              <h6> 홈페이지에서 '입양 대기 동물'을 확인합니다.</h6>
              <br/><br/>
              <h5>2. 입양 상담 예약</h5>
              <h6> 방문 전 유선으로 일정 예약을 해주시고 센터로 방문하여 주세요.</h6>
              <br/><br/>
              <h5>3. 입양 진행</h5>
              <h6> 입양은 1~2회 입양 상담 및 개체 만남을 통해 진행됩니다.</h6>
              <h6> (입양 후 파양은 불가합니다. 만남을 통해 신중하게 결정해주세요.)</h6>
              <br/><br/>
              <h5>4. 입양 후기 공유</h5>
              <h6> 보호자님과 입양된 반려견, 반려묘의 행복한 일상을 주기적으로 올려주세요.</h6>
              <h6> 입양 대기 중인 아이들의 입양과 인식 개선에 많은 도움이 됩니다.</h6>
              <br/><br/>
            </div>
          </ul>
        </ul>
      </div><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

      {/* 가족이 되어주기 */}
      <div className={`fam-content ${isFamContentVisible ? "visible" : ""}`}>
        <h2 style={{fontWeight: "normal"}}>가족이 되어주세요.</h2>
        <h2>사지말고 입양하세요.</h2>

        <button className="ellipse-button" onClick={handleSeeDetails}>
          <a href="/animal" style={{color:'white'}}>자세히 보기</a>
        </button>
      </div>
      
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />



      {/* FAQ */}
      
      <div className={`faq-content ${isFaqVisible ? "visible" : ""}`}>
      <h2>FAQ</h2><br/><br/>
        <AccordionSection
          index={0}
          selectedSection={selectedSection}
          onClick={handleSectionClick}
          question="한 마리에게 여러 명의 입양 희망자가 생길 경우 어떻게 하나요?"
          answer="센터 관리자들이 회의를 거쳐 선정하게 됩니다. 선택이 안 되더라도 양해해 주시기 바랍니다."
        />

        <AccordionSection
          index={1}
          selectedSection={selectedSection}
          onClick={handleSectionClick}
          question="입양을 진행하면서 필요한 필수 용품은 뭐가 있나요?"
          answer="안전문, 방묘창, 리드줄, 하네스, 사료, 식기, 패드 등등. 필요 물품들을 준비하여 편안한 가정환경을 만들어주시기 바랍니다."
        />

        <AccordionSection
          index={2}
          selectedSection={selectedSection}
          onClick={handleSectionClick}
          question="입양 후 파양은 가능한가요?"
          answer="입양 후 파양은 불가합니다. 가족 구성원 모두가 신중하게 생각하시고 입양을 결정해주세요."
        />
      </div><br/><br/><br /><br /><br /><br /><br />

     <Footer></Footer>
     <Chatbot></Chatbot>
    </>
  );
};

const AccordionSection = ({ index, selectedSection, onClick, question, answer }) => {
  const isOpen = index === selectedSection;

  return (
    <div className={`accordion-section ${isOpen ? 'open' : ''}`} onClick={() => onClick(index)}>
      <h3>{question}</h3>
      {isOpen && <p>{answer}</p>}
    </div>
  );
};

export default MainPage;
