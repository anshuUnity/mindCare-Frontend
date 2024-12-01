import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface MoodTrackCardProps {
  title: string;
  image: string;
}

const MoodTrackCard: React.FC<MoodTrackCardProps> = ({ title, image }) => {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    margin: 8,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: '100%',
    height: '70%',
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 8,
  },
});

export default MoodTrackCard;
