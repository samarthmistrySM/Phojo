import React, { useState, useContext } from 'react';
import { ScrollView, View, StyleSheet, Alert, SafeAreaView, Text, TextInput, TouchableOpacity, Image } from 'react-native';
// import AuthContext from '../context/AuthContext';
import { searchUser } from '../services/UserServices';
import {useNavigation} from "@react-navigation/native"

const SearchScreen = () => {
  const [users, setUsers] = useState([]);
  // const { reload, loggedUser } = useContext(AuthContext);
  const [query, setQuery] = useState('')
  const navigation = useNavigation();
  

  const handleChange = async (text) => {
    setQuery(text);
    try {
      const res = await searchUser(query);
      setUsers(res.users);
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Something went wrong!',
      );
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Enter username'
          onChangeText={handleChange}
          value={query}
        />
        <ScrollView style={styles.scrollView}>
          {
            users.length === 0 ? (
              <Text>Try Searching ...</Text>
            ) : (
              users?.map((user, index) => (
                <TouchableOpacity onPress={()=>{navigation.navigate("UserProfileScreen",{userId : user._id})}} style={styles.userButton} key={index}>
                  <Image style={styles.profileImage} source={{ uri: user.dp }} />
                  <View>
                    <Text style={styles.userFullname}>{user.fullname}</Text>
                    <Text style={styles.userName}>{user.username}</Text>
                  </View>
                </TouchableOpacity>
              ))
            )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  scrollView: {
    flex: '1',
    padding: 10,
    paddingTop: 20,
    backgroundColor: '#fff'
  },
  userButton: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    fontSize: 18,
  },
  userFullname: {
    fontSize: 13
  }
});

export default SearchScreen;
