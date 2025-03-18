import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Capabilities from '../components/home/Capabilities';
import Portfolio from '../components/home/Portfolio';
import Contact from '../components/home/Contact';
import ChatWidget from '../components/chat/ChatWidget';

const HomePage = () => {
  // 处理锚点滚动
  useEffect(() => {
    // 处理页面加载时的哈希滚动
    const hash = window.location.hash;
    if (hash) {
      // 延迟执行以确保DOM已完全加载
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    
    // 处理点击锚点链接时的滚动
    const handleHashChange = () => {
      const newHash = window.location.hash;
      if (newHash) {
        setTimeout(() => {
          const element = document.querySelector(newHash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 0);
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  return (
    <>
      <Hero />
      <About />
      <Capabilities />
      <Portfolio />
      <Contact />
      <ChatWidget />
    </>
  );
};

export default HomePage; 