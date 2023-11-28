import React, { useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);

    const steps = [
        {
            id: '1',
            message: 'What number I am thinking?',
            trigger: '2',
        },
        {
            id: '2',
            options: [
                { value: 1, label: 'Number 1', trigger: '4' },
                { value: 2, label: 'Number 2', trigger: '3' },
                { value: 3, label: 'Number 3', trigger: '3' },
            ],
        },
        {
            id: '3',
            message: 'Wrong answer, try again.',
            trigger: '2',
        },
        {
            id: '4',
            message: 'Awesome! You are a telepath!',
            end: true,
        },
    ]

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
            <button onClick={handleOpen}>챗봇 열기</button>
            {isOpen && (
                <div className="chatbot-modal">
                    <button onClick={handleClose}>닫기</button>
                    <ThemeProvider theme={theme}>
                        <ChatBot
                            steps={steps}
                            placeholder={'채팅이 불가능한 채널입니다.'}
                        />
                    </ThemeProvider>
                </div>
            )}
        </>
    );
};

export default Chatbot;