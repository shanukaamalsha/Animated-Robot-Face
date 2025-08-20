# LumoFace - Animated Robot Face

A sleek, interactive website featuring an animated robot face with glowing borders, cube-like eyes that follow your cursor, and emotional expressions inspired by cute robots like Emo and Vector.

## ✨  Features (Latest Update)

### 🎭 Floating Emotion Emojis
- **Interactive Emojis**: Click floating emojis to trigger emotions
- **Splash Effects**: Beautiful particle splash when emojis are clicked
- **Random Spawning**: Emojis appear randomly across the screen
- **Auto-Cleanup**: Emojis disappear after a set time or when clicked
- **Audio Feedback**: Bubble pop sound when emojis are clicked
- **Exact Matching**: Each emoji triggers its specific emotion / random emotions


### 🎭 Emotional Expressions & Emojis
Each emoji triggers its specific emotion when clicked:

| Emotion | Emoji | Description |
|---------|-------|-------------|
| **Happy** | 😊 | Bright, cheerful expression with scaling animation |
| **Sad** | 😢 | Downcast, melancholic look with rotation |
| **Surprised** | 😲 | Wide-eyed astonishment with dramatic scaling |
| **Angry** | 😠 | Red-tinted aggressive expression with rotation |
| **Sleepy** | 😴 | Half-closed eyes, tired look with vertical scaling |
| **Excited** | 🤩 | Animated, energetic display with rapid scaling |
| **Confused** | 😵 | Crossed eyes, tilted expression with rotation |
| **Love** | 🥰 | Pink-tinted eyes with gentle pulsing animation |
| **Wink** | 😉 | Playful one-eye blink with pronounced animation |
| **Neutral** | 😐 | Default calm state with cursor tracking |

### 👀 Interactive Eyes
- **Cursor Tracking**: Eyes follow your mouse movement smoothly
- **Emotion Integration**: Eyes change behavior based on current emotion
- **Responsive Design**: Works on both desktop and mobile devices
- **Interruption Handling**: Eyes stop tracking during emotions, resume after

### 🎨 Visual Effects
- **Glowing Border**: Animated rainbow border that continuously cycles
- **Particle System**: Floating particles in the background
- **Splash Effects**: Dynamic particle explosions when emojis are clicked
- **Smooth Transitions**: All animations use CSS transitions for fluid movement
- **Modern Design**: Clean, futuristic aesthetic with cyberpunk elements
- **Color Changes**: Eyes change color for specific emotions (red for angry, pink for love)

### 🎮 Interactive Controls
- **Single Button**: Click "Next Emotion" to cycle through all emotions
- **Emoji Interaction**: Click floating emojis to trigger specific emotions
- **Touch Support**: Full touch support for mobile devices
- **Audio System**: Background robot voice and bubble pop sounds
- **Spaced Emojis**: Emojis appear away from the robot face for better visibility

## How to Use

1. **Open the Website**: Load `index.html` in your web browser
2. **Move Your Mouse**: Watch the robot's eyes follow your cursor
3. **Click Emojis**: Click floating emojis to trigger specific emotions
4. **Use Single Button**: Click "Next Emotion" to cycle through all emotions
5. **Watch Animations**: Observe how eyes stop tracking during emotions
6. **Listen to Audio**: Enjoy bubble pop sounds and background robot voice

## Technical Details

### Technologies Used
- **HTML5**: Semantic structure and modern elements
- **CSS3**: Advanced animations, gradients, and visual effects
- **JavaScript**: No frameworks, pure ES6+ JavaScript
- **Python**: Optional emotion generation utility


### Performance
- Optimized animations using CSS transforms
- Efficient event handling
- Smooth 60fps animations
- Mobile-optimized touch events

## File Structure

```
LumoFace/
├── index.html                  # Main HTML file
├── styles.css                  # CSS styles and animations
├── script.js                   # JavaScript functionality
├── emotion_generator.py        # Python utility for emotion generation
├── assets/
├──    └──bubble-pop.mp3        # Audio for emoji pop effect
├──    └── robot-voice.mp3      # Background robot voice audio
└── README.md                   # This documentation

```

## Python Utility

The included `emotion_generator.py` provides:
- **Random Emotion Generation**: Weighted random emotion selection
- **Emotion Sequences**: Generate sequences of emotions for testing
- **JSON Export**: Export emotion data to JSON format
- **Simulation Mode**: Simulate robot behavior for testing

### Using the Python Script
```bash
python emotion_generator.py
```

## Customization

### Adding New Emotions
1. Add emotion data to the `emotions` object in `script.js`
2. Create corresponding CSS animations in `index.html`
3. Add emotion-specific logic in the `setEmotion()` function
4. Update the Python generator if using the utility

### Modifying Visual Style
- Edit CSS variables for color schemes
- Modify animation durations and easing
- Adjust particle system parameters
- Customize border glow effects

### Adjusting Behavior
- Change eye tracking sensitivity
- Modify emotion durations
- Adjust auto mode timing
- Customize emoji spawning frequency

## Contributing

Feel free to contribute to this project by:
- Adding new emotions and animations
- Improving the visual design
- Enhancing the interaction system
- Optimizing performance
- Adding new features
- Improving the Python utility

