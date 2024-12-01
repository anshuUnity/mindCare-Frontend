import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface InputBarProps {
  onSend: (message: string) => void;
  sending: boolean; // Add this prop to track the send state
}

const InputBar: React.FC<InputBarProps> = ({ onSend, sending }) => {
  const [inputText, setInputText] = React.useState('');

  const handleSendPress = () => {
    if (!inputText.trim()) return;
    onSend(inputText);
    setInputText(''); // Clear the input field after sending
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
        placeholder="Type your message..."
      />
      <TouchableOpacity
        style={[styles.button, sending && styles.disabledButton]} // Disable style
        onPress={handleSendPress}
        disabled={sending} // Disable the button while sending
      >
        <Text style={styles.buttonText}>{sending ? 'Waiting...' : 'Send'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  disabledButton: {
    backgroundColor: '#aaa', // Gray out the button when disabled
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default InputBar;
