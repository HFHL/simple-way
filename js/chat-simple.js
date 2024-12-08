document.addEventListener('DOMContentLoaded', () => {
    // 聊天界面元素
    const aiChatSection = document.querySelector('#ai-chat');
    const aiChatContent = aiChatSection?.querySelector('.ai-chat-content');
    const chatBubble = document.querySelector('.chat-bubble-button');
    const chatContainer = document.querySelector('.chat-container');
    const closeChat = document.querySelector('.close-chat');
    
    // 悬浮框聊天元素
    const floatInput = chatContainer.querySelector('.chat-input input');
    const floatSendBtn = chatContainer.querySelector('.send-message');
    const floatMessages = chatContainer.querySelector('.chat-messages');
    
    // 页面内聊天元素（如果存在）
    const pageInput = aiChatContent?.querySelector('.chat-input input');
    const pageSendBtn = aiChatContent?.querySelector('.send-message');
    const pageMessages = aiChatContent?.querySelector('.chat-messages');

    let isTransitioning = false;

    // 从本地存储加载对话历史
    const savedHistory = localStorage.getItem('chatHistory');
    let conversationHistory = savedHistory ? JSON.parse(savedHistory) : [{
        role: "system",
        content: systemPrompt
    }, {
        role: "assistant",
        content: "您好！我是Simple Way AI的智能助手，很高兴为您服务。"
    }];

    // 在更新对话历史时保存到本地存储
    function updateHistory(newMessage) {
        // 先获取最新的历史记录
        const currentHistory = localStorage.getItem('chatHistory');
        conversationHistory = currentHistory ? JSON.parse(currentHistory) : [{
            role: "system",
            content: systemPrompt
        }, {
            role: "assistant",
            content: "您好！我是Simple Way AI的智能助手，很高兴为您服务。"
        }];

        // 添加新消息
        conversationHistory.push(newMessage);
        if (conversationHistory.length > 10) {
            conversationHistory = [
                conversationHistory[0],
                ...conversationHistory.slice(-9)
            ];
        }
        
        // 保存到本地存储
        localStorage.setItem('chatHistory', JSON.stringify(conversationHistory));
    }

    // 发送消息的主函数
    async function sendMessage(input, messages) {
        const message = input.value.trim();
        if (message) {
            // 禁用当前输入和发送按钮
            input.disabled = true;
            const sendBtn = input.nextElementSibling;
            sendBtn.disabled = true;

            // 添加用户消息
            addMessage(message, 'user', messages);
            input.value = '';
            
            // 添加思考状态
            const thinkingDiv = createThinkingDiv();
            messages.appendChild(thinkingDiv);
            messages.scrollTop = messages.scrollHeight;

            // 更新对话历史
            updateHistory({
                role: "user",
                content: message
            });

            // 调用API获取回复
            const reply = await callAPI(conversationHistory);
            
            // 移除思考状态
            messages.removeChild(thinkingDiv);
            
            // 添加AI回复
            await addMessage(reply, 'system', messages);

            // 更新对话历史
            updateHistory({
                role: "assistant",
                content: reply
            });

            // 重新启用输入和发送按钮
            input.disabled = false;
            sendBtn.disabled = false;
            input.focus();
        }
    }

    function createThinkingDiv() {
        const div = document.createElement('div');
        div.classList.add('message', 'system', 'thinking');
        div.innerHTML = `
            正在思考
            <div class="thinking-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        return div;
    }

    // 添加消息到聊天框
    async function addMessage(text, type, messagesContainer) {
        // 同步到所有聊天界面
        const allMessageContainers = [
            floatMessages,  // 悬浮框
            pageMessages,   // 与AI聊聊区域
        ].filter(container => container); // 过滤掉不存在的容器

        for (const container of allMessageContainers) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', type);
            
            if (type === 'system') {
                messageDiv.classList.add('typing');
                container.appendChild(messageDiv);
                if (container === messagesContainer) {
                    await typewriterEffect(messageDiv, text);
                } else {
                    messageDiv.textContent = text;
                }
            } else {
                messageDiv.textContent = text;
                container.appendChild(messageDiv);
            }
            container.scrollTop = container.scrollHeight;
        }
    }

    // 处理滚动事件
    const handleScroll = () => {
        if (isTransitioning || !aiChatSection) return; // 如果不在首页，直接返回

        const rect = aiChatSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.7 && rect.bottom > 0;

        if (isInView) {
            if (chatContainer.classList.contains('active')) {
                chatContainer.classList.remove('active');
                chatContainer.style.opacity = '0';
                chatContainer.style.visibility = 'hidden';
            }
            chatBubble.style.pointerEvents = 'none';
        } else {
            chatBubble.style.pointerEvents = 'auto';
        }
    };

    // 点击气泡展开聊天框
    chatBubble.addEventListener('click', () => {
        // 如果不在首页，或者不在AI聊天区域视图内，则允许展开
        const isInAiSection = aiChatSection && 
            aiChatSection.getBoundingClientRect().top < window.innerHeight * 0.7 && 
            aiChatSection.getBoundingClientRect().bottom > 0;

        if (!aiChatSection || !isInAiSection) {
            if (chatContainer.classList.contains('active')) {
                chatContainer.classList.remove('active');
                chatContainer.style.opacity = '0';
                chatContainer.style.visibility = 'hidden';
            } else {
                chatContainer.classList.add('active');
                chatContainer.style.opacity = '1';
                chatContainer.style.visibility = 'visible';
            }
        }
    });

    // 点击关闭按钮
    closeChat.addEventListener('click', () => {
        chatContainer.classList.remove('active');
        chatContainer.style.opacity = '0';
        chatContainer.style.visibility = 'hidden';
    });

    // 事件监听
    floatSendBtn.addEventListener('click', () => sendMessage(floatInput, floatMessages));
    if (pageSendBtn) {
        pageSendBtn.addEventListener('click', () => sendMessage(pageInput, pageMessages));
    }
    
    floatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage(floatInput, floatMessages);
    });
    
    if (pageInput) {
        pageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage(pageInput, pageMessages);
        });
    }

    // 添加事件监听
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // 在页面离开前关闭对话框
    window.addEventListener('beforeunload', () => {
        if (chatContainer.classList.contains('active')) {
            chatContainer.classList.remove('active');
            chatContainer.style.opacity = '0';
            chatContainer.style.visibility = 'hidden';
        }
    });

    // 初始化聊天界面
    function initChat() {
        const allMessageContainers = [
            chatContainer.querySelector('.chat-messages'),  // 使用当前页面的容器引用
            aiChatContent?.querySelector('.chat-messages')
        ].filter(container => container);

        // 清空所有聊天界面
        allMessageContainers.forEach(container => {
            container.innerHTML = '';
        });
        
        // 从本地存储加载历史记录
        const savedHistory = localStorage.getItem('chatHistory');
        if (savedHistory) {
            const history = JSON.parse(savedHistory);
            // 更新内存中的对话历史
            conversationHistory = history;
            
            // 显示历史消息
            history.forEach(msg => {
                if (msg.role !== 'system') {
                    allMessageContainers.forEach(container => {
                        const messageDiv = document.createElement('div');
                        messageDiv.classList.add('message', msg.role === 'assistant' ? 'system' : 'user');
                        messageDiv.textContent = msg.content;
                        container.appendChild(messageDiv);
                    });
                }
            });
        } else {
            // 如果没有历史记录，初始化对话历史
            conversationHistory = [{
                role: "system",
                content: systemPrompt
            }, {
                role: "assistant",
                content: "您好！我是Simple Way AI的智能助手，很高兴为您服务。"
            }];
            localStorage.setItem('chatHistory', JSON.stringify(conversationHistory));
            
            // 显示欢迎消息
            allMessageContainers.forEach(container => {
                const welcomeDiv = document.createElement('div');
                welcomeDiv.classList.add('message', 'system');
                welcomeDiv.textContent = "您好！我是Simple Way AI的智能助手，很高兴为您服务。";
                container.appendChild(welcomeDiv);
            });
        }
    }

    // 初始化聊天界面
    initChat();
});