import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const Header: React.FC = () => {
  const profile = useSelector((state: RootState) => state.auth.profile);
  const [fullname, setFullname] = useState(profile?.user?.first_name || 'Unknown');

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Hello!</Text>
        <Text style={styles.fullname}>{fullname}</Text>
      </View>
      <Image
        source={require('@/assets/images/avatar.png')} // Replace with your avatar image file
        style={styles.profileImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 2,
  },
  fullname: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginLeft: 10,
  },
});

export default Header;
