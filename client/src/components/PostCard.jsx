import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useContext} from 'react';
import {deletePost} from '../services/PostService';
import AuthContext from '../context/AuthContext';
import {formatDistanceToNow} from 'date-fns';

const PostCard = ({index, post, loggedUser}) => {
  const {update} = useContext(AuthContext);
  const HandleDeletePost = async postId => {
    try {
      await deletePost(postId);
      update();
    } catch (error) {
      Alert.alert(
        'Delete Failed',
        error.response?.data?.message || 'Something went wrong!',
      );
    }
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
      <Image style={styles.postImage} source={{uri: post.image}} />
      <View style={styles.captionContainer}>
        <Text style={{fontWeight: '600', marginRight: '5', fontSize: '16', textTransform:'lowercase'}}>
          {loggedUser?._id === post.user
            ? loggedUser.username
            : post.user.username}
        </Text>
        <Text style={{fontSize: '15'}}>{post.caption}</Text>
      </View>
      <View style={styles.btnsContainer}>
        <TouchableOpacity style={styles.btn}>
          <Text style={[styles.btnText, {color: 'blue'}]}>
            {post.likes.length}
            {post.likes.includes(loggedUser?._id) ? ' DL' : ' L'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={[styles.btnText, {color: 'green'}]}>C</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => HandleDeletePost(post._id)}>
          <Text style={[styles.btnText, {color: 'red'}]}>D</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.date}>
        {formatDistanceToNow(new Date(post.createdAt), {addSuffix: true})}
      </Text>
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
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 5,
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
    paddingLeft: 10,
    flexDirection: 'row',
    lineHeight: 20,
  },
  btnsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
  },
  btn: {
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    textAlign: 'center',
  },
  date: {
    paddingLeft: 10,
    paddingTop: 20,
    color: '#878787',
  },
});
