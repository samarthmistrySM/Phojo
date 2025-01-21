import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import PostCard from '../components/PostCard';

const ProfileScreen = () => {
  const {loggedUser} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.safeArea}>

    
    <View style={styles.container}>
      <ScrollView>
        <ProfileHeader user={loggedUser} />
        {loggedUser &&
          loggedUser.posts?.map((post, index) => (
            <PostCard loggedUser={loggedUser} key={index} post={post} />
          ))}
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
    backgroundColor: '#fff',
  },
});

export default ProfileScreen;
