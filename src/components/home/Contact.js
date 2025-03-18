import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// 导入图片
import qrcodeImg from '../../assets/images/qrcode.JPG';

const ContactSection = styled.section`
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

const ContactContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const ContactIntro = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const ContactHeadline = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const InfoItem = styled(motion.div)`
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const InfoIcon = styled.div`
  font-size: 2rem;
  margin-right: 1.5rem;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
  font-size: 1rem;
  color: #555;
`;

// 微信卡片的特殊样式
const WechatCard = styled(InfoItem)`
  perspective: 1000px;
  cursor: pointer;
  background-color: transparent;
  box-shadow: none;
  
  &:hover {
    transform: none;
    box-shadow: none;
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  transform: ${props => props.flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
`;

const CardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  background-color: #fff;
`;

const CardFront = styled(CardFace)`
  padding: 2rem;
`;

const CardBack = styled(CardFace)`
  transform: rotateY(180deg);
  justify-content: center;
  padding: 1rem;
`;

const QrCode = styled.div`
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  
  img {
    width: 100%;
    border-radius: 5px;
  }
`;

const contactVariants = {
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

const Contact = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // 翻转微信卡片
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  
  return (
    <ContactSection id="contact">
      <Container>
        <SectionTitle>联系我们</SectionTitle>
        
        <ContactContent>
          <ContactIntro>
            <ContactHeadline>
              让我们一起开启创新之门
            </ContactHeadline>
          </ContactIntro>
          
          <ContactInfo>
            <WechatCard onClick={flipCard}>
              <CardInner flipped={isFlipped}>
                <CardFront>
                  <InfoIcon>💬</InfoIcon>
                  <InfoContent>
                    <InfoTitle>微信咨询</InfoTitle>
                    <InfoText>点击查看二维码</InfoText>
                  </InfoContent>
                </CardFront>
                <CardBack>
                  <QrCode>
                    <img src={qrcodeImg} alt="微信二维码" />
                  </QrCode>
                </CardBack>
              </CardInner>
            </WechatCard>
            
            <InfoItem
              variants={contactVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={1}
            >
              <InfoIcon>📞</InfoIcon>
              <InfoContent>
                <InfoTitle>电话咨询</InfoTitle>
                <InfoText>+86 123 4567 8901</InfoText>
              </InfoContent>
            </InfoItem>
            
            <InfoItem
              variants={contactVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={2}
            >
              <InfoIcon>✉️</InfoIcon>
              <InfoContent>
                <InfoTitle>邮件咨询</InfoTitle>
                <InfoText>info@simplewayai.com</InfoText>
              </InfoContent>
            </InfoItem>
          </ContactInfo>
        </ContactContent>
      </Container>
    </ContactSection>
  );
};

export default Contact; 