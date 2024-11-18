// components/ProfileHeader.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type EditProfileHeaderProps = {
  profileImage: string;
};

const EditProfileHeader: React.FC<EditProfileHeaderProps> = ({ profileImage }) => (
  <View style={styles.container}>
    <Image source={require('@/assets/images/Ellipse.png')} style={styles.backgroundImage} />
    <View style={styles.profileImageContainer}>
      <Image source={{ uri: profileImage }} style={styles.profileImage} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginBottom: 20 },
  backgroundImage: { width: '100%', height: 150, resizeMode: 'cover' },
  title: { position: 'absolute', top: 60, fontSize: 24, color: 'white', fontWeight: 'bold' },
  profileImageContainer: {
    position: 'absolute',
    top: 100,
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'white',
  },
  profileImage: { width: '100%', height: '100%' },
});

export default EditProfileHeader;
