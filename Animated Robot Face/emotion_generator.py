"""
Emotion Generator for LumoFace Robot
A simple utility to generate random emotions and test the robot face system.
"""

import random
import time
import json

class EmotionGenerator:
    def __init__(self):
        self.emotions = {
            'happy': {'name': 'Happy', 'duration': 3000, 'emoji': '😊', 'weight': 15},
            'sad': {'name': 'Sad', 'duration': 2500, 'emoji': '😢', 'weight': 10},
            'surprised': {'name': 'Surprised', 'duration': 1500, 'emoji': '😲', 'weight': 12},
            'angry': {'name': 'Angry', 'duration': 2000, 'emoji': '😠', 'weight': 8},
            'sleepy': {'name': 'Sleepy', 'duration': 4000, 'emoji': '😴', 'weight': 10},
            'excited': {'name': 'Excited', 'duration': 2000, 'emoji': '🤩', 'weight': 15},
            'confused': {'name': 'Confused', 'duration': 3000, 'emoji': '😵', 'weight': 8},
            'love': {'name': 'Love', 'duration': 3500, 'emoji': '🥰', 'weight': 12},
            'wink': {'name': 'Wink', 'duration': 1000, 'emoji': '😉', 'weight': 10}
        }
        
        # Create weighted list for random selection
        self.weighted_emotions = []
        for emotion, data in self.emotions.items():
            self.weighted_emotions.extend([emotion] * data['weight'])
    
    def get_random_emotion(self):
        """Get a random emotion based on weights."""
        return random.choice(self.weighted_emotions)
    
    def get_emotion_data(self, emotion):
        """Get data for a specific emotion."""
        return self.emotions.get(emotion, None)
    
    def generate_emotion_sequence(self, count=10):
        """Generate a sequence of random emotions."""
        sequence = []
        for _ in range(count):
            emotion = self.get_random_emotion()
            data = self.get_emotion_data(emotion)
            sequence.append({
                'emotion': emotion,
                'name': data['name'],
                'emoji': data['emoji'],
                'duration': data['duration']
            })
        return sequence
    
    def export_emotions_to_json(self, filename='emotions.json'):
        """Export emotions data to JSON file."""
        with open(filename, 'w') as f:
            json.dump(self.emotions, f, indent=2)
        print(f"Emotions exported to {filename}")
    
    def simulate_robot_behavior(self, duration_seconds=60):
        """Simulate robot behavior for testing."""
        print("🤖 Starting LumoFace Robot Simulation...")
        print("=" * 50)
        
        start_time = time.time()
        current_time = start_time
        
        while current_time - start_time < duration_seconds:
            emotion = self.get_random_emotion()
            data = self.get_emotion_data(emotion)
            
            print(f"⏰ {time.strftime('%H:%M:%S')} - {data['emoji']} {data['name']} ({data['duration']}ms)")
            
            # Simulate emotion duration
            time.sleep(data['duration'] / 1000)
            current_time = time.time()
        
        print("=" * 50)
        print("🤖 Simulation completed!")

def main():
    generator = EmotionGenerator()
    
    print("🎭 LumoFace Emotion Generator")
    print("1. Generate random emotion")
    print("2. Generate emotion sequence")
    print("3. Export emotions to JSON")
    print("4. Simulate robot behavior")
    print("5. Exit")
    
    while True:
        choice = input("\nEnter your choice (1-5): ").strip()
        
        if choice == '1':
            emotion = generator.get_random_emotion()
            data = generator.get_emotion_data(emotion)
            print(f"🎲 Random emotion: {data['emoji']} {data['name']}")
            
        elif choice == '2':
            count = int(input("How many emotions? (default 10): ") or 10)
            sequence = generator.generate_emotion_sequence(count)
            print("\n🎭 Emotion Sequence:")
            for i, item in enumerate(sequence, 1):
                print(f"{i:2d}. {item['emoji']} {item['name']} ({item['duration']}ms)")
                
        elif choice == '3':
            generator.export_emotions_to_json()
            
        elif choice == '4':
            duration = int(input("Simulation duration in seconds (default 60): ") or 60)
            generator.simulate_robot_behavior(duration)
            
        elif choice == '5':
            print("👋 Goodbye!")
            break
            
        else:
            print("❌ Invalid choice. Please try again.")

if __name__ == "__main__":
    main()
