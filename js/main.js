document.addEventListener('DOMContentLoaded', () => {
    // 添加滚动渐入效果
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .team-member').forEach(el => {
        observer.observe(el);
    });

    // 添加导航栏滚动效果
    const nav = document.querySelector('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }

        lastScroll = currentScroll;
    });

    // 添加滚动按钮功能
    const scrollBtn = document.querySelector('.scroll-down-btn');
    if (scrollBtn) {  // 添加检查
        const featuresSection = document.querySelector('.features');
        scrollBtn.addEventListener('click', () => {
            featuresSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    initPortfolioScroll();

    // 添加微信卡片点击事件
    document.querySelector('.wechat-card').addEventListener('click', function() {
        this.classList.toggle('flipped');
    });
}); 

function scrollToNext() {
    const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const sections = document.querySelectorAll('section');
    let targetSection = null;

    // 找到下一个section
    for (const section of sections) {
        const sectionTop = section.offsetTop;
        // 修改判断条件，使用窗口高度作为参考
        if (sectionTop > currentScrollPosition + (windowHeight * 0.3)) {
            targetSection = section;
            break;
        }
    }

    // 如果找到了目标section，滚动到那里
    if (targetSection) {
        // 添加一个小延迟确保动画平滑
        setTimeout(() => {
            targetSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    } else {
        // 如果没找到section，滚动到第一个section
        sections[1].scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
} 

function generateWordCloud() {
    const wordCloud = document.querySelector('.hero .word-cloud');
    const keywords = [
        'LLM', 'Transformer', 'MySQL', 'Python', 'TensorFlow',
        'PyTorch', 'React', 'Node.js', 'Docker', 'Kubernetes',
        'RAG', 'BERT', 'GPT', 'Vue.js', 'MongoDB',
        'Redis', 'FastAPI', 'Spring Boot', 'DevOps', 'CI/CD',
        'NLP', 'Computer Vision', 'AWS', 'Microservices', 'GraphQL',
        'Kafka', 'Elasticsearch', 'Neural Networks', 'Deep Learning', 'Git'
    ];

    wordCloud.innerHTML = '';

    // 获取hero section的尺寸
    const heroSection = document.querySelector('.hero');
    const heroBounds = heroSection.getBoundingClientRect();
    const centerX = heroBounds.width / 2;
    const centerY = heroBounds.height / 2;

    // 定义标题周围的安全区域
    const safeZoneRadius = 200;  // 标题周围的空白区域半径

    keywords.forEach((word, index) => {
        const wordElement = document.createElement('div');
        wordElement.className = 'floating-word';
        wordElement.textContent = word;

        // 生成随机位置，但避开中心区域
        let x, y, distanceFromCenter;
        do {
            x = Math.random() * (heroBounds.width - 100);
            y = Math.random() * (heroBounds.height - 100);
            distanceFromCenter = Math.sqrt(
                Math.pow(x - centerX, 2) + 
                Math.pow(y - centerY, 2)
            );
        } while (distanceFromCenter < safeZoneRadius);

        // 设置位置
        wordElement.style.left = `${x}px`;
        wordElement.style.top = `${y}px`;

        // 根据距离设置透明度
        const maxDistance = Math.sqrt(Math.pow(heroBounds.width/2, 2) + Math.pow(heroBounds.height/2, 2));
        const opacity = 0.1 + (distanceFromCenter - safeZoneRadius) / (maxDistance - safeZoneRadius) * 0.3;

        // 保存原始透明度以便恢复
        wordElement.dataset.originalOpacity = opacity;
        wordElement.style.opacity = opacity;

        // 初始化位置和过渡
        wordElement.style.transform = 'translateY(0)';
        wordElement.style.transition = 'none';

        // 设置随机字体大小
        const fontSize = 0.8 + Math.random() * 0.3;  // 减小字体大小范围
        wordElement.style.fontSize = `${fontSize}rem`;

        wordCloud.appendChild(wordElement);
    });

    // 初始化滚动效果
    initWordCloudScrollEffect();
}

// 添加滚动监听和掉落动画
function initWordCloudScrollEffect() {
    const words = document.querySelectorAll('.floating-word');
    let lastScrollTop = 0;
    let isAnimating = false;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollDelta = scrollTop - lastScrollTop;
        
        // 向下滚动时
        if (scrollDelta > 0 && !isAnimating) {
            isAnimating = true;

            // 词云以较慢速度上移
            words.forEach((word, index) => {
                // 增加基础动画时间，减小随机范围使速度更统一
                const baseSpeed = 2.0 + Math.random() * 0.5;  // 2-2.5秒
                // 增加延迟间隔，使词语移动更加错落有致
                const delay = index * 50;  // 增加间隔到50ms
                
                // 使用更平缓的贝塞尔曲线
                word.style.transition = `all ${baseSpeed}s cubic-bezier(0.4, 0.1, 0.2, 1) ${delay}ms`;
                // 减小移动距离，使动画不那么剧烈
                word.style.transform = `translateY(-${window.innerHeight * (0.8 + Math.random() * 0.3)}px)`;
                // 渐变消失
                word.style.opacity = '0';
            });
        }
        // 向上滚动时恢复
        else if (scrollDelta < 0 && scrollTop < window.innerHeight) {
            isAnimating = false;

            // 词云复
            words.forEach((word, index) => {
                // 恢复时使用更长的时间
                const baseSpeed = 2.2 + Math.random() * 0.8;  // 2.2-3秒
                // 增加随机延迟，使恢复更自然
                const delay = Math.random() * 800;  // 大延迟
                
                // 使用更平缓的贝塞尔曲线
                word.style.transition = `all ${baseSpeed}s cubic-bezier(0.2, 0.6, 0.2, 1) ${delay}ms`;
                word.style.transform = 'translateY(0)';
                word.style.opacity = word.dataset.originalOpacity;
            });
        }
        
        lastScrollTop = scrollTop;
    });
}

// 页面加载和窗口调整时重新生成词云
window.addEventListener('load', generateWordCloud);
window.addEventListener('resize', generateWordCloud);

function initPortfolioScroll() {
    const container = document.querySelector('.portfolio-scroll');
    const leftArrow = document.getElementById('scrollLeft');
    const rightArrow = document.getElementById('scrollRight');

    function updateArrows() {
        const scrollLeft = container.scrollLeft;
        const maxScroll = container.scrollWidth - container.clientWidth;

        // 显示/隐藏左箭���
        leftArrow.style.display = scrollLeft > 0 ? 'flex' : 'none';
        
        // 显示/隐藏右箭头
        rightArrow.style.display = scrollLeft < maxScroll ? 'flex' : 'none';
    }

    // 点击左箭头
    leftArrow.addEventListener('click', () => {
        container.scrollBy({
            left: -container.offsetWidth,
            behavior: 'smooth'
        });
    });

    // 点击右箭头
    rightArrow.addEventListener('click', () => {
        container.scrollBy({
            left: container.offsetWidth,
            behavior: 'smooth'
        });
    });

    // 监听滚动事件
    container.addEventListener('scroll', () => {
        requestAnimationFrame(updateArrows);
    });

    // 监听窗口大小变化
    window.addEventListener('resize', updateArrows);

    // 初始化箭头状态
    updateArrows();
}

// 在页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initPortfolioScroll);