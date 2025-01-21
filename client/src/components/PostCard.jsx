import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,

} from 'react-native';
import React, { useContext, useState } from 'react';
import { deletePost, likeDisLikePost } from '../services/PostService';
import AuthContext from '../context/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import CommentModal from './CommentModal';

const commentIcon = require("../assets/images/message.png");
const likeIcon = require("../assets/images/heart.png");
const disLikeIcon = require("../assets/images/heart.fill.png");
const deleteIcon = require("../assets/images/xmark.bin.png");

const PostCard = ({ index, post, loggedUser }) => {
  const { update } = useContext(AuthContext);
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

  const HandleDeletePost = postId => {
    Alert.alert('Delete Post', 'Are you want to delete post?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
      },
      {
        text: 'OK', onPress: async () => {
          try {
            await deletePost(postId);
            update();
          } catch (error) {
            Alert.alert(
              'Delete Failed',
              error.response?.data?.message || 'Something went wrong!',
            );
          }
        }
      },
    ]);

  };

  const handleLikePost = async postId => {
    try {
      await likeDisLikePost(postId);
      update();
    } catch (error) {
      Alert.alert(
        'Like Failed',
        error.response?.data?.message || 'Something went wrong!',
      );
    }
  };

  const handleCommentClick = () => {
    setIsCommentModalVisible(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalVisible(false);
  };

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
      <Image style={styles.postImage} source={{ uri: post.image }} />
      <View style={styles.captionContainer}>
        <Text style={styles.usernameText}>
          {loggedUser?._id === post.user
            ? loggedUser.username
            : post.user.username}
        </Text>
        <Text style={styles.caption}>{post.caption}</Text>
      </View>
      <View style={styles.btnsContainer}>
        <TouchableOpacity style={[styles.btn, { flexDirection: 'row' }]} onPress={() => handleLikePost(post._id)}>
          <Text style={styles.likeCount}>{post.likes.length}</Text>
          <Image
            style={[styles.icon, { tintColor: 'blue' }]}
            source={post.likes.includes(loggedUser?._id) ? disLikeIcon : likeIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={handleCommentClick}>
          <Image style={[styles.icon, { tintColor: 'green' }]} source={commentIcon} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn} onPress={() => HandleDeletePost(post._id)}>
          <Image style={[styles.icon, { tintColor: 'red' }]} source={deleteIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.date}>
        {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
      </Text>
      <CommentModal
        isCommentModalVisible={isCommentModalVisible}
        handleCloseCommentModal={handleCloseCommentModal}
        post={post}
      />
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
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
    marginBottom: 10,

  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
    paddingLeft: 10,
  },
  usernameText: {
    fontWeight: '600',
    fontSize: 16,
    marginRight: 5,
    textTransform: 'lowercase',
  },
  caption: {
    fontSize: 15,
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    width: 40,
  },
  icon: {
    width: 21,
    height: 19,
  },
  likeCount: {
    fontSize: 17,
    color: 'blue',
    paddingRight: 10,
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: '#878787',
    marginTop: 10,
    paddingLeft: 10,
  },
});
