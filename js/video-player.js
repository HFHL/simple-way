/**
 * 视频播放器功能
 * 处理点击图片后显示视频播放器的逻辑
 */
document.addEventListener('DOMContentLoaded', () => {
    // 寻找所有添加了 video-trigger 类的元素
    const videoTriggers = document.querySelectorAll('.video-trigger');
    
    videoTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // 获取视频路径
            const videoSrc = this.getAttribute('data-video-src');
            if (!videoSrc) return;
            
            // 创建模态框
            const modal = document.createElement('div');
            modal.className = 'video-modal';
            
            // 创建视频播放器
            const videoPlayer = document.createElement('div');
            videoPlayer.className = 'video-player-container';
            
            // 视频内容
            videoPlayer.innerHTML = `
                <div class="video-close-btn">&times;</div>
                <video controls autoplay class="video-player">
                    <source src="${videoSrc}" type="video/mp4">
                    您的浏览器不支持视频播放。
                </video>
            `;
            
            modal.appendChild(videoPlayer);
            document.body.appendChild(modal);
            
            // 禁止背景滚动
            document.body.style.overflow = 'hidden';
            
            // 添加动画效果
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            
            // 关闭按钮
            const closeBtn = modal.querySelector('.video-close-btn');
            closeBtn.addEventListener('click', closeVideoModal);
            
            // 点击模态框背景关闭
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeVideoModal();
                }
            });
            
            // ESC 键关闭
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeVideoModal();
                }
            });
            
            function closeVideoModal() {
                modal.classList.remove('active');
                
                // 延迟移除元素
                setTimeout(() => {
                    document.body.removeChild(modal);
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    });
}); 