import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// 导入图片
import garbageImg from '../../assets/images/garbage.png';
import chatbotImg from '../../assets/images/chatbot.png';

const PortfolioSection = styled.section`
  padding: 6rem 0;
  background-color: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background-color: #333;
  }
`;

const PortfolioContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const PortfolioArrow = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #fff;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  &.left {
    left: 10px;
  }
  
  &.right {
    right: 10px;
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
  
  path {
    stroke: #333;
    stroke-width: 2;
    fill: none;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const PortfolioScroll = styled(motion.div)`
  display: flex;
  transition: transform 0.5s ease;
`;

const PortfolioCard = styled.div`
  flex: 0 0 100%;
  display: flex;
  flex-direction: row;
  min-width: 100%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CardImage = styled.div`
  flex: 0 0 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${PortfolioCard}:hover & img {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    flex: 0 0 200px;
  }
`;

const CardContent = styled.div`
  flex: 0 0 50%;
  display: flex;
  align-items: center;
  background-color: #fff;
  
  @media (max-width: 768px) {
    flex: 1;
  }
`;

const ContentWrapper = styled.div`
  padding: 2rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
`;

const ScrollIndicator = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
`;

const CircleBtn = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #333;
    color: #fff;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  path {
    stroke: currentColor;
    stroke-width: 2;
    fill: none;
  }
`;

const portfolioItems = [
  {
    id: 1,
    title: '智能垃圾分类系统',
    description: `基于计算机视觉的智能垃圾分类系统，通过深度学习模型实现垃圾的自动识别和分类。
                  系统集成了机械臂控制、传送带调度、数据实时分析等模块，实现了从垃圾投放、
                  智能分类、数据记录到处理流转的全流程自动化。目前已投入生产，
                  日均处理垃圾超过3吨，分类准确率达98%以上。`,
    image: garbageImg,
    imagePosition: 'left'
  },
  {
    id: 2,
    title: '智能知识库问答机器人',
    description: `为某知名车企定制的AI问答机器人，通过RAG技术实现精准的知识检索。
                  系统对企业文档进行深度清洗和向量化存储，结合微调后的大语言模型，
                  实现对用户询问的精准理解和回答。目前系统支持产品、服务、技术等
                  多个领域的智能问答，大幅提升了客服效率用户满意度。`,
    image: chatbotImg,
    imagePosition: 'right'
  }
];

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const scrollRef = useRef(null);
  
  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      if (scrollRef.current) {
        setSlideWidth(scrollRef.current.offsetWidth);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // 滚动到下一个项目
  const scrollNext = () => {
    const newIndex = activeIndex === portfolioItems.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };
  
  // 滚动到上一个项目
  const scrollPrev = () => {
    const newIndex = activeIndex === 0 ? portfolioItems.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  };
  
  // 滚动到下一个部分
  const scrollToNext = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <PortfolioSection id="portfolio">
      <Container>
        <SectionTitle>我们做过什么？</SectionTitle>
        
        <PortfolioContainer>
          <PortfolioArrow 
            className="left" 
            onClick={scrollPrev}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </PortfolioArrow>
          
          <PortfolioScroll 
            ref={scrollRef}
            animate={{ x: -activeIndex * slideWidth }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {portfolioItems.map((item) => (
              <PortfolioCard key={item.id}>
                {item.imagePosition === 'left' && (
                  <CardImage>
                    <img src={item.image} alt={item.title} />
                  </CardImage>
                )}
                
                <CardContent>
                  <ContentWrapper>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </ContentWrapper>
                </CardContent>
                
                {item.imagePosition === 'right' && (
                  <CardImage>
                    <img src={item.image} alt={item.title} />
                  </CardImage>
                )}
              </PortfolioCard>
            ))}
          </PortfolioScroll>
          
          <PortfolioArrow 
            className="right" 
            onClick={scrollNext}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </PortfolioArrow>
        </PortfolioContainer>
        
        <ScrollIndicator>
          <CircleBtn onClick={scrollToNext}>
            <svg viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5"></path>
            </svg>
          </CircleBtn>
        </ScrollIndicator>
      </Container>
    </PortfolioSection>
  );
};

export default Portfolio; 