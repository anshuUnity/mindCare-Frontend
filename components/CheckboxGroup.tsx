// components/CheckboxGroup.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

type CheckboxGroupProps = {
  options: string[];
  selectedOptions: string[];
  onToggle: (option: string) => void;
};

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ options, selectedOptions, onToggle }) => (
  <View style={styles.container}>
    {options.map((option) => (
      <TouchableOpacity key={String(option)} style={styles.option} onPress={() => onToggle(option)}>
        <Icon
          name={selectedOptions.includes(option) ? 'check-box' : 'check-box-outline-blank'}
          size={20}
          color="green"
        />
        <Text style={styles.label} numberOfLines={2}>
          {String(option)} {/* Ensures the option is rendered as text */}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: { flexWrap: 'wrap', flexDirection: 'row', marginVertical: 10 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%', // Set a fixed width so items wrap properly without overlapping
    paddingVertical: 5,
    marginVertical: 5, // Add some vertical spacing between options
  },
  label: {
    marginLeft: 5,
    fontSize: 16,
    color: 'green',
    flexShrink: 1, // Allow the text to wrap within the specified width
  },
});

export default CheckboxGroup;
