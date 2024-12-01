import React, { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { ActivityIndicator, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { setProfile, setToken } from '@/store/authSlice';
import { store, RootState } from '@/store';

function AppContent() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  
  // Access `token` and `profile` directly from Redux store
  const token = useSelector((state: RootState) => state.auth.token);
  const profile = useSelector((state: RootState) => state.auth.profile);

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        const profileDataString = await SecureStore.getItemAsync('userProfile');

        if (token && profileDataString) {
          console.log(token, "TOKEN");
          
          let profileData = JSON.parse(profileDataString);
          
          // If profileData contains dob, calculate age and add it to profileData
          if (profileData.dob) {
            profileData.age = calculateAge(profileData.dob);
          }

          dispatch(setToken(token));
          dispatch(setProfile(profileData));
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      if (token && profile) {
        router.replace('/profile');
      } else {
        router.replace('/signup');
      }
    }
  }, [isLoading, token, profile, router]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return null;
}

// The main entry component that wraps `AppContent` in the `Provider`
export default function Index() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
