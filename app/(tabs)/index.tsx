import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        // Check if the token is stored
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          setHasToken(true);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      } finally {
        setIsLoading(false); // Mark as done loading
      }
    };

    checkToken(); // Check the token on component mount
  }, []);

  if (isLoading) {
    // Show a loader while checking for token
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // If the token is found, redirect to the Home screen (tabs), otherwise to Signup/Login
  return hasToken ? <Redirect href="/home" /> : <Redirect href="/signup" />;
}
