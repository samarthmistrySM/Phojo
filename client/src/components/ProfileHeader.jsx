import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import EditProfileModal from './EditProfileModal';
import { followUser } from '../services/UserServices';
import FollowersModal from './FollowersModal';

const ProfileHeader = ({ user }) => {
  const { handleLogout, loggedUser, update } = useContext(AuthContext);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [isFollowerModalOpen, setFollowerModalVisible] = useState(false);


  const handleCloseFollowerModal = () => {
    setFollowerModalVisible(false);
  }

  const HandleOpenFollowersModalClick = () => {
    setFollowerModalVisible(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleCloseEditProfileModal = () => {
    setIsEditProfileOpen(false);
  };

  const handleLogoutClick = () => {
    Alert.alert('Logout', 'Are you sure want to Logout?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'OK', onPress: () => handleLogout()
      },
    ]);
  }

  const handleFollow = async (userId) => {
    try {
      await followUser(userId);
      update();
    } catch (error) {
      Alert.alert(
        'Follow Failed',
        error.response?.data?.message || 'Something went wrong!',
      );
    }
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
          <TouchableOpacity onPress={HandleOpenFollowersModalClick}>
          <View style={styles.countItem}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
              {user.followers?.length}
            </Text>
            <Text>Followers</Text>
          </View>
          </TouchableOpacity>
          <View style={styles.countItem}>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>
              267
            </Text>
            <Text>Following</Text>
          </View>
        </View>
      </View>
      <Text style={styles.fullname}>{user.fullname}</Text>

      {loggedUser._id === user._id ? (
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
      ) : (
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={() => { handleFollow(user._id) }}
            style={[styles.btn, { borderColor: 'green' }]}>
            <Text style={{ textAlign: 'center', color: 'green' }}>
              {user.followers?.some(follower => follower?._id === loggedUser?._id) ? "Unfollow" : "Follow"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, { borderColor: 'brown' }]}>
            <Text style={{ textAlign: 'center', color: 'brown' }}>Message</Text>
          </TouchableOpacity>

        </View>
      )}

      <EditProfileModal isEditProfileOpen={isEditProfileOpen} handleCloseEditProfileModal={handleCloseEditProfileModal} />
      <FollowersModal isFollowerModalOpen={isFollowerModalOpen} handleCloseFollowerModal={handleCloseFollowerModal} user={user}/>
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
    marginBottom: 10,
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
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  profileCounts: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
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
