import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, Modal } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import { RootState } from '@/store';
import { updateProfile, logout } from '@/store/authSlice';

import InputField from '@/components/InputField';
import RadioGroup from '@/components/RadioGroup';
import CheckboxGroup from '@/components/CheckboxGroup';
import SaveButton from '@/components/SaveButton';
import EditProfileHeader from '@/components/EditProfileHeader';
import { BASE_URL } from '@/constants/api';

const EditProfileScreen: React.FC = () => {
  const profile = useSelector((state: RootState) => state.auth.profile);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState(profile?.user?.first_name || 'Unknown');
  const [email, setEmail] = useState(profile?.user?.email || 'No email');
  const [gender, setGender] = useState(profile?.gender || 'Not specified');
  const [age, setAge] = useState(profile?.age?.toString() || 'N/A');
  const [dob, setDob] = useState(profile?.date_of_birth || ''); // New dob state
  const [phone, setPhone] = useState(profile?.phone_number || '');
  const [concerns, setConcerns] = useState<string[]>(profile?.concerns || []);

  const handleToggleConcern = (concern: string) => {
    setConcerns(prevConcerns =>
      prevConcerns.includes(concern) ? prevConcerns.filter(c => c !== concern) : [...prevConcerns, concern]
    );
  };

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  };

  const handleSave = async () => {
    setLoading(true);
    const genderMapping = { Male: 'M', Female: 'F', Other: 'O' };
    const mappedGender = genderMapping[gender] || '';

    const payload = {
      gender: mappedGender,
      phone_number: phone,
      date_of_birth: dob, // Send dob in the payload
    };

    try {
      const response = await fetch(`${BASE_URL}/profile/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedAge = data.date_of_birth ? calculateAge(data.date_of_birth) : 'N/A';
        
        dispatch(updateProfile({ ...data, age: updatedAge }));
        setAge(updatedAge);

        // Store the updated profile in SecureStore
        await SecureStore.setItemAsync('profile', JSON.stringify({ ...data, age: updatedAge }));

        Alert.alert('Success', 'Profile updated successfully!');
      } else if (response.status === 403) {
        Alert.alert('Session Expired', 'Please log in again.');
        await SecureStore.deleteItemAsync('token');
        dispatch(logout());
        router.replace('/Login');
      } else {
        Alert.alert('Error', 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'An error occurred while updating the profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading && (
        <Modal transparent animationType="fade">
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        </Modal>
      )}
      
      <EditProfileHeader profileImage="https://m.media-amazon.com/images/M/MV5BMDEzMmQwZjctZWU2My00MWNlLWE0NjItMDJlYTRlNGJiZjcyXkEyXkFqcGc@._V1_.jpg" />
      
      <InputField 
        label="Fullname" 
        value={fullname} 
        keyboardType="default"
        iconName="person" 
        placeholder="Fullname" 
        onChangeText={setFullname} 
      />
      
      <InputField 
        label="Email" 
        value={email} 
        iconName="email" 
        keyboardType="email-address"
        placeholder="Email" 
        onChangeText={setEmail} 
      />
      
      <RadioGroup 
        options={['Male', 'Female', 'Other']} 
        selectedOption="Male" 
        onSelect={setGender} 
      />
      
      <InputField 
        label="Phone" 
        value={phone} 
        iconName="phone"
        keyboardType="phone-pad"
        placeholder="Phone no." 
        onChangeText={setPhone} 
      />
      
      <InputField 
        label="Date of Birth" 
        value={dob} 
        iconName="calendar-today"
        keyboardType="default"
        placeholder="YYYY-MM-DD" 
        onChangeText={(value) => {
          setDob(value);
          setAge(value ? calculateAge(value) : 'N/A');
        }} 
      />
      
      <InputField 
        label="Age" 
        value={age} 
        iconName="hourglass-empty" 
        keyboardType="number-pad"
        placeholder="Age" 
        onChangeText={setAge} 
      />
      
      <Text style={styles.sectionTitle}>My Concerns:</Text>
      
      <CheckboxGroup 
        options={[
          'Anger', 
          'Depression', 
          'Self-esteem', 
          'Stress', 
          'Anxiety and Panic Attacks', 
          'Eating disorders', 
          'Self-harm', 
          'Sleep disorders'
        ]}
        selectedOptions={concerns}
        onToggle={handleToggleConcern}
      />
      
      <SaveButton onPress={handleSave} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // backdrop
  },
});

export default EditProfileScreen;
