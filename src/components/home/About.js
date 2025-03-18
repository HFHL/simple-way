import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutSection = styled.section`
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

const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const AboutText = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HighlightText = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  text-align: center;
  color: #333;
`;

const MainText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #555;
  text-align: center;
`;

const TeamLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const TeamLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.8rem 1.5rem;
  border: 2px solid #333;
  border-radius: 50px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

const TeamLinkText = styled.span`
  margin-right: 0.5rem;
`;

const TeamLinkIcon = styled.span`
  font-size: 1.2rem;
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

const AboutVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8 }
  }
};

const About = () => {
  // 滚动到下一个部分
  const scrollToNext = () => {
    const capabilitiesSection = document.getElementById('capabilities');
    if (capabilitiesSection) {
      capabilitiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <AboutSection id="about">
      <Container>
        <SectionTitle>关于我们</SectionTitle>
        
        <AboutContent>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={AboutVariants}
          >
            <AboutText>
              <HighlightText>
                我们是一群追逐AI浪潮的梦想家和实干家。
              </HighlightText>
              <MainText>
                汇聚自世界顶尖学府的技术团队，我们不仅精通前沿算法，更懂得如何将创新转化为价值。
                从语言模型到计算机视觉，从全栈开发到系统架构，我们的专业广度与技术深度让每个项目都能得到最优解决方案。
              </MainText>
            </AboutText>
            
            <TeamLinkContainer>
              <TeamLink to="/team">
                <TeamLinkText>了解我们的团队</TeamLinkText>
                <TeamLinkIcon>→</TeamLinkIcon>
              </TeamLink>
            </TeamLinkContainer>
          </motion.div>
        </AboutContent>
        
        <ScrollIndicator>
          <CircleBtn onClick={scrollToNext}>
            <svg viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5"></path>
            </svg>
          </CircleBtn>
        </ScrollIndicator>
      </Container>
    </AboutSection>
  );
};

export default About; 