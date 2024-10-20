import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { Link, useNavigation, useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { BASE_URL } from '../constants/api';


export default function SignupScreen() {
  const navigation = useNavigation();
  const router = useRouter(); // Initialize router for navigation

  // Disable the automatic title on the page.
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  // State variables for form data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for button

  // Check if all fields are filled to enable/disable the button
  const isFormValid = firstName && lastName && email && password && confirmPassword;

  const handleSignup = async () => {
    // Validate if password and confirm password match
    if (password !== confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Passwords do not match',
      });
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      // API request for signup using the base URL from constants
      const response = await fetch(`${BASE_URL}/signup/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          first_name: firstName,
          last_name: lastName,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Display error message in toast
        Toast.show({
          type: 'error',
          text1: 'Signup failed',
          text2: data.email ? data.email[0] : 'An error occurred',
        });
      } else {
        // Display success message and navigate to login screen
        Toast.show({
          type: 'success',
          text1: 'Signup Successful',
        });
        router.replace('/Login'); // Use router.replace to navigate to login page
      }
    } catch (error) {
      // Handle network or other errors
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: error.message,
      });
    } finally {
      setLoading(false); // Reset loading state when done
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.headerImageContainer}>
          <Image source={require('../assets/images/yoga_main.jpg')} style={styles.headerImage} />
        </View>

        <Text style={styles.title}>SIGNUP</Text>

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#999"
        />

        {/* Signup Button */}
        <TouchableOpacity
          style={[styles.signupButton, !isFormValid && styles.disabledButton]} // Add disabled style when form is incomplete
          onPress={handleSignup}
          disabled={!isFormValid || loading} // Disable when loading or form is incomplete
        >
          {loading ? ( // Show loader when loading
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <Text style={styles.signupButtonText}>SIGNUP</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account? <Link href="/Login" style={styles.linkText}>Login</Link>
        </Text>

        {/* Toast notification component */}
        <Toast />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerImageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F0E8',
    paddingHorizontal: 15,
    marginVertical: 10,
    fontSize: 16,
    color: '#333',
    marginHorizontal: 20, // Added margin on both sides
  },
  signupButton: {
    backgroundColor: '#FFD700',
    borderRadius: 25,
    paddingVertical: 15,
    marginVertical: 20,
    width: 200,
    alignSelf: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#d3d3d3', // Disabled button color
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  footerText: {
    textAlign: 'center',
    color: '#4CAF50',
    fontSize: 14,
  },
  linkText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
});
