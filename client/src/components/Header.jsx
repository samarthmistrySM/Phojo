import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phojo</Text>
      <TouchableOpacity onPress={()=>{navigation.navigate("ChatScreen")}}>
        <Image style={styles.sendImage} source={require('../assets/images/paperplane.fill.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'Dancing Script',
    paddingBottom: 5,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sendImage:{
    height:25,
    width:25
  }
});
