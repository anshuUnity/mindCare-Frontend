import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useRouter } from 'expo-router';

type BookDetailRouteProp = RouteProp<{ params: Book }, 'params'>;

type Book = {
  id: number;
  title: string;
  author: string;
  description: string;
  published_date: string;
  isbn: string;
  language: string;
  pages: number;
  tag: string;
  cover_image: string;
  file: string; // PDF file URL
};

const BookDetailScreen: React.FC = () => {
  const route = useRoute<BookDetailRouteProp>();
  const book = route.params;
  const router = useRouter();
  

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: book.cover_image }} style={styles.coverImage} />
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>By {book.author}</Text>
      <Text style={styles.description}>{book.description}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Published Date: </Text>
          {book.published_date}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>ISBN: </Text>
          {book.isbn}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Language: </Text>
          {book.language}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Pages: </Text>
          {book.pages}
        </Text>
        <Text style={styles.detail}>
          <Text style={styles.detailLabel}>Tag: </Text>
          {book.tag}
        </Text>
      </View>
        <TouchableOpacity style={styles.button} onPress={() =>
            router.push({pathname: "./BookReaderScreen", params: {pdfUrl: book.file}})}>
            <Text style={styles.buttonText}>READ BOOK</Text>
        </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
    marginBottom: 80
  },
  coverImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  author: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 16,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  detail: {
    fontSize: 16,
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#FFD700', // Black button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF', // White text
    fontSize: 16,
    textAlign: 'center',
  },
});

export default BookDetailScreen;
