// components/SaveButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SaveButton: React.FC<{ onPress: () => void }> = ({ onPress }) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>SAVE CHANGES</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: { backgroundColor: '#FFD700', paddingVertical: 15, borderRadius: 5, marginVertical: 20, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default SaveButton;
