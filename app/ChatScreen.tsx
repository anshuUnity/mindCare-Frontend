import InputBar from '@/components/ChatScreenComponents/InputBar';
import MessageBubble from '@/components/ChatScreenComponents/MessageBubble';
import { BASE_URL } from '@/constants/api';
import { handleTokenExpiration } from '@/constants/handleTokenExpiration';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux'; // To dispatch logout action

import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { RootState, store } from '@/store';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';


interface Message {
  id: string;
  content: string;
  response?: string;
  timestamp: string;
  sender: 'bot' | 'user';
}

const ChatScreenMain = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [nextPage, setNextPage] = useState<number | null>(1); // Tracks the next page
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [sending, setSending] = useState(false); // Track if a response is pending

  const dispatch = useDispatch(); // For dispatching actions
  const router = useRouter(); // For navigation
  const token = useSelector((state: RootState) => state.auth.token); // Retrieve token from Redux state

  const fetchMessages = async (page: number) => {
    try {
      setLoading(true);
      
      const response = await fetch(
        `${BASE_URL}/chat/history/?page=${page}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the request
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log(data);
  
        const fetchedMessages = data.results.flatMap((msg: any) => [
          {
            id: `${msg.id}-user`, // Unique ID for the user message
            content: msg.content,
            sender: 'user',
            timestamp: msg.timestamp,
          },
          {
            id: `${msg.id}-bot`, // Unique ID for the bot response
            content: msg.response,
            sender: 'bot',
            timestamp: msg.timestamp,
          },
        ]);
  
        setMessages((prevMessages) => [
          ...prevMessages,
          ...fetchedMessages
        ]);
        setNextPage(data.next ? page + 1 : null); // Update nextPage if there's more data
      } else if (response.status === 403) {
        // Handle expired token
        await handleTokenExpiration(dispatch, router);
      } else {
        console.error('Failed to fetch messages:', response.status);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleSend = async (userMessage: string) => {
    if (sending) return; // Prevent sending multiple messages at once
    setSending(true);
  
    const userMessageObj: Message = {
      id: Date.now().toString(),
      content: userMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };
  
    // Add the user's message to the chat immediately
    setMessages((prevMessages) => [userMessageObj, ...prevMessages]);
  
    try {
      const response = await fetch(`${BASE_URL}/chat/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: userMessage }),
      });

      console.log(response.status, "STATUS");
      
  
      if (response.ok) {
        const botResponse = await response.json();
        const botMessageObj: Message = {
          id: botResponse.id,
          content: botResponse.response,
          sender: 'bot',
          timestamp: botResponse.timestamp,
        };
  
        // Add the bot's response to the chat
        setMessages((prevMessages) => [botMessageObj, ...prevMessages]);
      } else if (response.status === 403) {
        await handleTokenExpiration(dispatch, router); // Handle token expiration
      } else {
        console.error('Failed to send message:', response.status);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false); // Re-enable the send button
    }
  };
  

  const loadMoreMessages = async () => {
    if (nextPage && !loading) {
      await fetchMessages(nextPage);
    }
  };

  useEffect(() => {
    fetchMessages(1); // Initial fetch
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // Adjust as needed
    >
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageBubble message={item} />}
        keyExtractor={(item) => item.id}
        inverted
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          loading ? <ActivityIndicator size="small" color="#0000ff" /> : null
        }
        refreshing={isRefreshing}
        onRefresh={async () => {
          setIsRefreshing(true);
          await fetchMessages(1);
          setIsRefreshing(false);
        }}
      />
      <InputBar onSend={handleSend} sending={sending} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
});

export default function ChatScreen(){
    return (
        <Provider store={store}>
            <ChatScreenMain/>
        </Provider>
    )
};
