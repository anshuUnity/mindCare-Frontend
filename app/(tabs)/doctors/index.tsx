import 'react-native-get-random-values';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { fetchPsychiatrists } from './psychiatristService';
import ProfileCard from '@/components/ProfileCard';


const GOOGLE_API_KEY = 'AIzaSyAQ82icfK2m34N_jMwdVTCFTTSZh-q1WPI';

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [psychiatrists, setPsychiatrists] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        setLoading(false);
        return;
      }

      const userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
    })();
  }, []);

  useEffect(() => {
    if (location) {
      (async () => {
        const lat = location.coords.latitude;
        const lng = location.coords.longitude;

        const results = await fetchPsychiatrists(lat, lng, GOOGLE_API_KEY);
        setPsychiatrists(results);
        setLoading(false);
      })();
    }
  }, [location]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Psychiatrists Near You</Text>

      <GooglePlacesAutocomplete
        placeholder="Search location"
        onPress={(data, details = null) => {
          const { lat, lng } = details?.geometry?.location || {};
          setLocation({ coords: { latitude: lat, longitude: lng } });
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
        }}
        styles={{ textInput: styles.searchInput }}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={psychiatrists}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => <ProfileCard psychiatrist={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});

export default App;
