import BookCard from '@/components/Books/BookCard';
import { RootState } from '@/store';
import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'expo-router';
import { logout } from '@/store/authSlice';
import { BASE_URL } from '@/constants/api';

type Book = {
  id: number;
  author: string;
  pages: number;
  cover_image: string;
};

const BookFeedScreen: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const token = useSelector((state: RootState) => state.auth.token);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false); // State for refreshing
  const dispatch = useDispatch();
  const router = useRouter();

  const fetchBooks = async (isRefreshing: boolean = false) => {
    if (!isRefreshing) {
      setLoading(true);
    }
    try {
      const response = await fetch(`${BASE_URL}/books/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const formattedBooks = data.results.map((book: any) => ({
            id: book.id,
            title: book.title,
            author: book.author,
            description: book.description,
            published_date: book.published_date,
            isbn: book.isbn,
            language: book.language,
            pages: book.pages,
            tag: book.tag,
            cover_image: book.cover_image,
            file: book.file,
        }));
        setBooks(formattedBooks);
      } else if (response.status === 403) {
        Alert.alert('Session Expired', 'Please log in again.');
        await SecureStore.deleteItemAsync('userToken');
        dispatch(logout());
        router.replace('/Login');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Ensure refreshing is stopped
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchBooks(true);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading && !refreshing) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
            <TouchableOpacity 
            onPress={() => router.push({pathname: "../books/BookDetailScreen", params: item})}>
            <BookCard
            author={item.author}
            pages={item.pages}
            coverImage={item.cover_image}
          />
            </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  row: {
    justifyContent: 'space-between',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BookFeedScreen;
