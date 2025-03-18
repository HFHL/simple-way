import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  background-color: ${props => props.scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent'};
  box-shadow: ${props => props.scrolled ? '0 2px 10px rgba(0, 0, 0, 0.1)' : 'none'};
`;

const NavInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 5%;
  max-width: 1400px;
  margin: 0 auto;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${props => props.scrolled ? '#333' : '#fff'};
  text-decoration: none;
  letter-spacing: 1px;
  transition: color 0.3s ease;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.scrolled ? '#333' : '#fff'};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: ${props => props.scrolled ? '#333' : '#fff'};
    transition: width 0.3s ease;
  }
  
  &:hover:after {
    width: 100%;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.scrolled ? '#333' : '#fff'};
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 70%;
  height: 100vh;
  background-color: #fff;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  padding: 5rem 2rem;
  transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
  transition: transform 0.3s ease;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
`;

const MobileNavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  margin: 1rem 0;
  transition: color 0.3s ease;
  
  &:hover {
    color: #666;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    // 关闭移动菜单当路由变化时
    setMobileMenuOpen(false);
  }, [location]);
  
  // 防止滚动当移动菜单打开时
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <NavContainer scrolled={scrolled}>
        <NavInner>
          <Logo to="/" scrolled={scrolled}>SIMPLE WAY</Logo>
          <NavLinks>
            <NavLink to="/" scrolled={scrolled}>首页</NavLink>
            <NavLink to="/#about" scrolled={scrolled}>关于我们</NavLink>
            <NavLink to="/#capabilities" scrolled={scrolled}>能力</NavLink>
            <NavLink to="/#portfolio" scrolled={scrolled}>案例</NavLink>
            <NavLink to="/#contact" scrolled={scrolled}>联系我们</NavLink>
          </NavLinks>
          <MobileMenuButton 
            scrolled={scrolled} 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="打开菜单"
          >
            ☰
          </MobileMenuButton>
        </NavInner>
      </NavContainer>
      
      <Overlay isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(false)} />
      
      <MobileMenu isOpen={mobileMenuOpen}>
        <MobileMenuButton 
          scrolled={true} 
          onClick={() => setMobileMenuOpen(false)}
          aria-label="关闭菜单"
          style={{ alignSelf: 'flex-end', marginBottom: '2rem' }}
        >
          ✕
        </MobileMenuButton>
        <MobileNavLink to="/">首页</MobileNavLink>
        <MobileNavLink to="/#about">关于我们</MobileNavLink>
        <MobileNavLink to="/#capabilities">能力</MobileNavLink>
        <MobileNavLink to="/#portfolio">案例</MobileNavLink>
        <MobileNavLink to="/#contact">联系我们</MobileNavLink>
      </MobileMenu>
    </>
  );
};

export default Navbar; 