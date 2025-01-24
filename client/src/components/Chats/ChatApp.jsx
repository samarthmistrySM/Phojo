import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatCanvas from './ChatCanvas';
import MessageSender from './MessageSender';
import { useNavigation } from '@react-navigation/native';

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <ChatHeader />
      <ChatCanvas messages={messages} />
      <MessageSender setMessages={setMessages} />
    </SafeAreaView>
  );
};

export default ChatApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  goBackButton:{
    paddingLeft:10,
  }
});
