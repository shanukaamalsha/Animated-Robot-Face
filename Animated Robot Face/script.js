// Robot Face Animation Controller
class RobotFace {
    constructor() {
        this.leftEye = document.getElementById('leftEye');
        this.rightEye = document.getElementById('rightEye');
        this.eyesContainer = document.getElementById('eyesContainer');
        this.robotFace = document.getElementById('robotFace');
        this.emotionIndicator = document.getElementById('emotionIndicator');
        this.particlesContainer = document.getElementById('particles');
        this.emotionEmojisContainer = document.getElementById('emotionEmojis');
        
        this.currentEmotion = 'neutral';
        this.autoMode = false;
        this.mouseX = 0;
        this.mouseY = 0;
        this.eyeCenterX = 0;
        this.eyeCenterY = 0;
        this.isEmotionActive = false;
        this.emotionTimeout = null;
        
        // Audio elements
        this.bubblePopAudio = new Audio('assets/bubble-pop.mp3');
        this.robotVoiceAudio = new Audio('assets/robot-voice.mp3');
        this.robotVoiceAudio.loop = true;
        this.robotVoiceAudio.volume = 0.3;
        
        this.emotions = {
            neutral: { name: 'Neutral', duration: 2000, emoji: '😐' },
            happy: { name: 'Happy', duration: 3000, emoji: '😊' },
            sad: { name: 'Sad', duration: 2500, emoji: '😢' },
            surprised: { name: 'Surprised', duration: 1500, emoji: '😲' },
            angry: { name: 'Angry', duration: 2000, emoji: '😠' },
            sleepy: { name: 'Sleepy', duration: 4000, emoji: '😴' },
            excited: { name: 'Excited', duration: 2000, emoji: '🤩' },
            confused: { name: 'Confused', duration: 3000, emoji: '😵' },
            love: { name: 'Love', duration: 3500, emoji: '🥰' },
            wink: { name: 'Wink', duration: 1000, emoji: '😉' }
        };
        
        this.autoEmotions = Object.keys(this.emotions);
        this.autoModeInterval = null;
        this.emojiInterval = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.calculateEyeCenter();
        this.createParticles();
        this.startBlinking();
        this.startEmojiSystem();
        this.updateEyePosition();
        
        // Start background robot voice
        this.startRobotVoice();
        
        // Initial emotion
        this.setEmotion('neutral');
    }
    
    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.updateEyePosition();
        });
        
        document.addEventListener('click', () => {
            this.triggerRandomEmotion();
        });
        
        // Touch events for mobile
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.mouseX = touch.clientX;
            this.mouseY = touch.clientY;
            this.updateEyePosition();
        });
        
        // Window resize
        window.addEventListener('resize', () => {
            this.calculateEyeCenter();
        });
    }
    
    calculateEyeCenter() {
        const rect = this.eyesContainer.getBoundingClientRect();
        this.eyeCenterX = rect.left + rect.width / 2;
        this.eyeCenterY = rect.top + rect.height / 2;
    }
    
    updateEyePosition() {
        if (!this.leftEye || !this.rightEye) return;
        
        const maxMove = 8; // Maximum eye movement in pixels
        const sensitivity = 0.2; // How sensitive the eyes are to mouse movement
        
        // Calculate distance from center
        const deltaX = (this.mouseX - this.eyeCenterX) * sensitivity;
        const deltaY = (this.mouseY - this.eyeCenterY) * sensitivity;
        
        // Limit movement
        const moveX = Math.max(-maxMove, Math.min(maxMove, deltaX));
        const moveY = Math.max(-maxMove, Math.min(maxMove, deltaY));
        
        // Apply movement to both eyes (only when not in emotion state)
        if (!this.isEmotionActive) {
            this.leftEye.style.transform = `translate(${moveX}px, ${moveY}px)`;
            this.rightEye.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    }
    
    setEmotion(emotion) {
        if (!this.emotions[emotion]) return;
        
        // Clear any existing emotion timeout
        if (this.emotionTimeout) {
            clearTimeout(this.emotionTimeout);
        }
        
        this.currentEmotion = emotion;
        this.isEmotionActive = true;
        const emotionData = this.emotions[emotion];
        
        // Remove all emotion classes and reset styles
        this.leftEye.className = 'eye';
        this.rightEye.className = 'eye';
        this.leftEye.style.background = '#00ffff';
        this.rightEye.style.background = '#00ffff';
        this.leftEye.style.transform = '';
        this.rightEye.style.transform = '';
        
        // Apply emotion-specific classes and animations
        switch (emotion) {
            case 'happy':
                this.leftEye.classList.add('happy');
                this.rightEye.classList.add('happy');
                break;
            case 'sad':
                this.leftEye.classList.add('sad');
                this.rightEye.classList.add('sad');
                break;
            case 'surprised':
                this.leftEye.classList.add('surprised');
                this.rightEye.classList.add('surprised');
                break;
            case 'angry':
                this.leftEye.classList.add('angry');
                this.rightEye.classList.add('angry');
                this.leftEye.style.background = '#ff0000';
                this.rightEye.style.background = '#ff0000';
                setTimeout(() => {
                    this.leftEye.style.background = '#00ffff';
                    this.rightEye.style.background = '#00ffff';
                }, 2000);
                break;
            case 'sleepy':
                this.leftEye.classList.add('sleepy');
                this.rightEye.classList.add('sleepy');
                break;
            case 'excited':
                this.leftEye.classList.add('excited');
                this.rightEye.classList.add('excited');
                break;
            case 'confused':
                this.leftEye.classList.add('confused');
                this.rightEye.classList.add('confused');
                break;
            case 'love':
                this.leftEye.classList.add('love');
                this.rightEye.classList.add('love');
                this.leftEye.style.background = '#ff0080';
                this.rightEye.style.background = '#ff0080';
                setTimeout(() => {
                    this.leftEye.style.background = '#00ffff';
                    this.rightEye.style.background = '#00ffff';
                }, 3500);
                break;
            case 'wink':
                this.rightEye.classList.add('wink');
                break;
        }
        
        // Show emotion indicator
        this.showEmotionIndicator(emotionData.name);
        
        // Return to neutral after emotion duration
        this.emotionTimeout = setTimeout(() => {
            if (this.currentEmotion === emotion) {
                this.setEmotion('neutral');
            }
        }, emotionData.duration);
        
        // Special handling for neutral state
        if (emotion === 'neutral') {
            this.isEmotionActive = false;
            this.currentEmotion = 'neutral';
        }
    }
    
    showEmotionIndicator(text) {
        this.emotionIndicator.textContent = text;
        this.emotionIndicator.classList.add('show');
        
        setTimeout(() => {
            this.emotionIndicator.classList.remove('show');
        }, 2000);
    }
    
    triggerRandomEmotion() {
        if (this.autoMode) return;
        
        const emotions = Object.keys(this.emotions).filter(e => e !== 'neutral');
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        this.setEmotion(randomEmotion);
    }
    
    startBlinking() {
        setInterval(() => {
            if (this.currentEmotion === 'neutral' && !this.autoMode) {
                this.leftEye.classList.add('blinking');
                this.rightEye.classList.add('blinking');
                
                setTimeout(() => {
                    this.leftEye.classList.remove('blinking');
                    this.rightEye.classList.remove('blinking');
                }, 200);
            }
        }, 3000 + Math.random() * 2000);
    }
    
    toggleAutoMode() {
        this.autoMode = !this.autoMode;
        
        if (this.autoMode) {
            this.startAutoMode();
            // Clear any existing emojis when entering auto mode
            this.clearAllEmojis();
        } else {
            this.stopAutoMode();
        }
    }
    
    startAutoMode() {
        this.autoModeInterval = setInterval(() => {
            const randomEmotion = this.autoEmotions[Math.floor(Math.random() * this.autoEmotions.length)];
            this.setEmotion(randomEmotion);
        }, 4000 + Math.random() * 3000);
    }
    
    stopAutoMode() {
        if (this.autoModeInterval) {
            clearInterval(this.autoModeInterval);
            this.autoModeInterval = null;
        }
        this.setEmotion('neutral');
    }
    
    clearAllEmojis() {
        const emojis = this.emotionEmojisContainer.querySelectorAll('.emotion-emoji');
        emojis.forEach(emoji => emoji.remove());
    }
    
    createParticles() {
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            this.particlesContainer.appendChild(particle);
        }
    }
    
    startEmojiSystem() {
        this.emojiInterval = setInterval(() => {
            this.createRandomEmoji();
        }, 3000 + Math.random() * 4000); // Random interval between 3-7 seconds
    }
    
    createRandomEmoji() {
        if (this.autoMode) return; // Don't create emojis in auto mode
        
        // Create specific emojis for specific emotions (one emoji per emotion)
        const emotionEmojiMap = {
            happy: '😊',
            sad: '😢',
            surprised: '😲',
            angry: '😠',
            sleepy: '😴',
            excited: '🤩',
            confused: '😵',
            love: '🥰',
            wink: '😉'
        };
        
        const emotions = Object.keys(emotionEmojiMap);
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        const emoji = emotionEmojiMap[randomEmotion];
        
        const emojiElement = document.createElement('div');
        emojiElement.className = 'emotion-emoji';
        emojiElement.textContent = emoji;
        emojiElement.dataset.emotion = randomEmotion;
        
        // Get robot face position to avoid spawning emojis inside it
        const robotFaceRect = this.robotFace.getBoundingClientRect();
        const robotFaceArea = {
            left: robotFaceRect.left - 100,
            right: robotFaceRect.right + 100,
            top: robotFaceRect.top - 100,
            bottom: robotFaceRect.bottom + 100
        };
        
        let x, y;
        let attempts = 0;
        const maxAttempts = 50;
        
        // Try to find a position outside the robot face area
        do {
            x = Math.random() * (window.innerWidth - 60);
            y = Math.random() * (window.innerHeight - 60);
            attempts++;
        } while (
            attempts < maxAttempts && 
            x > robotFaceArea.left && 
            x < robotFaceArea.right && 
            y > robotFaceArea.top && 
            y < robotFaceArea.bottom
        );
        
        emojiElement.style.left = x + 'px';
        emojiElement.style.top = y + 'px';
        
        // Add click event
        emojiElement.addEventListener('click', (e) => {
            this.handleEmojiClick(e, randomEmotion);
        });
        
        this.emotionEmojisContainer.appendChild(emojiElement);
        
        // Remove emoji after 8-12 seconds
        setTimeout(() => {
            if (emojiElement.parentNode) {
                emojiElement.remove();
            }
        }, 8000 + Math.random() * 4000);
    }
    
    handleEmojiClick(event, emotion) {
        const emoji = event.target;
        
        // Play bubble pop sound
        this.playBubblePopSound();
        
        // Create splash effect
        this.createSplashEffect(event.clientX, event.clientY);
        
        // Add pop animation
        emoji.classList.add('clicked');
        
        // Remove emoji after animation
        setTimeout(() => {
            if (emoji.parentNode) {
                emoji.remove();
            }
        }, 500);
        
        // Trigger emotion
        this.setEmotion(emotion);
    }
    
    createSplashEffect(x, y) {
        const splash = document.createElement('div');
        splash.className = 'splash';
        splash.style.left = x + 'px';
        splash.style.top = y + 'px';
        
        // Create splash particles
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'splash-particle';
            
            // Random direction
            const angle = (i / 12) * Math.PI * 2;
            const distance = 30 + Math.random() * 20;
            const splashX = Math.cos(angle) * distance;
            const splashY = Math.sin(angle) * distance;
            
            particle.style.setProperty('--splash-x', splashX + 'px');
            particle.style.setProperty('--splash-y', splashY + 'px');
            
            splash.appendChild(particle);
        }
        
        document.body.appendChild(splash);
        
        // Remove splash after animation
        setTimeout(() => {
            if (splash.parentNode) {
                splash.remove();
            }
        }, 800);
    }
    
    startRobotVoice() {
        // Start background robot voice with user interaction
        document.addEventListener('click', () => {
            if (this.robotVoiceAudio.paused) {
                this.robotVoiceAudio.play().catch(e => console.log('Audio play failed:', e));
            }
        }, { once: true });
    }
    
    playBubblePopSound() {
        // Reset and play bubble pop sound
        this.bubblePopAudio.currentTime = 0;
        this.bubblePopAudio.play().catch(e => console.log('Bubble pop audio failed:', e));
    }
    
    cycleToNextEmotion() {
        const emotions = Object.keys(this.emotions).filter(e => e !== 'neutral');
        const currentIndex = emotions.indexOf(this.currentEmotion);
        const nextIndex = (currentIndex + 1) % emotions.length;
        const nextEmotion = emotions[nextIndex];
        this.setEmotion(nextEmotion);
    }
}

// Global functions for button controls
let robotFace;

function setEmotion(emotion) {
    if (robotFace) {
        robotFace.setEmotion(emotion);
    }
}

function toggleAutoMode() {
    if (robotFace) {
        robotFace.toggleAutoMode();
    }
}

function cycleEmotions() {
    if (robotFace) {
        robotFace.cycleToNextEmotion();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    robotFace = new RobotFace();
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', () => {
    const robotFaceElement = document.getElementById('robotFace');
    
    // Add click effect only
    robotFaceElement.addEventListener('click', () => {
        robotFaceElement.style.transform = 'scale(0.95)';
        setTimeout(() => {
            robotFaceElement.style.transform = 'scale(1)';
        }, 150);
    });
});
