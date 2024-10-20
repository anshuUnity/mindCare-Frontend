import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface ProfileHeaderProps {
  name: string;
  gender: string;
  age: number;
  email: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, gender, age, email }) => {
  return (
    <View style={styles.headerContainer}>
      <Image source={{ uri: 'https://example.com/profile-pic' }} style={styles.avatar} />
      <Text style={styles.profileName}>{name}</Text>
      <View style={styles.infoRow}>
        <FontAwesome name={gender === 'female' ? 'venus' : 'mars'} size={16} color="white" />
        <Text style={styles.infoText}>{gender}</Text>
        <FontAwesome name="calendar" size={16} color="white" />
        <Text style={styles.infoText}>{age} yrs. old</Text>
      </View>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#8bc34a', // Match the green background color
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40, // Circular avatar
    marginBottom: 10,
    borderWidth: 2, // To match the circular white border
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 22, // Adjust font size to match design
    fontWeight: 'bold',
    color: '#fff', // White text for the profile name
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#fff',
    marginHorizontal: 8,
  },
  email: {
    color: '#fff',
    fontSize: 14,
    marginTop: 5,
  },
});


export default ProfileHeader;
