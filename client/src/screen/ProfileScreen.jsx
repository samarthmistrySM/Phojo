import React, {useContext} from 'react';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import AuthContext from '../context/AuthContext';

const ProfileScreen = () => {
  const {handleLogout, isAuthenticated, loggedUser} = useContext(AuthContext);

  const handleClick = async () => {
    const result = await isAuthenticated();
    console.log(result);
  };
  return (
      <View style={styles.container}>
        <Text style={styles.text}>This is {loggedUser.username}'s Profile Screen</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000',
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
