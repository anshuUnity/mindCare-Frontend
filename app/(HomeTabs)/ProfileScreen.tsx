import AppointmentsSection from '@/components/AppointmentsSection';
import ConcernsSection from '@/components/ConcernsSection';
import ProfileHeader from '@/components/ProfileHeader';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';


const ProfileScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProfileHeader 
        name="Shreya"
        gender="female"
        age={19}
        email="shreyaguptaapril@gmail.com"
      />
      <ConcernsSection />
      <AppointmentsSection />
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
