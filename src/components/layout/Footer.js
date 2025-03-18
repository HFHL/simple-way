import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #222;
  color: #fff;
  padding: 3rem 0 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -0.5rem;
    width: 50px;
    height: 2px;
    background-color: #666;
  }
`;

const FooterLink = styled(Link)`
  color: #ccc;
  text-decoration: none;
  margin-bottom: 0.8rem;
  transition: color 0.3s ease;
  
  &:hover {
    color: #fff;
  }
`;

const FooterText = styled.p`
  color: #ccc;
  margin-bottom: 0.8rem;
  line-height: 1.6;
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;

const ContactIcon = styled.span`
  margin-right: 1rem;
  font-size: 1.2rem;
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid #444;
  color: #999;
  font-size: 0.9rem;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>关于我们</FooterTitle>
          <FooterText>
            Simple Way AI专注于AI技术应用和系统开发，
            我们的使命是"为商业提供便捷，直达命脉"。
          </FooterText>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>快速链接</FooterTitle>
          <FooterLink to="/">首页</FooterLink>
          <FooterLink to="/#about">关于我们</FooterLink>
          <FooterLink to="/#capabilities">能力</FooterLink>
          <FooterLink to="/#portfolio">案例</FooterLink>
          <FooterLink to="/team">团队</FooterLink>
        </FooterSection>
        
        <FooterSection>
          <FooterTitle>联系我们</FooterTitle>
          <ContactInfo>
            <ContactIcon>📱</ContactIcon>
            <FooterText>+86 123 4567 8901</FooterText>
          </ContactInfo>
          <ContactInfo>
            <ContactIcon>✉️</ContactIcon>
            <FooterText>info@simplewayai.com</FooterText>
          </ContactInfo>
          <ContactInfo>
            <ContactIcon>📍</ContactIcon>
            <FooterText>中国北京市海淀区</FooterText>
          </ContactInfo>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {new Date().getFullYear()} Simple Way AI. 保留所有权利。
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 