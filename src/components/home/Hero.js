import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  height: 100vh;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  overflow: hidden;
  padding: 0 2rem;
`;

const WordCloudContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0.3;
`;

const WordCloud = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Heading = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  z-index: 2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const MissionWrapper = styled(motion.div)`
  margin-bottom: 3rem;
  z-index: 2;
`;

const Mission = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ScrollButton = styled(motion.button)`
  background: transparent;
  border: 2px solid #fff;
  color: #fff;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

// 词云关键词列表
const keywords = [
  'LLM', 'Transformer', 'MySQL', 'Python', 'TensorFlow',
  'PyTorch', 'React', 'Node.js', 'Docker', 'Kubernetes',
  'RAG', 'BERT', 'GPT', 'Vue.js', 'MongoDB',
  'Redis', 'FastAPI', 'Spring Boot', 'DevOps', 'CI/CD',
  'NLP', 'Computer Vision', 'AWS', 'Microservices', 'GraphQL',
  'Kafka', 'Elasticsearch', 'Neural Networks', 'Deep Learning', 'Git'
];

const Hero = () => {
  const wordCloudRef = useRef(null);
  
  // 滚动到下一个部分
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // 生成词云
  useEffect(() => {
    if (!wordCloudRef.current) return;
    
    const wordCloud = wordCloudRef.current;
    wordCloud.innerHTML = '';
    
    keywords.forEach(keyword => {
      const span = document.createElement('span');
      span.textContent = keyword;
      
      // 随机位置
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      
      // 随机字体大小
      const size = Math.random() * 1 + 0.8;
      
      // 随机旋转
      const rotation = Math.random() * 60 - 30;
      
      // 随机透明度
      const opacity = Math.random() * 0.7 + 0.3;
      
      span.style.cssText = `
        position: absolute;
        left: ${left}%;
        top: ${top}%;
        font-size: ${size}rem;
        transform: rotate(${rotation}deg);
        opacity: ${opacity};
        color: white;
        font-weight: 500;
        white-space: nowrap;
      `;
      
      wordCloud.appendChild(span);
    });
  }, []);
  
  return (
    <HeroSection>
      <WordCloudContainer>
        <WordCloud ref={wordCloudRef} />
      </WordCloudContainer>
      
      <Heading 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        SIMPLE WAY · 化繁为简
      </Heading>
      
      <MissionWrapper
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Mission>为商业提供便捷，直达命脉。</Mission>
      </MissionWrapper>
      
      <ScrollButton
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        onClick={scrollToNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        了解更多
      </ScrollButton>
    </HeroSection>
  );
};

export default Hero; 