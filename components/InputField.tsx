// components/InputField.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type InputFieldProps = {
  label: string;
  value: string;
  iconName: string;
  placeholder: string;
  keyboardType: string;
  onChangeText: (text: string) => void;
};

const InputField: React.FC<InputFieldProps> = ({ label, value, iconName, placeholder, onChangeText, keyboardType }) => (
  <View style={styles.container}>
    <Icon name={iconName} size={20} color="green" />
    <Text style={styles.label}>{label}</Text>
    <TextInput
      value={value}
      placeholder={placeholder}
      keyboardType={keyboardType}
      style={styles.input}
      onChangeText={onChangeText}
      underlineColorAndroid="transparent"
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, borderBottomWidth: 1, borderBottomColor: 'green' },
  label: { marginLeft: 5, color: 'green', fontSize: 16 },
  input: { flex: 1, marginLeft: 10, fontSize: 16 },
});

export default InputField;
