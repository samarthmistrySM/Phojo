import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ReceivedChat = ({ text }) => {
  return (
    <View style={styles.receivedContainer}>
      <Text style={styles.receivedText}>{text}</Text>
    </View>
  );
};

const SentChat = ({ text }) => {
  return (
    <View style={styles.sentContainer}>
      <Text style={styles.sentText}>{text}</Text>
    </View>
  );
};

const ErrorMessage = ({ message }) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

export { ReceivedChat, SentChat, ErrorMessage };

const styles = StyleSheet.create({
  receivedContainer: {
    alignSelf: 'flex-start',
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#d1f7c4',
    padding: 15,
    borderRadius: 15,
    borderTopLeftRadius: 0,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  receivedText: {
    color: '#333',
    fontSize: 16,
    lineHeight: 20,
  },

  sentContainer: {
    alignSelf: 'flex-end',
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#b0e6ff',
    padding: 15,
    borderRadius: 15,
    borderTopRightRadius: 0,
    maxWidth: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sentText: {
    color: '#333',
    fontSize: 16,
    lineHeight: 20,
  },

  errorContainer: {
    backgroundColor: '#ff4d4d', 
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  errorText: {
    color: '#fff', 
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
