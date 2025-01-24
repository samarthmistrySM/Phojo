import { StyleSheet, ScrollView, View } from 'react-native';
import React from 'react';

const ChatCanvas = ({ messages }) => {
  return (
    <ScrollView style={styles.canvas}>
      {messages.map((component, index) => (
        <View key={index}>
          {component}
        </View>
      ))}
    </ScrollView>
  );
};

export default ChatCanvas;

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  messageContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#e1f5fe',
    borderRadius: 8,
    alignSelf: 'flex-start',
    maxWidth: '70%',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
});
