import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  Alert,
} from 'react-native';

import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { postComment } from '../services/PostService';
import Comment from './Comment';
import GlobalModal from './GlobalModal';

const CommentModal = ({
  isCommentModalVisible,
  handleCloseCommentModal,
  post,
}) => {
  const [commentText, setCommentText] = useState('');

  const { update } = useContext(AuthContext);

  const handleAddComment = async postId => {
    try {
      await postComment(postId, commentText);
      update();
    } catch (error) {
      Alert.alert(
        'Comment Failed',
        error.response?.data?.message || 'Something went wrong!',
      );
    } finally {
      setCommentText('');
    }
  };

  return (
    <GlobalModal title={"Comments"} isModalOpen={isCommentModalVisible} handleModalClose={handleCloseCommentModal}>
      <ScrollView style={styles.commentsList}>
        {post.comments.length === 0 ? (
          <Text>No comments yet.</Text>
        ) : (
          post.comments.map((comment, index) => (
            <Comment comment={comment} key={index} />
          ))
        )}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            value={commentText}
            onChangeText={setCommentText}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={() => handleAddComment(post._id)}>
            <Image
              style={styles.sendImage}
              source={require('../assets/images/paperplane.fill.png')}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </GlobalModal>
  );
};

export default CommentModal;

const styles = StyleSheet.create({
  commentsList: {
    flex: 1,
    marginBottom: 15,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  sendImage: {
    height: 25,
    width: 25,
  },
});
