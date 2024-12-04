import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface VideoCardProps {
  title: string;
  image: string;
  videoId: string;
  onPress: () => void; // Function to handle press event
}

const VideoCard: React.FC<VideoCardProps> = ({ title, image, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: '100%',
    height: 120,
  },
  title: {
    textAlign: 'center',
    fontSize: 14,
    margin: 8,
  },
});

export default VideoCard;
