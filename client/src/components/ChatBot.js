import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ChatbotContainer = styled.div`
  max-width: 80%;
`;


const ModalContainer = styled.div`
  position: fixed;
  bottom: 20px; 
  right: 20px;
  padding: 20px;
  background: #fff;
  border: 1px solid #ccc;
  z-index: 998;
  max-width: 300px; 
  border: none;
  `;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 997;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 37px;
  right: 44px;
  background-color: transparent; 
  border: none;
  cursor: pointer;
  z-index: 9999;
`;

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    const steps = [
        {
            id: '0',
            message: '안녕하세요! NewHope를 방문해주셔서 감사합니다',
            trigger: '1',
        },
        {
            id: '1',
            message: '궁금하신 내용이나 도움이 필요한 내용이 있나요?',
            trigger: 'topicOptions',
        },
        {
            id: 'topicOptions',
            options: [
                { value: 'adopt', label: '유기동물', trigger: 'adoptInfo' },
                { value: 'volunteer', label: '수익금', trigger: 'volunteerInfo' },
                { value: 'another', label: '기타문의사항', trigger: 'volunteer-2-detail' },
                { value: 'other', label: '종료하기', trigger: 'out' },
            ],
        },
        {
            id: 'out',
            message: '이용해주셔서 감사합니다',
            end: true,
        },
        {
            id: 'adoptInfo',
            message: '유기동물 입양에 대한 정보를 얻고 싶으시군요!',
            trigger: 'adoptOptions',
        },
        {
            id: 'adoptOptions',
            options: [
                { value: 'animal-info', label: '유기동물 보호 현황', trigger: 'animal-info-detail' },
                { value: 'animal-procedure', label: '유기동물 입양 절차', trigger: 'adoptInfo' },
                { value: 'volunteer', label: '봉사활동 관련 정보', trigger: 'volunteerInfo' },
                { value: 'other', label: '다른 주제로 이동', trigger: '1' },
            ],
        },
        // 유기동물 보호 현황 관련 부분
        {
            id: 'animal-info-detail',
            message: '현재 유기동물 보호 현황이 궁금하시다면 다음 링크를 통해 이동해주세요! ',
            trigger: 'animal-info-link',
        },
        {
            id: 'animal-info-link',
            component: (
                <Link to="/animal">이동하기</Link>
            ),
            end: true,
        },
        //유기동물 입양 절차 관련 부분
        {
            id: 'adoptInfo',
            message: '유기동물 입양 절차가 궁금하시다면 다음 링크를 통해 이동해주세요! ',
            trigger: 'adoptInfo-link',
        },
        {
            id: 'adoptInfo-link',
            component: (
                <Link to="/animal">이동하기</Link>
            ),
            end: true,
        },
        // 봉사활동 관련 부분
        {
            id: 'volunteerInfo',
            message: '봉사활동에 관련해 어떠한 점이 궁금하신가요?',
            trigger: 'volunteerInfo-option',
        },
        {
            id: 'volunteerInfo-option',
            options: [
                { value: 'volunteer-1', label: '봉사활동 티켓 수익금', trigger: 'volunteer-1-detail' },
                { value: 'volunteer-2', label: '다른 문의사항', trigger: 'volunteer-2-detail' },
                { value: 'other', label: '다른 주제로 이동', trigger: '1' },
            ],
        },
        {
            id: 'volunteer-1-detail',
            message: '봉사활동 및 후원금에 대한 수익금은 사적으로 사용되지 않으며,\n봉사활동에 필요한 물품에 사용되고 있습니다. 혹시 추가적으로 궁금한 사항이 있으신가요?',
            trigger: 'more'
        },
        {
            id: 'more',
            options: [
                { value: 'other', label: '다른 주제로 이동', trigger: '1' },
                { value: 'out', label: '종료하기', trigger: 'out' },
            ]
        },
        {
            id: 'volunteer-2-detail',
            message: '다른 기타 문의 사항이 있으신 경우 NewHope@gmail.com 으로 문의 주세요!',
            end: true,
        }
    ];

    const chatBotStyle = {
        width: '125%', // 원하는 가로 넓이 설정
    };


    const theme = {
        background: '#f5f8fb',
        fontFamily: 'Helvetica Neue',
        headerBgColor: '#EF6C00',
        headerFontColor: '#fff',
        headerFontSize: '15px',
        botBubbleColor: '#F29F05',
        botFontColor: '#FFF',
        userBubbleColor: '#fff',
        userFontColor: '#4a4a4a',
    };

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <button
                onClick={handleOpen}
                style={{
                    border: 'none',         
                    background: 'none',    
                    fontSize: '60px',
                    position: 'fixed',  
                    bottom: '20px',         
                    right: '55px',    
                    cursor: 'pointer',      
                }}
            >
                <i className="material-icons" style={{ fontSize: '60px' }}>chat</i>
            </button>
            {isOpen && (
                <>
                    <ModalOverlay onClick={handleClose} />
                    <ModalContainer>
                        <ChatbotContainer>
                            <div className="chatbot-modal">
                                <CloseButton onClick={handleClose}><i className="material-icons">cancel_presentation</i></CloseButton>
                                <ThemeProvider theme={theme}>
                                    <ChatBot
                                        steps={steps}
                                        placeholder={'채팅이 불가능한 채널입니다.'}
                                        style={chatBotStyle}
                                    />
                                </ThemeProvider>
                            </div>
                        </ChatbotContainer>
                    </ModalContainer>
                </>
            )}
        </>
    );
};

export default Chatbot;