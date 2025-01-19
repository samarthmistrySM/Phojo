import React, {useContext} from 'react';
import AuthContext from '../context/AuthContext';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ProfileHeader from '../components/ProfileHeader';
import PostCard from '../components/PostCard';

const ProfileScreen = () => {
  const {loggedUser} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ProfileHeader user={loggedUser} />
        {loggedUser &&
          loggedUser.posts?.map((post, index) => (
            <PostCard loggedUser={loggedUser} key={index} post={post} />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
});

export default ProfileScreen;
