import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import EditProfileModal from './EditProfileModal';

const ProfileHeader = ({ user }) => {
  const { handleLogout } = useContext(AuthContext);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleCloseEditProfileModal = () => {
    setIsEditProfileOpen(false);
  };

  const handleLogoutClick = () => {
    Alert.alert('Logout', 'Are you want to Logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'OK', onPress: () => handleLogout()
      },
    ]);
  }

  return (
    <View style={styles.profileSection}>
      <Text style={styles.username}>{user.username}</Text>
      <View style={styles.profileHeader}>
        <Image style={styles.profileImage} source={{ uri: user.dp }} />
        <View style={styles.profileCounts}>
          <View style={styles.countItem}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
              {user.posts?.length}
            </Text>
            <Text>Posts</Text>
          </View>
          <View style={styles.countItem}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
              {user.followers?.length}
            </Text>
            <Text>Followers</Text>
          </View>
          <View style={styles.countItem}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
              {user.followers?.length}
            </Text>
            <Text>Following</Text>
          </View>
        </View>
      </View>
      <Text style={styles.fullname}>{user.fullname}</Text>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={handleEditProfileClick}
          style={[styles.btn, { borderColor: 'blue' }]}>
          <Text style={{ textAlign: 'center', color: 'blue' }}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogoutClick}
          style={[styles.btn, { borderColor: 'red' }]}>
          <Text style={{ textAlign: 'center', color: 'red' }}>Logout</Text>
        </TouchableOpacity>
      </View>

      <EditProfileModal isEditProfileOpen={isEditProfileOpen} handleCloseEditProfileModal={handleCloseEditProfileModal} />
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'start',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    paddingVertical: 20,
    elevation: 5,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  profileCounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countItem: {
    alignItems: 'center',
    marginLeft: 10,
    width: 65
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  fullname: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  btnContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    width: '48%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
});
