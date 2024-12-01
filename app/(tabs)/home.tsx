import Header from '@/components/HomeScreen/Header';
import MoodTrackCard from '@/components/HomeScreen/MoodTrackCard';
import QuoteCard from '@/components/HomeScreen/QuoteCard';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

const HomeScreen: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <View style={styles.headerBackground}></View>
      <ScrollView style={styles.container}>
        <Header />
        <View style={styles.content}>
          {/* Bot Image and Text/Button Section */}
          <View style={styles.botSection}>
            {/* Bot Image */}
            <Image
              source={require('@/assets/images/tink.gif')} // Replace with your bot image
              style={styles.botImage}
            />

            {/* Text and Button */}
            <View style={styles.textContainer}>
              <Text style={styles.botText}>I'M TINK</Text>
              <TouchableOpacity onPress={() => router.push("/ChatScreen")} style={styles.button}>
                <Text style={styles.buttonText}>LET'S TALK</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quote Card */}
          <QuoteCard quote="Be yourself no matter what they say!" />

          {/* Mood Tracks Section */}
          <Text style={styles.sectionTitle}>TRACKS TO REFRESH YOUR MOOD</Text>
          <View style={styles.moodContainer}>
            <MoodTrackCard
              title="Yoga & Meditation"
              image="https://example.com/yoga.jpg" // Replace with actual image URL
            />
            <MoodTrackCard
              title="Mind & Body"
              image="https://example.com/mind-body.jpg" // Replace with actual image URL
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerBackground: {
    backgroundColor: '#4CAF50',
    height: 50,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
  botSection: {
    flexDirection: 'row', // Align bot image and text/button side by side
    alignItems: 'center',
    marginBottom: 20, // Add space below the bot section
  },
  botImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 16, // Space between image and text
  },
  textContainer: {
    flex: 1, // Make the text container take up remaining space
  },
  botText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50', // Green text
    marginBottom: 12, // Space between text and button
  },
  button: {
    backgroundColor: '#000', // Black button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF', // White text
    fontSize: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});

export default HomeScreen;
