import React from 'react';
import { ScrollView, StyleSheet, View, Platform } from 'react-native';
import ProfileHeader from '@/components/ProfileHeader';
import ConcernsSection from '@/components/ConcernsSection';
import AppointmentsSection from '@/components/AppointmentsSection';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

const ProfileScreen: React.FC = () => {

  const { profile } = useLocalSearchParams(); // Access profile from redirect params
  const parsedProfile = profile ? JSON.parse(profile as string) : null;
  
  
  return (
    // <SafeAreaView style={styles.safeArea}>
    //   {/* Set StatusBar style for both Android and iOS */}
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Add this View to match green background */}
        <View style={styles.headerBackground}>
          <ProfileHeader
            name={parsedProfile.user.first_name}
            gender={parsedProfile.gender || 'Not specified'}
            age={parsedProfile.age || 'N/A'} // Pass actual age if available
            email={parsedProfile.user.email}
          />
        </View>
        <ConcernsSection />
        <AppointmentsSection />
      </ScrollView>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 20,
  },
  headerBackground: {
    backgroundColor: '#8bc34a', // Green background for header
    width: '100%', // Ensure background is full width
    alignItems: 'center',
  },
});

export default ProfileScreen;
