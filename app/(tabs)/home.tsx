import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/HomeScreen/Header';
import MoodTrackCard from '@/components/HomeScreen/MoodTrackCard';
import QuoteCard from '@/components/HomeScreen/QuoteCard';
import YouTube from 'react-native-youtube-iframe';
import VideoCard from '@/components/HomeScreen/VideoCard';
import YoutubeIframe from 'react-native-youtube-iframe';

const YOUTUBE_API_KEY = 'AIzaSyBeZsmls9RqS2grxhRqmZ2ODaWMKLoobxs';
const CHANNEL_ID = '@motiversity';
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';

const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [quote, setQuote] = useState<string>(''); // State to store the quote
  const [loading, setLoading] = useState<boolean>(true); // State to handle loading
  const [videos, setVideos] = useState<any[]>([]); // State to store YouTube videos
  const [videoLoading, setVideoLoading] = useState<boolean>(true);
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null); // State for currently selected video ID
  console.log(currentVideoId);
  
  // Fetch quote on component mount
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://api.quotable.io/random');
        if (!response.ok) throw new Error('Failed to fetch quote');
        const data = await response.json();
        setQuote(data.content); // Set the fetched quote
      } catch (error) {
        console.error(error);
        setQuote('Stay motivated and keep going!'); // Fallback quote
      } finally {
        setLoading(false); // Stop loading indicator
      }
    };

    fetchQuote();
  }, []);

  // Fetch YouTube videos
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setVideoLoading(true);
    
        const params = new URLSearchParams({
          part: 'snippet',
          q: 'mental health',
          type: 'video',
          maxResults: '10',
          key: YOUTUBE_API_KEY, // Replace with your actual YouTube API key
        });
    
        const response = await fetch(`${YOUTUBE_API_URL}?${params}`);
        if (!response.ok) throw new Error('Failed to fetch videos');
        const data = await response.json();
        setVideos(data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setVideoLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
      <View style={styles.headerBackground}></View>
      <ScrollView style={styles.container}>
        <Header />
        <View style={styles.content}>
          {/* Bot Image and Text/Button Section */}
          <View style={styles.botSection}>
            <Image
              source={require('@/assets/images/tink.gif')} // Replace with your bot image
              style={styles.botImage}
            />
            <View style={styles.textContainer}>
              <Text style={styles.botText}>I'M TINK</Text>
              <TouchableOpacity onPress={() => router.push('/ChatScreen')} style={styles.button}>
                <Text style={styles.buttonText}>LET'S TALK</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quote Card */}
          {loading ? (
            <ActivityIndicator size="large" color="#4CAF50" />
          ) : (
            <QuoteCard quote={quote} />
          )}

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

          {/* YouTube Videos Section */}
          <Text style={styles.sectionTitle}>MOTIVATIONAL VIDEOS</Text>
          {videoLoading ? (
            <ActivityIndicator size="large" color="#4CAF50" />
          ) : (
            <View style={styles.videoGrid}>
              {videos.map((video) => (
                <VideoCard
                  key={video.id.videoId}
                  title={video.snippet.title}
                  image={video.snippet.thumbnails.medium.url}
                  videoId={video.id.videoId}
                  onPress={() => setCurrentVideoId(video.id.videoId)} // Open YouTube player
                />
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Modal to Play YouTube Video */}
      <Modal
        visible={!!currentVideoId}
        animationType="slide"
        onRequestClose={() => setCurrentVideoId(null)} // Close player
      >
        <View style={styles.modalContent}>
          <View style={{ width: '100%', height: 300 }}>
            <YoutubeIframe
              videoId={currentVideoId || ''}
              height={300}
              play={true}

            />
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={() => setCurrentVideoId(null)}>
            <Text style={styles.closeButtonText}>CLOSE</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  botImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  botText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFF',
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
  videoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default HomeScreen;
