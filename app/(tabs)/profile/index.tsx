import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ProfileHeader from '@/components/ProfileHeader';
import ConcernsSection from '@/components/ConcernsSection';
import AppointmentsSection from '@/components/AppointmentsSection';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ProfileScreen: React.FC = () => {
  // Access the profile data from the Redux store
  const profile = useSelector((state: RootState) => state.auth.profile);

  // Fallback in case profile data is not available
  const firstName = profile?.user?.first_name || 'Unknown';
  const gender = profile?.gender || 'Not specified';
  const age = profile?.age || 'N/A';
  const email = profile?.user?.email || 'No email';

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
});

export default ProfileScreen;
