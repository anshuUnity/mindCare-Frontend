import React from 'react';
import { Alert, Button, ScrollView, StyleSheet, View } from 'react-native';
import ProfileHeader from '@/components/ProfileHeader';
import ConcernsSection from '@/components/ConcernsSection';
import AppointmentsSection from '@/components/AppointmentsSection';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/authSlice';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const ProfileScreen: React.FC = () => {
  // Access the profile data from the Redux store
  const profile = useSelector((state: RootState) => state.auth.profile);

  // Fallback in case profile data is not available
  const firstName = profile?.user?.first_name || 'Unknown';
  const gender = profile?.gender || 'Not specified';
  const age = profile?.age || 'N/A';
  const email = profile?.user?.email || 'No email';
  const dispatch = useDispatch();
  const router = useRouter();
// Placeholder for logout functionality
const handleLogout = async () => {
  try {
    // Show a success message
    Alert.alert('Logout Successful');
    // Remove user token securely
    await SecureStore.deleteItemAsync('userToken');
    // Dispatch the logout action
    dispatch(logout());
    // Navigate to the Login screen
    router.replace('/Login');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};


  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {/* Add this View to match green background */}
      <View style={styles.headerBackground}>
        <ProfileHeader
          name={firstName}
          gender={gender}
          age={age}
          email={email}
        />
      </View>
      <ConcernsSection />
      <AppointmentsSection />
      {/* Logout Button */}
      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" onPress={handleLogout} color="#d32f2f" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 20,
  },
  headerBackground: {
    backgroundColor: '#8bc34a', // Green background for header
    width: '100%', // Ensure background is full width
    alignItems: 'center',
  },
  logoutButtonContainer: {
    marginTop: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
});

export default ProfileScreen;
