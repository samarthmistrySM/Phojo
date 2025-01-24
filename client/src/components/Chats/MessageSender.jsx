import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import React, { useState } from 'react';
import {ErrorMessage, ReceivedChat, SentChat} from "../Chats/ChatMessage"
import { getChat } from '../../services/chatServices';

const MessageSender = ({ setMessages }) => {
  const [prompt, setPrompt] = useState('');

  const handleSend = async () => {
    setMessages((prev) => [...prev, <SentChat text={prompt} />]);

    try {
      const res = await getChat(prompt);

      if (res?.text) {
        setMessages((prev) => [...prev, <ReceivedChat text={res.text} />]);
      } else {
        setMessages((prev) => [...prev, <ErrorChat text="Unexpected response from the server." />]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, <ErrorChat text="An error occurred. Please try again later." />]);
    }

    setPrompt('');
  };

  return (
    <View style={styles.sender}>
      <TextInput
        style={styles.input}
        placeholder="Type a message"
        value={prompt}
        onChangeText={setPrompt}
      />
      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.sendButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MessageSender;

const styles = StyleSheet.create({
  sender: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#6200EE',
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
