import React from 'react';
import {Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Thies is Home Screen</Text>
      <Button
        onPress={() => navigation.navigate('ProfileScreen')}
        title="Navigate to Profile"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
