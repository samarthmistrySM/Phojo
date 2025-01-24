import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
const Phoji = require("../../assets/images/phoji.png")
import { useNavigation } from '@react-navigation/native';
const BackIcon = require("../../assets/images/lessthan.png")

const ChatHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
      <Image
        style={styles.backImage}
        source={BackIcon} />
      </TouchableOpacity>
      <Image
        source={Phoji}
        style={styles.image}
      />
      <Text style={styles.title}>Phoji</Text>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#6200EE',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 12,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  backImage:{
    width: 15,
    height: 15,
    marginRight: 20,
  }
});
