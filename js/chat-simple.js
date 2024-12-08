document.addEventListener('DOMContentLoaded', () => {
    // 聊天界面元素
    const aiChatSection = document.querySelector('#ai-chat');
    const aiChatContent = document.querySelector('.ai-chat-content');
    const chatBubble = document.querySelector('.chat-bubble-button');
    const chatContainer = document.querySelector('.chat-container');
    const closeChat = document.querySelector('.close-chat');
    
    // 悬浮框聊天元素
    const floatInput = chatContainer.querySelector('.chat-input input');
    const floatSendBtn = chatContainer.querySelector('.send-message');
    const floatMessages = chatContainer.querySelector('.chat-messages');
    
    // 页面内聊天元素
    const pageInput = aiChatContent.querySelector('.chat-input input');
    const pageSendBtn = aiChatContent.querySelector('.send-message');
    const pageMessages = aiChatContent.querySelector('.chat-messages');

    let isTransitioning = false;

    // 共享的对话历史
    let conversationHistory = [{
        role: "system",
        content: systemPrompt
    }, {
        role: "assistant",
        content: "您好！我是Simple Way AI的智能助手，很高兴为您服务。"
    }];

    // 发送消息的主函数
    async function sendMessage(input, messages) {
        const message = input.value.trim();
        if (message) {
            // 禁用所有输入和发送按钮
            floatInput.disabled = pageInput.disabled = true;
            floatSendBtn.disabled = pageSendBtn.disabled = true;

            // 添加用户消息到两个界面
            addMessage(message, 'user', floatMessages);
            addMessage(message, 'user', pageMessages);
            input.value = '';
            
            // 在两个界面添加思考状态
            const thinkingDiv1 = createThinkingDiv();
            const thinkingDiv2 = createThinkingDiv();
            floatMessages.appendChild(thinkingDiv1);
            pageMessages.appendChild(thinkingDiv2);
            floatMessages.scrollTop = floatMessages.scrollHeight;
            pageMessages.scrollTop = pageMessages.scrollHeight;

            // 更新对话历史
            conversationHistory.push({
                role: "user",
                content: message
            });

            // 调用API获取回复
            const reply = await callAPI(conversationHistory);
            
            // 移除思考状态
            floatMessages.removeChild(thinkingDiv1);
            pageMessages.removeChild(thinkingDiv2);
            
            // 添加AI回复到两个界面
            await Promise.all([
                addMessage(reply, 'system', floatMessages),
                addMessage(reply, 'system', pageMessages)
            ]);

            // 更新对话历史
            conversationHistory.push({
                role: "assistant",
                content: reply
            });

            // 保持最近的对话记录
            if (conversationHistory.length > 10) {
                conversationHistory = [
                    conversationHistory[0],
                    ...conversationHistory.slice(-9)
                ];
            }

            // 重新启用所有输入和发送按钮
            floatInput.disabled = pageInput.disabled = false;
            floatSendBtn.disabled = pageSendBtn.disabled = false;
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

    // 添���消息到聊天框
    async function addMessage(text, type, messagesContainer) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);
        
        if (type === 'system') {
            messageDiv.classList.add('typing');
            messagesContainer.appendChild(messageDiv);
            await typewriterEffect(messageDiv, text);
        } else {
            messageDiv.textContent = text;
            messagesContainer.appendChild(messageDiv);
        }
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // 处理滚动事件
    const handleScroll = () => {
        if (isTransitioning) return;

        const rect = aiChatSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.7 && rect.bottom > 0;

        if (isInView) {
            // 在"与AI聊聊"区域，强制关闭小对话框
            if (chatContainer.classList.contains('active')) {
                chatContainer.classList.remove('active');
                chatContainer.style.opacity = '0';
                chatContainer.style.visibility = 'hidden';
            }
            chatBubble.style.pointerEvents = 'none'; // 禁用气泡点击
        } else {
            // 离开区域，恢复气泡点击功能
            chatBubble.style.pointerEvents = 'auto';
        }
    };

    // 点击气泡展开聊天框
    chatBubble.addEventListener('click', () => {
        const rect = aiChatSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.7 && rect.bottom > 0;

        if (!isInView) {  // 只在不在视图内时响应点击
            if (chatContainer.classList.contains('active')) {
                // 如果已经展开，则收起
                chatContainer.classList.remove('active');
                chatContainer.style.opacity = '0';
                chatContainer.style.visibility = 'hidden';
            } else {
                // 如果已经收起，则展开
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
    pageSendBtn.addEventListener('click', () => sendMessage(pageInput, pageMessages));
    
    floatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage(floatInput, floatMessages);
    });
    
    pageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage(pageInput, pageMessages);
    });

    // 添加事件监听
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
});