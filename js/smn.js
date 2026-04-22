// 励志语录库
const inspirationalQuotes = [
    "就像东海帝皇一样，真正的强者不是从不跌倒，而是每次跌倒后都能重新站起来！",
    "青春的意义在于奋斗，就像赛马娘在赛道上挥洒汗水，我们在人生道路上也要全力以赴！",
    "每一次训练都是为了更好的自己，每一次努力都在为梦想铺路！",
    "不要害怕失败，因为失败是成功的前奏。东海帝皇教会我们，坚持就是胜利！",
    "在青春的赛道上，我们都是骑手，驾驭着梦想奔向远方！",
    "今天的努力，是为了明天更好的自己。让东海帝皇的精神照亮你的前行之路！",
    "无论遇到什么困难，都要像东海帝皇一样，保持优雅的姿态和坚定的信念！",
    "青春不设限，梦想无边界。让我们一起在人生的赛道上创造奇迹！"
];

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    const inspireBtn = document.getElementById('inspireBtn');
    
    if (inspireBtn) {
        inspireBtn.addEventListener('click', showRandomInspiration);
    }
    
    // 初始化导航栏功能
    initNavigation();
    
    // 初始化音乐播放器
    initMusicPlayer();
    
    // 添加页面加载动画效果
    addPageAnimations();
});

// 初始化音乐播放器功能
function initMusicPlayer() {
    const audio = document.getElementById('characterSong');
    const playBtn = document.getElementById('musicPlayBtn');
    const progressBar = document.getElementById('musicProgress');
    const progressFill = progressBar.querySelector('.progress-fill');
    const currentTimeEl = document.querySelector('.current-time');
    const durationEl = document.querySelector('.duration');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    
    let isFirstPlay = true;
    
    if (!audio || !playBtn) return;
    
    // 首次点击触发播放
    playBtn.addEventListener('click', function() {
        if (isFirstPlay) {
            // 首次播放，显示播放界面
            audio.play().then(() => {
                playBtn.classList.add('playing');
                isFirstPlay = false;
            }).catch(error => {
                console.error('播放失败:', error);
            });
        } else {
            // 非首次播放，正常切换播放/暂停
            if (audio.paused) {
                audio.play();
                playBtn.classList.add('playing');
            } else {
                audio.pause();
                playBtn.classList.remove('playing');
            }
        }
    });
    
    // 更新进度条
    audio.addEventListener('timeupdate', function() {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        const progressPercent = (currentTime / duration) * 100;
        
        progressFill.style.width = progressPercent + '%';
        
        // 更新时间显示
        currentTimeEl.textContent = formatTime(currentTime);
        if (duration) {
            durationEl.textContent = formatTime(duration);
        }
    });
    
    // 点击进度条跳转
    progressBar.addEventListener('click', function(e) {
        const rect = progressBar.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        audio.currentTime = percent * audio.duration;
    });
    
    // 音量控制
    volumeBtn.addEventListener('click', function() {
        if (audio.volume > 0) {
            audio.volume = 0;
            volumeBtn.classList.add('muted');
        } else {
            audio.volume = volumeSlider.value;
            volumeBtn.classList.remove('muted');
        }
    });
    
    volumeSlider.addEventListener('input', function() {
        audio.volume = volumeSlider.value;
        if (audio.volume > 0) {
            volumeBtn.classList.remove('muted');
        }
    });
    
    // 音频播放结束
    audio.addEventListener('ended', function() {
        playBtn.classList.remove('playing');
        audio.currentTime = 0;
    });
    
    // 格式化时间显示
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return mins + ':' + (secs < 10 ? '0' : '') + secs;
    }
    
    // 音频加载完成后更新总时长
    audio.addEventListener('loadedmetadata', function() {
        durationEl.textContent = formatTime(audio.duration);
    });
}

// 初始化导航栏功能
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // 平滑滚动功能
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // 移动端点击后关闭菜单
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });
    
    // 汉堡菜单切换
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // 滚动时高亮当前章节
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 100;
        
        // 滚动时导航栏样式变化
        if (scrollPosition > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // 高亮当前章节
        const sections = document.querySelectorAll('section[id]');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    });
    
    // 点击导航栏品牌返回顶部
    const navBrand = document.querySelector('.nav-brand');
    if (navBrand) {
        navBrand.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // 点击菜单外区域关闭移动端菜单
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            const isClickInsideMenu = navMenu.contains(e.target) || hamburger.contains(e.target);
            if (!isClickInsideMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
}

// 显示随机励志语录
function showRandomInspiration() {
    const randomIndex = Math.floor(Math.random() * inspirationalQuotes.length);
    const quote = inspirationalQuotes[randomIndex];
    
    // 创建弹窗元素
    const modal = document.createElement('div');
    modal.className = 'inspiration-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <h3>今日激励</h3>
            <p>${quote}</p>
            <button class="modal-ok-btn">继续前行！</button>
        </div>
    `;
    
    // 添加到页面
    document.body.appendChild(modal);
    
    // 显示弹窗
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    
    // 关闭弹窗事件
    const closeBtn = modal.querySelector('.close-btn');
    const okBtn = modal.querySelector('.modal-ok-btn');
    
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    okBtn.addEventListener('click', closeModal);
    
    // 点击背景关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// 添加页面动画效果
function addPageAnimations() {
    // 为重要元素添加滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.inspiration-section, .inspiration-content, .cta-button');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// 添加弹窗样式到页面
const modalStyles = `
    .inspiration-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .inspiration-modal.show {
        opacity: 1;
    }
    
    .modal-content {
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        position: relative;
        transform: scale(0.7);
        transition: transform 0.3s ease;
    }
    
    .inspiration-modal.show .modal-content {
        transform: scale(1);
    }
    
    .close-btn {
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 24px;
        cursor: pointer;
        color: #666;
    }
    
    .modal-content h3 {
        color: #667eea;
        margin-bottom: 15px;
        font-size: 1.5rem;
    }
    
    .modal-content p {
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 20px;
        color: #333;
    }
    
    .modal-ok-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 10px 25px;
        border-radius: 25px;
        cursor: pointer;
        font-size: 1rem;
        transition: transform 0.2s ease;
    }
    
    .modal-ok-btn:hover {
        transform: translateY(-1px);
    }
    
    /* 滚动动画 */
    .animate-in {
        animation: fadeInUp 0.6s ease-out;
    }
`;

// 将样式添加到页面
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);