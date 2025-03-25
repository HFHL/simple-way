document.addEventListener('DOMContentLoaded', () => {
    // Initialize language state from localStorage or default to Chinese
    let currentLanguage = localStorage.getItem('preferred_language') || 'chinese';
    
    // Dictionary of translations
    const translations = {
        // Navigation
        'nav_home': {
            'chinese': '首页',
            'english': 'Home'
        },
        'nav_about': {
            'chinese': '关于我们',
            'english': 'About Us'
        },
        'nav_capabilities': {
            'chinese': '能力',
            'english': 'Capabilities'
        },
        'nav_portfolio': {
            'chinese': '案例',
            'english': 'Portfolio'
        },
        'nav_contact': {
            'chinese': '联系我们',
            'english': 'Contact'
        },
        
        // Hero section
        'hero_tagline': {
            'chinese': 'SIMPLE WAY · 化繁为简',
            'english': 'SIMPLE WAY · Simplify Complexity'
        },
        'hero_mission': {
            'chinese': '为商业提供便捷，直达命脉。',
            'english': 'Providing business with convenience, reaching the core directly.'
        },
        'hero_button': {
            'chinese': '了解更多',
            'english': 'Learn More'
        },
        
        // About section
        'about_title': {
            'chinese': '关于我们',
            'english': 'About Us'
        },
        'about_highlight': {
            'chinese': '我们是一群追逐AI浪潮的梦想家和实干家。',
            'english': 'We are dreamers and doers riding the AI wave.'
        },
        'about_description': {
            'chinese': '汇聚自世界顶尖学府的技术团队，我们不仅精通前沿算法，更懂得如何将创新转化为价值。从语言模型到计算机视觉，从全栈开发到系统架构，我们的专业广度与技术深度让每个项目都能得到最优解决方案。',
            'english': 'Our technical team, gathered from the world\'s top universities, not only masters cutting-edge algorithms but also knows how to transform innovation into value. From language models to computer vision, from full-stack development to system architecture, our professional breadth and technical depth enable optimal solutions for every project.'
        },
        'about_team_link': {
            'chinese': '了解我们的团队',
            'english': 'Meet Our Team'
        },
        
        // Capabilities section
        'capabilities_title': {
            'chinese': '我们能做什么？',
            'english': 'What Can We Do?'
        },
        'capabilities_headline': {
            'chinese': '用AI的力量，为企业插上数字化转型的翅膀',
            'english': 'Empowering businesses with AI for digital transformation'
        },
        'capability_ai_title': {
            'chinese': 'AI模型定制',
            'english': 'AI Model Customization'
        },
        'capability_ai_main': {
            'chinese': '大语言模型微调与部署',
            'english': 'LLM fine-tuning & deployment'
        },
        'capability_ai_item1': {
            'chinese': '企业知识库构建',
            'english': 'Enterprise knowledge base'
        },
        'capability_ai_item2': {
            'chinese': '场景化模型训练',
            'english': 'Scenario-based training'
        },
        'capability_ai_item3': {
            'chinese': '私有化部署方案',
            'english': 'Private deployment'
        },
        'capability_ai_item4': {
            'chinese': '成本效益优化',
            'english': 'Cost-benefit optimization'
        },
        'capability_ai_value': {
            'chinese': '让AI真正理解您的业务，成为企业的智慧大脑',
            'english': 'Make AI truly understand your business and become your company\'s intelligent brain'
        },
        
        'capability_dev_title': {
            'chinese': '全栈开发服务',
            'english': 'Full-Stack Development'
        },
        'capability_dev_main': {
            'chinese': '一站式软件解决方案',
            'english': 'One-stop software solutions'
        },
        'capability_dev_item1': {
            'chinese': 'Web应用开发',
            'english': 'Web application development'
        },
        'capability_dev_item2': {
            'chinese': '移动端开发',
            'english': 'Mobile development'
        },
        'capability_dev_item3': {
            'chinese': '系统架构设计',
            'english': 'System architecture design'
        },
        'capability_dev_item4': {
            'chinese': '数据管道搭建',
            'english': 'Data pipeline construction'
        },
        'capability_dev_value': {
            'chinese': '将创新理念转化为实用工具，提升业务效率',
            'english': 'Transform innovative ideas into practical tools that enhance business efficiency'
        },
        
        'capability_dx_title': {
            'chinese': '数字化转型咨询',
            'english': 'Digital Transformation'
        },
        'capability_dx_main': {
            'chinese': 'AI赋能业务',
            'english': 'AI-empowered business'
        },
        'capability_dx_item1': {
            'chinese': '业务流程优化',
            'english': 'Business process optimization'
        },
        'capability_dx_item2': {
            'chinese': 'AI集成方案',
            'english': 'AI integration solutions'
        },
        'capability_dx_item3': {
            'chinese': '数据价值挖掘',
            'english': 'Data value mining'
        },
        'capability_dx_item4': {
            'chinese': '智能化改造',
            'english': 'Intelligent transformation'
        },
        'capability_dx_value': {
            'chinese': '用科技创新推动传统业务升级，开创增长新机遇',
            'english': 'Drive traditional business upgrades with technological innovation, creating new growth opportunities'
        },
        
        // Portfolio section
        'portfolio_title': {
            'chinese': '我们做过什么？',
            'english': 'What Have We Done?'
        },
        'portfolio_garbage_title': {
            'chinese': '智能垃圾分类系统',
            'english': 'Smart Waste Sorting System'
        },
        'portfolio_garbage_description': {
            'chinese': '基于计算机视觉的智能垃圾分类系统，通过深度学习模型实现垃圾的自动识别和分类。系统集成了机械臂控制、传送带调度、数据实时分析等模块，实现了从垃圾投放、智能分类、数据记录到处理流转的全流程自动化。目前已投入生产，日均处理垃圾超过3吨，分类准确率达98%以上。',
            'english': 'A computer vision-based intelligent waste sorting system that uses deep learning models for automatic waste recognition and classification. The system integrates mechanical arm control, conveyor belt scheduling, real-time data analysis, and other modules to achieve full-process automation from waste disposal, intelligent sorting, data recording to processing circulation. Currently in production, it processes over 3 tons of waste daily with a classification accuracy exceeding 98%.'
        },
        'portfolio_chatbot_title': {
            'chinese': '智能知识库问答机器人',
            'english': 'AI Knowledge Base Q&A Bot'
        },
        'portfolio_chatbot_description': {
            'chinese': '为某知名车企定制的AI问答机器人，通过RAG技术实现精准的知识检索。系统对企业文档进行深度清洗和向量化存储，结合微调后的大语言模型，实现对用户询问的精准理解和回答。目前系统支持产品、服务、技术等多个领域的智能问答，大幅提升了客服效率用户满意度。',
            'english': 'A customized AI Q&A bot for a well-known automotive company, achieving precise knowledge retrieval through RAG technology. The system performs deep cleaning and vector storage of company documents, combined with fine-tuned large language models, to achieve accurate understanding and answering of user inquiries. Currently, the system supports intelligent Q&A in multiple areas such as products, services, and technology, significantly improving customer service efficiency and user satisfaction.'
        },
        
        // Contact section
        'contact_title': {
            'chinese': '联系我们',
            'english': 'Contact Us'
        },
        'contact_headline': {
            'chinese': '让我们一起开启创新之门',
            'english': 'Let\'s open the door to innovation together'
        },
        'contact_wechat': {
            'chinese': '微信咨询',
            'english': 'WeChat Consultation'
        },
        'contact_wechat_hint': {
            'chinese': '点击查看二维码',
            'english': 'Click to view QR code'
        },
        'contact_phone': {
            'chinese': '联系电话',
            'english': 'Phone'
        },
        'contact_email': {
            'chinese': '电子邮件',
            'english': 'Email'
        },
        'contact_address': {
            'chinese': '公司地址',
            'english': 'Address'
        },
        'contact_location': {
            'chinese': '中国 · 成都',
            'english': 'Chengdu, China'
        },
        
        // AI Chat section
        'ai_chat_title': {
            'chinese': '与AI聊聊',
            'english': 'Chat with AI'
        },
        'chat_header': {
            'chinese': '在线咨询',
            'english': 'Online Consultation'
        },
        'chat_greeting': {
            'chinese': '您好！我是Simple Way AI的智能助手，很高兴为您服务。',
            'english': 'Hello! I am the intelligent assistant of Simple Way AI, happy to be of service.'
        },
        'chat_input_placeholder': {
            'chinese': '请输入您的问题...',
            'english': 'Please enter your question...'
        },
        'chat_send': {
            'chinese': '发送',
            'english': 'Send'
        },
        
        // Team page
        'team_page_title': {
            'chinese': '团队介绍 - Simple Way AI',
            'english': 'Our Team - Simple Way AI'
        },
        'team_back_btn': {
            'chinese': '返回首页',
            'english': 'Back to Home'
        },
        
        // Team member roles
        'team_role_llm_researcher': {
            'chinese': '大语言模型研究员/前华为研发员工',
            'english': 'LLM Researcher/Former Huawei R&D'
        },
        'team_role_or_cv': {
            'chinese': '运筹学研究员/计算机视觉研究员',
            'english': 'Operations Research/Computer Vision Researcher'
        },
        'team_role_llm_quant': {
            'chinese': '大模型量化/RAG研究员',
            'english': 'LLM Quantization/RAG Researcher'
        },
        'team_role_algo': {
            'chinese': '算法程序师',
            'english': 'Algorithm Engineer'
        },
        'team_role_ml': {
            'chinese': '机器学习工程师',
            'english': 'Machine Learning Engineer'
        },
        'team_role_fullstack': {
            'chinese': '全栈工程师/AI产品设计师',
            'english': 'Full-Stack Engineer/AI Product Designer'
        },
        'team_role_data': {
            'chinese': '数据管道工程师/Java后端开发工程师',
            'english': 'Data Pipeline Engineer/Java Backend Developer'
        },
        'team_role_sw_algo': {
            'chinese': '软件算法工程师/前华为云工程师',
            'english': 'Software Algorithm Engineer/Former Huawei Cloud Engineer'
        },
        'team_role_5g': {
            'chinese': '5G验证工程师/全栈开发工程师',
            'english': '5G Verification Engineer/Full-Stack Developer'
        },
        'team_role_llm_quant2': {
            'chinese': '大语言模型/量化研究员',
            'english': 'LLM/Quantization Researcher'
        },
        
        // Team member education
        'team_edu_stanford': {
            'chinese': '斯坦福大学硕士',
            'english': 'Master\'s, Stanford University'
        },
        'team_edu_mit': {
            'chinese': '麻省理工学院硕士',
            'english': 'Master\'s, MIT'
        },
        'team_edu_mcgill_phd': {
            'chinese': '麦吉尔大学博士',
            'english': 'PhD, McGill University'
        },
        'team_edu_bupt_toronto': {
            'chinese': '北邮/多伦多大学硕士',
            'english': 'Master\'s, BUPT/University of Toronto'
        },
        'team_edu_hust_duke': {
            'chinese': '华中科技大学/杜克大学硕士',
            'english': 'Master\'s, HUST/Duke University'
        },
        'team_edu_3years': {
            'chinese': '三年互联网从业经验',
            'english': '3 Years Internet Industry Experience'
        },
        'team_edu_mcgill': {
            'chinese': '麦吉尔大学',
            'english': 'McGill University'
        },
        'team_edu_mcgill_ntu': {
            'chinese': '麦吉尔大学计算机科学学士 / 南洋理工大学数据科学硕士(在读)',
            'english': 'BSc in Computer Science, McGill University / MSc in Data Science, NTU (ongoing)'
        },
        'team_edu_queens_toronto': {
            'chinese': '女王大学/多伦多大学硕士',
            'english': 'Master\'s, Queen\'s University/University of Toronto'
        },
        'team_edu_bu': {
            'chinese': '波士顿大学硕士',
            'english': 'Master\'s, Boston University'
        },
        
        // Team member description parts
        'team_desc_han_1': {
            'chinese': '专注于大语言模型的研究与应用，在模型微调和部署优化方面有丰富经验。',
            'english': 'Focuses on LLM research and applications, with rich experience in model fine-tuning and deployment optimization.'
        },
        'team_desc_han_2': {
            'chinese': '曾在华为担任研发工程师，参与多个大规模AI项目的落地。',
            'english': 'Former R&D engineer at Huawei, participated in multiple large-scale AI project implementations.'
        },
        'team_desc_li_1': {
            'chinese': '专注于计算机视觉和运筹优化领域，在目标检测和路径规划方面有深入研究。',
            'english': 'Focuses on computer vision and operations optimization, with in-depth research in object detection and path planning.'
        },
        'team_desc_li_2': {
            'chinese': '主导多个AI优化项目，擅长解决复杂的工程问题。',
            'english': 'Led multiple AI optimization projects, skilled at solving complex engineering problems.'
        },
        'team_desc_wang_1': {
            'chinese': '专注于大模型量化和知识检索增强领域，在模型压缩和性能优化方面有独特见解。',
            'english': 'Focuses on LLM quantization and RAG, with unique insights in model compression and performance optimization.'
        },
        'team_desc_wang_2': {
            'chinese': '主导开发多个企业级RAG系统，提升了模型的实用性和效率。',
            'english': 'Led the development of multiple enterprise-level RAG systems, enhancing model practicality and efficiency.'
        },
        'team_desc_chi_1': {
            'chinese': 'ACM亚洲域赛银牌得主，在算法设计和优化方面有卓越表现。',
            'english': 'ACM Asia Regional Contest silver medalist, with outstanding performance in algorithm design and optimization.'
        },
        'team_desc_chi_2': {
            'chinese': '负责核心算法架构设计，确保系统的高效性和可扩展性。',
            'english': 'Responsible for core algorithm architecture design, ensuring system efficiency and scalability.'
        },
        'team_desc_lizhuhong_1': {
            'chinese': '专注于机器学习算法的工程化实现，在模型部署和系统优化方面经验丰富。',
            'english': 'Focuses on engineering implementation of machine learning algorithms, with rich experience in model deployment and system optimization.'
        },
        'team_desc_lizhuhong_2': {
            'chinese': '主导多个AI系统从研发到生产的全流程工作。',
            'english': 'Led the entire process from R&D to production for multiple AI systems.'
        },
        'team_desc_he_1': {
            'chinese': '专注于AI产品的全栈开发，擅长将复杂的AI功能转化为易用的产品界面。',
            'english': 'Focuses on full-stack development of AI products, skilled at transforming complex AI functions into user-friendly product interfaces.'
        },
        'team_desc_he_2': {
            'chinese': '负责前后端架构设计和用户体验优化，打造流畅的人机交互体验。',
            'english': 'Responsible for front-end and back-end architecture design and UX optimization, creating smooth human-computer interaction experiences.'
        },
        'team_desc_hua_1': {
            'chinese': '专注于数据处理和后端系统开发，在大规模数据处理和系统集成方面经验丰富。',
            'english': 'Focuses on data processing and backend system development, with rich experience in large-scale data processing and system integration.'
        },
        'team_desc_hua_2': {
            'chinese': '负责数据管道搭建以及后端服务开发，保证数据流的高效性和可靠性。',
            'english': 'Responsible for data pipeline construction and backend service development, ensuring data flow efficiency and reliability.'
        },
        'team_desc_lizeyu_1': {
            'chinese': '专注于AI算法优化与工程实现，在数据科学和算法工程化方面有丰富经验。',
            'english': 'Focuses on AI algorithm optimization and engineering implementation, with rich experience in data science and algorithm engineering.'
        },
        'team_desc_lizeyu_2': {
            'chinese': '曾在华为云担任软件算法工程师，参与多个大规模AI系统的开发与优化。',
            'english': 'Former software algorithm engineer at Huawei Cloud, participated in the development and optimization of multiple large-scale AI systems.'
        },
        'team_desc_tai_1': {
            'chinese': '专注于5G网络和全栈开发，在通信系统集成和网页开发方面有丰富经验。',
            'english': 'Focuses on 5G networks and full-stack development, with rich experience in communication system integration and web development.'
        },
        'team_desc_tai_2': {
            'chinese': '曾在爱立信担任5G验证开发和前端网页开发工程师，负责网络测试自动化与性能优化，具有跨国团队协作经验。',
            'english': 'Former 5G verification and front-end web development engineer at Ericsson, responsible for network testing automation and performance optimization, with experience in multinational team collaboration.'
        },
        'team_desc_guo_1': {
            'chinese': '专注于大语言模型在表格資料的应用和生成，在数据处理和模型优化方面有充分了解。',
            'english': 'Focuses on LLM applications in tabular data generation, with comprehensive understanding of data processing and model optimization.'
        },
        'team_desc_guo_2': {
            'chinese': '主导开发自动化资产对冲平台，优化对冲成本和效率。',
            'english': 'Led the development of an automated asset hedging platform, optimizing hedging costs and efficiency.'
        },
        
        // Team member names
        'team_name_han': {
            'chinese': '韩博喻 🚀',
            'english': 'Boyu Han 🚀'
        },
        'team_name_li': {
            'chinese': '李维恩 💡',
            'english': 'Wei\'en Li 💡'
        },
        'team_name_wang': {
            'chinese': '王新宇 🔮',
            'english': 'Xinyu Wang 🔮'
        },
        'team_name_chi': {
            'chinese': '池纪君 🔬',
            'english': 'Jijun Chi 🔬'
        },
        'team_name_lizhuhong': {
            'chinese': '李铸洪 🎯',
            'english': 'Zhuhong Li 🎯'
        },
        'team_name_he': {
            'chinese': '何海林 ⚡',
            'english': 'Hailin He ⚡'
        },
        'team_name_hua': {
            'chinese': '华雨晨 💫',
            'english': 'Yuchen Hua 💫'
        },
        'team_name_lizeyu': {
            'chinese': '李泽宇 🌟',
            'english': 'Zeyu Li 🌟'
        },
        'team_name_tai': {
            'chinese': '邰正晗 🌐',
            'english': 'Zhenghan Tai 🌐'
        },
        'team_name_guo': {
            'chinese': '郭桐深 🎲',
            'english': 'Tongshen Guo 🎲'
        }
    };
    
    // Get language toggle button
    const languageToggle = document.getElementById('language-toggle');
    
    // Set initial button state based on stored language preference
    if (currentLanguage === 'english') {
        languageToggle.textContent = 'EN / 中';
        languageToggle.classList.add('english');
        // Apply English translations immediately
        updateLanguage(currentLanguage);
    }
    
    // Add click event listener to toggle button
    languageToggle.addEventListener('click', () => {
        // Toggle language state
        currentLanguage = currentLanguage === 'chinese' ? 'english' : 'chinese';
        
        // Save language preference to localStorage
        localStorage.setItem('preferred_language', currentLanguage);
        
        // Update button text and class
        if (currentLanguage === 'english') {
            languageToggle.textContent = 'EN / 中';
            languageToggle.classList.add('english');
        } else {
            languageToggle.textContent = '中 / EN';
            languageToggle.classList.remove('english');
        }
        
        // Update all text elements
        updateLanguage(currentLanguage);
    });
    
    // Function to update all text elements based on selected language
    function updateLanguage(language) {
        // Check if we're on the main page or team page by checking for specific elements
        const isTeamPage = document.querySelector('.team-page') !== null;
        
        // Update page title
        if (isTeamPage) {
            document.title = translations.team_page_title[language];
        }
        
        // Navigation links - common for both pages
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks[0].textContent = translations.nav_home[language];
        navLinks[1].textContent = translations.nav_about[language];
        navLinks[2].textContent = translations.nav_capabilities[language];
        navLinks[3].textContent = translations.nav_portfolio[language];
        navLinks[4].textContent = translations.nav_contact[language];
        
        // Chat elements - common for both pages
        // Chat headers
        document.querySelectorAll('.chat-header h3').forEach(header => {
            header.textContent = translations.chat_header[language];
        });
        
        // Chat messages
        document.querySelectorAll('.message.system').forEach(message => {
            message.textContent = translations.chat_greeting[language];
        });
        
        // Chat inputs
        document.querySelectorAll('.chat-input input').forEach(input => {
            input.placeholder = translations.chat_input_placeholder[language];
        });
        
        // Chat send buttons
        document.querySelectorAll('.send-message').forEach(button => {
            button.textContent = translations.chat_send[language];
        });
        
        if (isTeamPage) {
            // Team page specific elements
            updateTeamPageElements(language);
        } else {
            // Main page specific elements
            updateMainPageElements(language);
        }
    }
    
    // Function to update team page elements
    function updateTeamPageElements(language) {
        // Back button
        const backBtn = document.querySelector('.float-back-btn .back-text');
        if (backBtn) {
            backBtn.textContent = translations.team_back_btn[language];
        }
        
        // Team members
        const memberDetails = document.querySelectorAll('.member-detail');
        if (memberDetails.length > 0) {
            // Han Boyu
            updateTeamMember(memberDetails[0], 'team_name_han', 'team_role_llm_researcher', 'team_edu_stanford', 
                             'team_desc_han_1', 'team_desc_han_2', language);
            
            // Li Wei'en
            updateTeamMember(memberDetails[1], 'team_name_li', 'team_role_or_cv', 'team_edu_mit', 
                             'team_desc_li_1', 'team_desc_li_2', language);
            
            // Wang Xinyu
            updateTeamMember(memberDetails[2], 'team_name_wang', 'team_role_llm_quant', 'team_edu_mcgill_phd', 
                             'team_desc_wang_1', 'team_desc_wang_2', language);
            
            // Chi Jijun
            updateTeamMember(memberDetails[3], 'team_name_chi', 'team_role_algo', 'team_edu_bupt_toronto', 
                             'team_desc_chi_1', 'team_desc_chi_2', language);
            
            // Li Zhuhong
            updateTeamMember(memberDetails[4], 'team_name_lizhuhong', 'team_role_ml', 'team_edu_hust_duke', 
                             'team_desc_lizhuhong_1', 'team_desc_lizhuhong_2', language);
            
            // He Hailin
            updateTeamMember(memberDetails[5], 'team_name_he', 'team_role_fullstack', 'team_edu_3years', 
                             'team_desc_he_1', 'team_desc_he_2', language);
            
            // Hua Yuchen
            updateTeamMember(memberDetails[6], 'team_name_hua', 'team_role_data', 'team_edu_mcgill', 
                             'team_desc_hua_1', 'team_desc_hua_2', language);
            
            // Li Zeyu
            updateTeamMember(memberDetails[7], 'team_name_lizeyu', 'team_role_sw_algo', 'team_edu_mcgill_ntu', 
                             'team_desc_lizeyu_1', 'team_desc_lizeyu_2', language);
            
            // Tai Zhenghan
            updateTeamMember(memberDetails[8], 'team_name_tai', 'team_role_5g', 'team_edu_queens_toronto', 
                             'team_desc_tai_1', 'team_desc_tai_2', language);
            
            // Guo Tongshen
            updateTeamMember(memberDetails[9], 'team_name_guo', 'team_role_llm_quant2', 'team_edu_bu', 
                             'team_desc_guo_1', 'team_desc_guo_2', language);
        }
    }
    
    // Helper function to update a team member's information
    function updateTeamMember(memberElement, nameKey, roleKey, eduKey, desc1Key, desc2Key, language) {
        if (!memberElement) return;
        
        const nameElement = memberElement.querySelector('h2');
        const roleElement = memberElement.querySelector('.member-role');
        const eduElement = memberElement.querySelector('.member-education');
        const descElements = memberElement.querySelectorAll('.member-description p');
        
        if (nameElement) nameElement.textContent = translations[nameKey][language];
        if (roleElement) roleElement.textContent = translations[roleKey][language];
        if (eduElement) eduElement.textContent = translations[eduKey][language];
        if (descElements.length >= 2) {
            descElements[0].textContent = translations[desc1Key][language];
            descElements[1].textContent = translations[desc2Key][language];
        }
    }
    
    // Function to update main page elements
    function updateMainPageElements(language) {
        // Hero section
        document.querySelector('.hero h1').textContent = translations.hero_tagline[language];
        document.querySelector('.mission-wrapper p').textContent = translations.hero_mission[language];
        document.querySelector('.scroll-btn').textContent = translations.hero_button[language];
        
        // About section
        document.querySelector('#about .section-title').textContent = translations.about_title[language];
        document.querySelector('.highlight-text').textContent = translations.about_highlight[language];
        document.querySelector('.main-text').textContent = translations.about_description[language];
        document.querySelector('.team-link-text').textContent = translations.about_team_link[language];
        
        // Capabilities section
        document.querySelector('#capabilities .section-title').textContent = translations.capabilities_title[language];
        document.querySelector('.capabilities-headline').textContent = translations.capabilities_headline[language];
        
        // Capabilities - AI
        const capabilityItems = document.querySelectorAll('.capability-item');
        const capabilityAI = capabilityItems[0];
        capabilityAI.querySelector('h3').textContent = translations.capability_ai_title[language];
        capabilityAI.querySelector('.main-capability').textContent = translations.capability_ai_main[language];
        const aiListItems = capabilityAI.querySelectorAll('.capability-list li');
        aiListItems[0].textContent = translations.capability_ai_item1[language];
        aiListItems[1].textContent = translations.capability_ai_item2[language];
        aiListItems[2].textContent = translations.capability_ai_item3[language];
        aiListItems[3].textContent = translations.capability_ai_item4[language];
        capabilityAI.querySelector('.value-prop').textContent = translations.capability_ai_value[language];
        
        // Capabilities - Dev
        const capabilityDev = capabilityItems[1];
        capabilityDev.querySelector('h3').textContent = translations.capability_dev_title[language];
        capabilityDev.querySelector('.main-capability').textContent = translations.capability_dev_main[language];
        const devListItems = capabilityDev.querySelectorAll('.capability-list li');
        devListItems[0].textContent = translations.capability_dev_item1[language];
        devListItems[1].textContent = translations.capability_dev_item2[language];
        devListItems[2].textContent = translations.capability_dev_item3[language];
        devListItems[3].textContent = translations.capability_dev_item4[language];
        capabilityDev.querySelector('.value-prop').textContent = translations.capability_dev_value[language];
        
        // Capabilities - DX
        const capabilityDX = capabilityItems[2];
        capabilityDX.querySelector('h3').textContent = translations.capability_dx_title[language];
        capabilityDX.querySelector('.main-capability').textContent = translations.capability_dx_main[language];
        const dxListItems = capabilityDX.querySelectorAll('.capability-list li');
        dxListItems[0].textContent = translations.capability_dx_item1[language];
        dxListItems[1].textContent = translations.capability_dx_item2[language];
        dxListItems[2].textContent = translations.capability_dx_item3[language];
        dxListItems[3].textContent = translations.capability_dx_item4[language];
        capabilityDX.querySelector('.value-prop').textContent = translations.capability_dx_value[language];
        
        // Portfolio section
        document.querySelector('#portfolio .section-title').textContent = translations.portfolio_title[language];
        
        // Portfolio cards
        const portfolioCards = document.querySelectorAll('.portfolio-card');
        // Garbage system
        portfolioCards[0].querySelector('.card-title').textContent = translations.portfolio_garbage_title[language];
        portfolioCards[0].querySelector('.card-description').textContent = translations.portfolio_garbage_description[language];
        // Chatbot
        portfolioCards[1].querySelector('.card-title').textContent = translations.portfolio_chatbot_title[language];
        portfolioCards[1].querySelector('.card-description').textContent = translations.portfolio_chatbot_description[language];
        
        // Contact section
        document.querySelector('#contact .section-title').textContent = translations.contact_title[language];
        document.querySelector('.contact-headline').textContent = translations.contact_headline[language];
        
        // Contact info
        const infoItems = document.querySelectorAll('.info-item');
        // WeChat
        infoItems[0].querySelector('h3').textContent = translations.contact_wechat[language];
        infoItems[0].querySelector('p').textContent = translations.contact_wechat_hint[language];
        // Phone
        infoItems[1].querySelector('h3').textContent = translations.contact_phone[language];
        // Email
        infoItems[2].querySelector('h3').textContent = translations.contact_email[language];
        // Address
        infoItems[3].querySelector('h3').textContent = translations.contact_address[language];
        infoItems[3].querySelector('p').textContent = translations.contact_location[language];
        
        // AI Chat section
        document.querySelector('#ai-chat .section-title').textContent = translations.ai_chat_title[language];
    }
}); 