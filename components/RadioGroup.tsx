// components/RadioGroup.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type RadioGroupProps = {
  options: string[];
  selectedOption: string;
  onSelect: (option: string) => void;
};

const RadioGroup: React.FC<RadioGroupProps> = ({ options, selectedOption, onSelect }) => (
  <View style={styles.container}>
    {options.map(option => (
      <TouchableOpacity key={option} style={styles.option} onPress={() => onSelect(option)}>
        <Text style={[styles.radio, selectedOption === option && styles.selectedRadio]}>{option}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  option: { flexDirection: 'row', alignItems: 'center' },
  radio: { fontSize: 16, color: 'green' },
  selectedRadio: { fontWeight: 'bold' },
});

export default RadioGroup;
