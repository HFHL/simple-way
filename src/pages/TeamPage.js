import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// 导入图片
import AlainImg from '../assets/images/Alain.jpg';
import BarryImg from '../assets/images/Barry.jpg';
import XinyuImg from '../assets/images/xinyu.jpg';
import ChijjImg from '../assets/images/chijj.jpg';
import ZhuhongImg from '../assets/images/zhuhong.jpg';
import HailinImg from '../assets/images/hailin.jpg';
import YuchenImg from '../assets/images/yuchen.jpg';
import LzyImg from '../assets/images/lzy.png';
import TzhImg from '../assets/images/tzh.jpg';
import TmsImg from '../assets/images/tms.png';

const TeamPageSection = styled.section`
  padding: 8rem 0 4rem;
  background-color: #fff;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const TeamMembers = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const MemberDetail = styled(motion.div)`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MemberPhotoWrapper = styled.div`
  flex: 0 0 300px;
  height: 300px;
  overflow: hidden;
  
  @media (max-width: 768px) {
    flex: 0 0 auto;
    height: 250px;
  }
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${MemberDetail}:hover & img {
    transform: scale(1.05);
  }
`;

const MemberInfo = styled.div`
  flex: 1;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const MemberName = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`;

const MemberRole = styled.p`
  font-size: 1.1rem;
  font-weight: 500;
  color: #666;
  margin-bottom: 0.5rem;
`;

const MemberEducation = styled.p`
  font-size: 1rem;
  color: #888;
  margin-bottom: 1.5rem;
`;

const MemberDescription = styled.div`
  p {
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
    margin-bottom: 0.8rem;
  }
`;

const FloatBackBtn = styled(Link)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 100;
  
  &:hover {
    background-color: #555;
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const BackIcon = styled.span`
  margin-right: 0.5rem;
  font-size: 1.2rem;
`;

const BackText = styled.span`
  font-weight: 500;
`;

const memberVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: custom => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.6,
      delay: custom * 0.1
    }
  })
};

const teamMembers = [
  {
    id: 1,
    name: '韩博喻 🚀',
    role: '大语言模型研究员/前华为研发员工',
    education: '斯坦福大学硕士',
    description: [
      '专注于大语言模型的研究与应用，在模型微调和部署优化方面有丰富经验。',
      '曾在华为担任研发工程师，参与多个大规模AI项目的落地。'
    ],
    photo: AlainImg
  },
  {
    id: 2,
    name: '李维恩 💡',
    role: '运筹学研究员/计算机视觉研究员',
    education: '麻省理工学院硕士',
    description: [
      '专注于计算机视觉和运筹优化领域，在目标检测和路径规划方面有深入研究。',
      '主导多个AI优化项目，擅长解决复杂的工程问题。'
    ],
    photo: BarryImg
  },
  {
    id: 3,
    name: '王新宇 🔮',
    role: '大模型量化/RAG研究员',
    education: '麦吉尔大学博士',
    description: [
      '专注于大模型量化和知识检索增强领域，在模型压缩和性能优化方面有独特见解。',
      '主导开发多个企业级RAG系统，提升了模型的实用性和效率。'
    ],
    photo: XinyuImg
  },
  {
    id: 4,
    name: '池纪君 🔬',
    role: '算法程序师',
    education: '北邮/多伦多大学硕士',
    description: [
      'ACM亚洲域赛银牌得主，在算法设计和优化方面有卓越表现。',
      '负责核心算法架构设计，确保系统的高效性和可扩展性。'
    ],
    photo: ChijjImg
  },
  {
    id: 5,
    name: '李铸洪 🎯',
    role: '机器学习工程师',
    education: '华中科技大学/杜克大学硕士',
    description: [
      '专注于机器学习算法的工程化实现，在模型部署和系统优化方面经验丰富。',
      '主导多个AI系统从研发到生产的全流程工作。'
    ],
    photo: ZhuhongImg
  },
  {
    id: 6,
    name: '何海林 ⚡',
    role: '全栈工程师/AI产品设计师',
    education: '三年互联网从业经验',
    description: [
      '专注于AI产品的全栈开发，擅长将复杂的AI功能转化为易用的产品界面。',
      '负责前后端架构设计和用户体验优化，打造流畅的人机交互体验。'
    ],
    photo: HailinImg
  },
  {
    id: 7,
    name: '华雨晨 💫',
    role: '数据管道工程师/Java后端开发工程师',
    education: '麦吉尔大学',
    description: [
      '专注于数据处理和后端系统开发，在大规模数据处理和系统集成方面经验丰富。',
      '负责数据管道搭建以及后端服务开发，保证数据流的高效性和可靠性。'
    ],
    photo: YuchenImg
  },
  {
    id: 8,
    name: '李泽宇 🌟',
    role: '软件算法工程师/前华为云工程师',
    education: '麦吉尔大学计算机科学学士 / 南洋理工大学数据科学硕士(在读)',
    description: [
      '专注于AI算法优化与工程实现，在数据科学和算法工程化方面有丰富经验。',
      '曾在华为云担任软件算法工程师，参与多个大规模AI系统的开发与优化。'
    ],
    photo: LzyImg
  },
  {
    id: 9,
    name: '邰正晗 🌐',
    role: '5G验证工程师/全栈开发工程师',
    education: '女王大学/多伦多大学硕士',
    description: [
      '专注于5G网络和全栈开发，在通信系统集成和网页开发方面有丰富经验。',
      '曾在爱立信担任5G验证开发和前端网页开发工程师，负责网络测试自动化与性能优化，具有跨国团队协作经验。'
    ],
    photo: TzhImg
  },
  {
    id: 10,
    name: '郭桐深 🎲',
    role: '大语言模型/量化研究员',
    education: '波士顿大学硕士',
    description: [
      '专注于大语言模型在表格資料的应用和生成，在数据处理和模型优化方面有充分了解。',
      '主导开发自动化资产对冲平台，优化对冲成本和效率。'
    ],
    photo: TmsImg
  }
];

const TeamPage = () => {
  return (
    <TeamPageSection>
      <Container>
        <TeamMembers>
          {teamMembers.map((member, index) => (
            <MemberDetail
              key={member.id}
              variants={memberVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
            >
              <MemberPhotoWrapper>
                <img src={member.photo} alt={member.name} />
              </MemberPhotoWrapper>
              <MemberInfo>
                <MemberName>{member.name}</MemberName>
                <MemberRole>{member.role}</MemberRole>
                <MemberEducation>{member.education}</MemberEducation>
                <MemberDescription>
                  {member.description.map((desc, idx) => (
                    <p key={idx}>{desc}</p>
                  ))}
                </MemberDescription>
              </MemberInfo>
            </MemberDetail>
          ))}
        </TeamMembers>
      </Container>
      
      <FloatBackBtn to="/#about">
        <BackIcon>←</BackIcon>
        <BackText>返回首页</BackText>
      </FloatBackBtn>
    </TeamPageSection>
  );
};

export default TeamPage; 