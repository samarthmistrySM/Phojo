import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const PostCard = ({index, post, loggedUser}) => {
  return (
    <View key={index} style={styles.card}>
      <View style={styles.userInfo}>
        <Image
          style={styles.profileImage}
          source={{
            uri: loggedUser?._id === post.user ? loggedUser.dp : post.user.dp,
          }}
        />
        <Text style={styles.username}>
          {loggedUser?._id === post.user
            ? loggedUser.fullname
            : post.user.fullname}
        </Text>
      </View>

      <Image style={styles.postImage} source={{uri: post.image}} />

      <Text style={styles.caption}>{post.caption}</Text>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  caption: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});
