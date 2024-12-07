class AIChat {
    constructor() {
        this.apiKey = 'sk-Dlj70bVZuArM6XfG4b9cDf7eB5844745BbBe51EeD522983d  ';
        this.baseUrl = 'https://az.gptplus5.com/v1';
        this.chatMessages = document.querySelector('.chat-messages');
        this.chatInput = document.getElementById('chatInput');
        this.sendButton = document.getElementById('sendMessage');
        this.chatIcon = document.getElementById('chatIcon');
        this.chatBox = document.getElementById('chatBox');
        this.chatClose = document.getElementById('chatClose');

        this.init();
    }

    init() {
        // 聊天框的显示和隐藏
        this.chatIcon.addEventListener('click', () => {
            this.chatBox.style.display = 'flex';
            this.chatIcon.style.display = 'none';
        });

        this.chatClose.addEventListener('click', () => {
            this.chatBox.style.display = 'none';
            this.chatIcon.style.display = 'flex';
        });

        // 添加选项按钮的点击处理
        this.chatMessages.addEventListener('click', (e) => {
            const option = e.target.closest('.chat-option');
            if (option) {
                const message = option.textContent.trim();
                this.chatInput.value = message;
                this.sendMessage();
            }
        });

        // 发送消息的事件监听
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    async sendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        // 清空输入框
        this.chatInput.value = '';

        // 添加用户消息到聊天框
        this.addMessage(message, 'user');

        // 添加正在输入的提示
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot';
        typingDiv.innerHTML = `
            <div class="message-content typing-indicator">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;

        try {
            const response = await fetch(`${this.baseUrl}/chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: `你是 Simple Way AI 公司的智能助手。我们是一家专注于AI技术的创新公司，团队成员来自斯坦福、MIT、吉尔等顶尖院校。

                            主要信息：
                            1. 团队成员：
                            - 韩博喻：斯坦福大学硕士，大语言模型研究员，前华为研发
                            - 李维恩：MIT硕士，运筹学和计算机视觉研究员
                            - 王新宇：麦吉尔大学博士，大模型量化/RAG研究员
                            - 池纪君：多伦多大学硕士，算法工程师，ACM亚洲区域赛银牌
                            - 李铸洪：杜克大学硕士，机器学习工程师
                            - 何海林：系统架构工程师，三年互联网经验
                            - 华雨晨：麦吉尔大学，数据管道工程师

                            2. 核心业务：
                            - 企业级大语言模型定制
                            - 工业视觉检测系统
                            - 智能客服解决方案

                            3. 联系方式：
                            - 电话：(+86) 18188383927
                            - 邮箱：feiyuzi51@gmail.com
                            - 网站：www.simpleway.ai

                            回答准则：
                            1. 保持专业、友好的语气
                            2. 先回答与公司相关的问题
                            3. 如果遇到日常闲聊问题，简短回应后将话题引导到公司业务上
                            4. 回答要简洁，避免过长
                            5. 鼓励用户了解我们的团队和技术能力
                            6. 遇到不确定的信息，建议用户直接联系我们

                            示例回答：
                            Q: "你吃饭了吗？"
                            A: "谢谢关心！作为AI助手，我不需要用餐。不过说到这个，我们团队正在开发的智能客服系统就能像我这样自然地与用户交流。您想了解更多关于我们的AI技术吗？"
                            
                            Q: "天气真好啊"
                            A: "确实是个好天气！这让我想到我们的计算机视觉系统在晴天时的识别准确率特别高。您对AI视觉技术感兴趣吗？"`
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    temperature: 0.1
                })
            });

            const data = await response.json();
            
            // 移除输入提示
            typingDiv.remove();
            
            if (data.choices && data.choices[0]) {
                const aiResponse = data.choices[0].message.content;
                this.addMessage(aiResponse, 'bot');
            } else {
                throw new Error('Invalid response from API');
            }
        } catch (error) {
            console.error('Error:', error);
            // 移除输入提示
            typingDiv.remove();
            this.addMessage(`抱歉，AI助手正在升级维护中。您可以通过以下方式直接联系我们：

📞 电话：(+86) 18188383927
📧 邮箱：feiyuzi51@gmail.com

我们会尽快回复您的咨询。`, 'bot');
        }
    }

    addMessage(content, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.innerHTML = '<div class="message-content"></div>';
        this.chatMessages.appendChild(messageDiv);
        
        const messageContent = messageDiv.querySelector('.message-content');
        let index = 0;
        
        // 如果是用户消息，直接显示
        if (type === 'user') {
            messageContent.textContent = content;
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
            return;
        }
        
        // 如果是机器人消息，使用打字机效果
        const typeWriter = () => {
            if (index < content.length) {
                messageContent.textContent += content.charAt(index);
                index++;
                this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
                setTimeout(typeWriter, 30); // 控制打字速度，可以调整数值
            }
        };
        
        typeWriter();
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
}

// 初始化聊天功能
document.addEventListener('DOMContentLoaded', () => {
    new AIChat();
});