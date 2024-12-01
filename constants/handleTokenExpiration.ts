import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Dispatch } from '@reduxjs/toolkit';
import { logout } from '@/store/authSlice';

export const handleTokenExpiration = async (
  dispatch: Dispatch,
  router: any // Replace with `useNavigation` or your routing system
) => {
  try {
    // Clear token from secure storage
    await SecureStore.deleteItemAsync('userToken');
    Alert.alert('Session Expired', 'Please log in again.');
    // Dispatch logout action
    dispatch(logout());

    // Navigate to the login screen
    router.replace('/Login'); // Adjust this route to match your login screen
  } catch (error) {
    console.error('Error handling token expiration:', error);
    Alert.alert('Error', 'An error occurred while logging out.');
  }
};
