import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Message {
  content: string;
  sender: 'bot' | 'user';
}

interface Props {
  message: Message;
}

const MessageBubble: React.FC<Props> = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <View
      style={[
        styles.messageContainer,
        isBot ? styles.botMessageContainer : styles.userMessageContainer,
      ]}
    >
      <Text style={styles.messageText}>{message.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  botMessageContainer: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  userMessageContainer: {
    backgroundColor: '#cce4ff',
    alignSelf: 'flex-end',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
});

export default MessageBubble;
