import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type BookCardProps = {
  author: string;
  pages: number;
  coverImage: string;
};

const BookCard: React.FC<BookCardProps> = ({ author, pages, coverImage }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: coverImage }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.authorText} numberOfLines={1} ellipsizeMode="tail">
          {author}
        </Text>
        <Text style={styles.pagesText}>{pages} pages</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 200, // Fixed card width for consistent layout
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    margin: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 8,
  },
  authorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  pagesText: {
    fontSize: 14,
    color: '#555',
  },
});

export default BookCard;
