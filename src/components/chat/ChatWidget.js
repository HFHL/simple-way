import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { systemPrompt, callChatApi } from '../../api/chatApi';

// 聊天气泡组件样式
const ChatBubble = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
`;

const ChatBubbleButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #333;
  color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: #444;
  }
`;

const ChatBubbleIcon = styled.span`
  font-size: 1.5rem;
`;

// 聊天容器样式
const ChatContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 350px;
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1000;
  
  @media (max-width: 480px) {
    width: calc(100% - 2rem);
    height: 60vh;
    right: 1rem;
    bottom: 1rem;
  }
`;

const ChatHeader = styled.div`
  padding: 1rem;
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CloseChat = styled.button`
  background: none;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
  
  &:hover {
    color: #ccc;
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  max-width: 80%;
  padding: 0.8rem 1rem;
  border-radius: 1rem;
  word-wrap: break-word;
  
  &.user {
    background-color: #f0f0f0;
    color: #333;
    align-self: flex-end;
    border-bottom-right-radius: 0.2rem;
  }
  
  &.system {
    background-color: #333;
    color: #fff;
    align-self: flex-start;
    border-bottom-left-radius: 0.2rem;
  }
`;

const ChatInput = styled.div`
  display: flex;
  padding: 1rem;
  border-top: 1px solid #eee;
  
  input {
    flex: 1;
    padding: 0.8rem 1rem;
    border: 1px solid #ddd;
    border-radius: 2rem;
    outline: none;
    
    &:focus {
      border-color: #333;
    }
  }
  
  button {
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 2rem;
    padding: 0.8rem 1.2rem;
    margin-left: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    
    &:hover {
      background-color: #444;
    }
    
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

// 思考状态样式
const ThinkingDots = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  padding: 0.8rem 1rem;
  background-color: #333;
  color: #fff;
  border-radius: 1rem;
  border-bottom-left-radius: 0.2rem;
  align-self: flex-start;
  width: fit-content;
  
  .dot {
    width: 8px;
    height: 8px;
    background-color: #fff;
    border-radius: 50%;
    animation: pulse 1.5s infinite;
    
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(0.8);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 1;
    }
  }
`;

const ChatWidget = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // 从localStorage加载聊天历史
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      // 初始欢迎消息
      setMessages([
        { role: 'system', content: '您好！我是Simple Way AI的智能助手，很高兴为您服务。' }
      ]);
    }
  }, []);
  
  // 保存聊天历史到localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [messages]);
  
  // 自动滚动到最新消息
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // 打开/关闭聊天
  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  
  // 发送消息
  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    // 准备完整的消息历史，包括系统提示词
    const chatHistory = [
      { role: 'system', content: systemPrompt },
      ...messages.filter(msg => msg.role !== 'thinking'),
      userMessage
    ];
    
    try {
      const response = await callChatApi(chatHistory);
      setMessages(prev => [...prev, { role: 'system', content: response }]);
    } catch (error) {
      console.error('聊天API错误:', error);
      setMessages(prev => [...prev, { 
        role: 'system', 
        content: "抱歉，我好像遇到了一点小问题，就像工程师的代码偶尔也会有bug一样 😅 要不我们换个话题？" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 处理输入框按Enter键
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  
  return (
    <>
      <ChatBubble>
        <ChatBubbleButton 
          onClick={toggleChat}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ display: isChatOpen ? 'none' : 'flex' }}
          aria-label="打开聊天"
        >
          <ChatBubbleIcon>💬</ChatBubbleIcon>
        </ChatBubbleButton>
      </ChatBubble>
      
      <AnimatePresence>
        {isChatOpen && (
          <ChatContainer
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <ChatHeader>
              <h3>在线咨询</h3>
              <CloseChat onClick={toggleChat} aria-label="关闭聊天">×</CloseChat>
            </ChatHeader>
            
            <ChatMessages>
              {messages.map((message, index) => (
                <Message key={index} className={message.role}>
                  {message.content}
                </Message>
              ))}
              {isLoading && (
                <ThinkingDots>
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </ThinkingDots>
              )}
              <div ref={messagesEndRef} />
            </ChatMessages>
            
            <ChatInput>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="请输入您的问题..."
                disabled={isLoading}
                aria-label="输入消息"
              />
              <button 
                onClick={sendMessage} 
                disabled={isLoading || !inputValue.trim()}
                aria-label="发送消息"
              >
                发送
              </button>
            </ChatInput>
          </ChatContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget; 