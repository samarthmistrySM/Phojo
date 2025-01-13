import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Login } from '../../services/AuthService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthContext from '../../context/AuthContext';


const LoginScreen = () => {
  const {update} = useContext(AuthContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigation = useNavigation()

  const handleLogin = async () => {
    try {
      const response = await Login(email,password);
      await AsyncStorage.setItem('token', response.token)
      update()
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Phojo</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={{ color: '#3897f0', marginTop: 16 }}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 32,
    fontFamily: 'Dancing Script'
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#3897f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default LoginScreen