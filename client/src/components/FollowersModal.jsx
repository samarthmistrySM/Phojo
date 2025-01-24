import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from 'react-native'
import React from 'react'
import GlobalModal from './GlobalModal'

const FollowersModal = ({ isFollowerModalOpen, handleCloseFollowerModal, user }) => {
  return (
    <GlobalModal title={`${user.followers?.length} Followers`} isModalOpen={isFollowerModalOpen} handleModalClose={handleCloseFollowerModal}>
      {user.followers?.length === 0 ? (
        <Text>No followers</Text>
      ) : (
        <ScrollView>
        {user.followers?.map((follwer, index) => (
          <View key={index} style={styles.user}>
            <Image style={styles.profileImage} source={{ uri: follwer.dp }} />
            <View>
              <Text style={styles.userName}>{follwer.username}</Text>
              <Text style={styles.userFullname}>{follwer.fullname}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      )}
    </GlobalModal>
  )
}

export default FollowersModal

const styles = StyleSheet.create({
  user: {
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
    fontWeight: 600,
  },
  userFullname: {
    fontSize: 13
  }
})