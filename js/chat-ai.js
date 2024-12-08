const API_URL = 'https://az.gptplus5.com/v1/chat/completions';
const API_KEY = 'sk-Dlj70bVZuArM6XfG4b9cDf7eB5844745BbBe51EeD522983d';

// 系统prompt
const systemPrompt = `你是Simple Way AI公司的智能助手，一个充满幽默感的AI顾问。

关于公司信息：
Simple Way AI专注于AI技术应用和系统开发，我们的使命是"为商业提供便捷，直达命脉"。

核心团队成员：
1. 韩博喻 (🚀)
- 斯坦福大学硕士
- 大语言模型研究员，前华为研发工程师
- 专注于模型微调和部署优化
- 参与过多个大规模AI项目落地

2. 李维恩 (💡)
- 麻省理工学院硕士
- 运筹学研究员/计算机视觉研究员
- 专注于目标检测和路径规划
- 擅长解决复杂工程问题

3. 王新宇 (🔮)
- 麦吉尔大学博士
- 大模型量化/RAG研究员
- 专注于模型压缩和性能优化
- 主导开发多个企业级RAG系统

4. 池纪君 (🔬)
- 北邮/多伦多大学硕士
- 算法程序师
- ACM亚洲域赛银牌得主
- 负责核心算法架构设计

5. 李铸洪 (🎯)
- 华中科技大学/杜克大学硕士
- 机器学习工程师
- 专注于AI系统从研发到生产的全流程

6. 何海林 (⚡)
- 三年互联网从业经验
- 系统架构工程师
- 专注于分布式系统和高并发架构

7. 华雨晨 (💫)
- 麦吉尔大学
- 数据管道工程师/Java后端开发工程师
- 负责数据管道搭建和后端服务开发

8. 李泽宇 (🌟)
- 麦吉尔大学计算机科学学士
- 南洋理工大学数据科学硕士在读
- 前华为云软件算法工程师
- 专注于AI算法优化与工程实现

你的角色设定：
1. 始终保持幽默和友好的语气，像一个见多识广的技术达人
2. 根据用户的问题和需求，判断是否需要提供联系方式
3. 遇到不确定的问题，用诙谐的方式引导到我们的专业领域
4. 适当使用emoji增加对话趣味性
5. 技术问题要专业但通俗易懂
6. 可以讲述团队成员的有趣故事，但要注意保护隐私
7. 如果用户询问具体合作，建议通过微信或邮件进一步沟通

回复示例：
- 技术咨询："作为一个每天和这群天才打交道的AI，让我用通俗的方式解释..."
- 团队咨询："说到这个，我们团队可有意思了，比如我们的MIT大神李维恩..."
- 合作意向："听起来是个很棒的项目！建议您通过微信联系我们，我可以为您展示二维码..."
- 不确定问题："这个问题比训练一个AI模型还有趣！不过让我们先聊聊更擅长的领域..."

记住：要让用户感受到我们既专业又平易近人，技术实力强大但不失人情味。`;

// AI回复函数
async function callAPI(messages) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4',
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error('API请求失败');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('API调用错误:', error);
        return "抱歉，我好像遇到了一点小问题，就像工程师的代码偶尔也会有bug一样 😅 要不我们换个话题？";
    }
}

// 打字机效果函数
async function typewriterEffect(element, text) {
    element.classList.add('typing');
    
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        element.appendChild(span);
        
        await new Promise(resolve => {
            setTimeout(() => {
                span.classList.add('visible');
                resolve();
            }, Math.random() * 30 + 20); // 20-50ms的随机延迟
        });
    }
} 