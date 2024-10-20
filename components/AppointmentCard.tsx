import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface AppointmentCardProps {
  doctorName: string;
  specialization: string;
  date: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ doctorName, specialization, date }) => {
  return (
    <View style={styles.cardContainer}>
      {/* Green left strip */}
      <View style={styles.cardContent}>
        <Image source={{ uri: 'https://example.com/doctor-pic' }} style={styles.image} />
        <View style={styles.details}>
          <Text style={styles.name}>{doctorName}</Text>
          <Text style={styles.specialization}>{specialization}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <FontAwesome name="chevron-right" size={16} color="#4caf50" />
      </View>
    </View>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f9fa', // Light bluish background
    borderRadius: 10, // Rounded corners
    marginBottom: 20,
    width: width * 0.8, // 80% of screen width
    alignSelf: 'center', // Center card horizontally
  },
  leftStrip: {
    backgroundColor: '#4caf50', // Green strip
    width: 5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10, // Keep rounded for the right side of the card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Elevation for shadow effect
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25, // Circular image
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  specialization: {
    fontSize: 14,
    color: '#888',
  },
  date: {
    fontSize: 14,
    color: '#4caf50',
  },
});

export default AppointmentCard;
