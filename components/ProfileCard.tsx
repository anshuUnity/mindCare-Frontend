import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface ProfileCardProps {
  psychiatrist: {
    name: string;
    vicinity: string;
    rating: number;
    user_ratings_total: number;
    icon: string,
    photos?: { photo_reference: string }[];
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ psychiatrist }) => {
  const { name, vicinity, rating, user_ratings_total, icon, photos } = psychiatrist;

  const photoUrl = photos
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=YOUR_GOOGLE_API_KEY`
    : 'https://via.placeholder.com/150';

  return (
    <View style={styles.card}>
      <Image source={{ uri: icon }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.address}>{vicinity}</Text>
        <Text style={styles.rating}>
          {`Rating: ${rating || 'N/A'} (${user_ratings_total || 0} reviews)`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#555',
    marginVertical: 5,
  },
  rating: {
    fontSize: 14,
    color: '#007BFF',
  },
});

export default ProfileCard;
