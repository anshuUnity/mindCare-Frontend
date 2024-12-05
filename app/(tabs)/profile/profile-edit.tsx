import React, { useState } from 'react';
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

const CONCERN_OPTIONS = [
  { id: 1, name: 'Anger' },
  { id: 2, name: 'Anxiety and Panic Attacks' },
  { id: 3, name: 'Depression' },
  { id: 4, name: 'Eating Disorders' },
  { id: 5, name: 'Self-Esteem' },
  { id: 6, name: 'Self-Harm' },
  { id: 7, name: 'Sleep Disorders' },
  { id: 8, name: 'Stress' },
];

const EditProfileScreen: React.FC = () => {
  const profile = useSelector((state: RootState) => state.auth.profile);
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fullname, setFullname] = useState(`${profile?.user?.first_name || ''} ${profile?.user?.last_name || ''}`);
  const [email, setEmail] = useState(profile?.user?.email || '');
  const [gender, setGender] = useState(profile?.gender || 'Not specified');
  const [dob, setDob] = useState(profile?.date_of_birth || '');
  const [phone, setPhone] = useState(profile?.phone_number || '');
  const [concerns, setConcerns] = useState<number[]>(profile?.concerns.map((c: any) => c.id) || []);

  const handleToggleConcern = (concernId: number) => {
    setConcerns((prevConcerns) =>
      prevConcerns.includes(concernId) ? prevConcerns.filter((id) => id !== concernId) : [...prevConcerns, concernId]
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

    const [firstName, ...lastNameParts] = fullname.split(' ');
    const payload = {
      first_name: firstName,
      last_name: lastNameParts.join(' '),
      email,
      gender: mappedGender,
      phone_number: phone,
      date_of_birth: dob,
      concern_ids: concerns,
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
        await SecureStore.setItemAsync('profile', JSON.stringify({ ...data, age: updatedAge }));

        Alert.alert('Success', 'Profile updated successfully!');
      } else if (response.status === 403) {
        Alert.alert('Session Expired', 'Please log in again.');
        await SecureStore.deleteItemAsync('userToken');
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

      <EditProfileHeader profileImage="https://example.com/default-profile.jpg" />

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
        selectedOption={gender}
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
        }}
      />

      <Text style={styles.sectionTitle}>My Concerns:</Text>

      <CheckboxGroup
        options={CONCERN_OPTIONS.map((concern) => concern.name)} // Pass only the names as strings
        selectedOptions={concerns.map((id) => CONCERN_OPTIONS.find((c) => c.id === id)?.name || '')} // Map IDs to names
        onToggle={(concernName) => {
          const concern = CONCERN_OPTIONS.find((c) => c.name === concernName); // Find the concern by name
          if (concern) handleToggleConcern(concern.id); // Toggle using the ID
        }}
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
