import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasToken, setHasToken] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const router = useRouter(); // To handle navigation

  useEffect(() => {
    const checkToken = async () => {
      try {
        // Check if the token is stored
        const token = await SecureStore.getItemAsync('userToken');
        const profileData = await SecureStore.getItemAsync('userProfile');
        if (token && profileData) {
          setHasToken(true);
          setProfile(JSON.parse(profileData));
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

  // If the token and profile are found, redirect to the Home screen, otherwise to Signup/Login
  console.log(profile.user.first_name, "GENDER");
  
  if (!isLoading) {
    if (hasToken && profile) {
      router.replace({
        pathname: '/home',
        params: { profile: JSON.stringify(profile) }, // Pass profile as a stringified JSON object
      });
    } else {
      router.replace('/signup');
    }
  }
}
