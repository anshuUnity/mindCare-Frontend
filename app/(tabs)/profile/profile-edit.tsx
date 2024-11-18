// screens/EditProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from 'expo-router';

import InputField from '@/components/InputField';
import RadioGroup from '@/components/RadioGroup';
import CheckboxGroup from '@/components/CheckboxGroup';
import SaveButton from '@/components/SaveButton';
import EditProfileHeader from '@/components/EditProfileHeader';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const EditProfileScreen: React.FC = () => {
  const profile = useSelector((state: RootState) => state.auth.profile);

  const navigation = useNavigation();

  // Set the custom title on mount
  useEffect(() => {
    navigation.setOptions({ title: 'Edit Profile' });
  }, [navigation]);

  // Initialize form fields with values from Redux store
  const [fullname, setFullname] = useState(profile?.user?.first_name || 'Unknown');
  const [email, setEmail] = useState(profile?.user?.email || 'No email');
  const [gender, setGender] = useState(profile?.gender || 'Not specified');
  const [age, setAge] = useState(profile?.age?.toString() || 'N/A');
  const [phone, setPhone] = useState(profile?.phone || ''); // Assuming `phone` is part of `profile`
  const [concerns, setConcerns] = useState<string[]>(profile?.concerns || []); // Assuming `concerns` is part of `profile`

  const handleToggleConcern = (concern: string) => {
    setConcerns(prevConcerns =>
      prevConcerns.includes(concern) ? prevConcerns.filter(c => c !== concern) : [...prevConcerns, concern]
    );
  };

  const handleSave = () => {
    // Handle save action here, such as updating the profile in the Redux store or making an API call
    console.log('Profile saved');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
});

export default EditProfileScreen;
