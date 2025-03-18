import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CapabilitiesSection = styled.section`
  padding: 6rem 0;
  background-color: #f9f9f9;
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

const CapabilitiesContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const CapabilitiesIntro = styled.div`
  max-width: 800px;
  margin: 0 auto 2rem;
`;

const CapabilitiesHeadline = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const CapabilitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const CapabilityItem = styled(motion.div)`
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const CapabilityHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const CapabilityIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: #f0f0f0;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CapabilityTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`;

const MainCapability = styled.p`
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
`;

const CapabilityList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  flex-grow: 1;
`;

const CapabilityItem2 = styled.li`
  font-size: 1rem;
  color: #555;
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 1.5rem;
  
  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: #333;
  }
`;

const ValueProp = styled.p`
  font-size: 1rem;
  color: #333;
  font-style: italic;
  border-top: 1px solid #eee;
  padding-top: 1rem;
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

const capabilityVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: custom => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6,
      delay: custom * 0.2
    }
  })
};

const Capabilities = () => {
  // 滚动到下一个部分
  const scrollToNext = () => {
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <CapabilitiesSection id="capabilities">
      <Container>
        <SectionTitle>我们能做什么？</SectionTitle>
        
        <CapabilitiesContent>
          <CapabilitiesIntro>
            <CapabilitiesHeadline>
              用AI的力量，为企业插上数字化转型的翅膀
            </CapabilitiesHeadline>
          </CapabilitiesIntro>
          
          <CapabilitiesGrid>
            <CapabilityItem
              variants={capabilityVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={0}
            >
              <CapabilityHeader>
                <CapabilityIcon>AI</CapabilityIcon>
                <CapabilityTitle>AI模型定制</CapabilityTitle>
                <MainCapability>大语言模型微调与部署</MainCapability>
              </CapabilityHeader>
              <CapabilityList>
                <CapabilityItem2>企业知识库构建</CapabilityItem2>
                <CapabilityItem2>场景化模型训练</CapabilityItem2>
                <CapabilityItem2>私有化部署方案</CapabilityItem2>
                <CapabilityItem2>成本效益优化</CapabilityItem2>
              </CapabilityList>
              <ValueProp>让AI真正理解您的业务，成为企业的智慧大脑</ValueProp>
            </CapabilityItem>
            
            <CapabilityItem
              variants={capabilityVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
            >
              <CapabilityHeader>
                <CapabilityIcon>Dev</CapabilityIcon>
                <CapabilityTitle>全栈开发服务</CapabilityTitle>
                <MainCapability>一站式软件解决方案</MainCapability>
              </CapabilityHeader>
              <CapabilityList>
                <CapabilityItem2>Web应用开发</CapabilityItem2>
                <CapabilityItem2>移动端开发</CapabilityItem2>
                <CapabilityItem2>系统架构设计</CapabilityItem2>
                <CapabilityItem2>数据管道搭建</CapabilityItem2>
              </CapabilityList>
              <ValueProp>将创新理念转化为实用工具，提升业务效率</ValueProp>
            </CapabilityItem>
            
            <CapabilityItem
              variants={capabilityVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={2}
            >
              <CapabilityHeader>
                <CapabilityIcon>DX</CapabilityIcon>
                <CapabilityTitle>数字化转型咨询</CapabilityTitle>
                <MainCapability>AI赋能业务</MainCapability>
              </CapabilityHeader>
              <CapabilityList>
                <CapabilityItem2>业务流程优化</CapabilityItem2>
                <CapabilityItem2>AI集成方案</CapabilityItem2>
                <CapabilityItem2>数据价值挖掘</CapabilityItem2>
                <CapabilityItem2>智能化改造</CapabilityItem2>
              </CapabilityList>
              <ValueProp>用科技创新推动传统业务升级，开创增长新机遇</ValueProp>
            </CapabilityItem>
          </CapabilitiesGrid>
        </CapabilitiesContent>
        
        <ScrollIndicator>
          <CircleBtn onClick={scrollToNext}>
            <svg viewBox="0 0 24 24">
              <path d="M7 10l5 5 5-5"></path>
            </svg>
          </CircleBtn>
        </ScrollIndicator>
      </Container>
    </CapabilitiesSection>
  );
};

export default Capabilities; 