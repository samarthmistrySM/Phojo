import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Comment = ({comment,index}) => {
    return (
        <View key={index} style={styles.commentContainer}>
            <Image
                style={styles.commentProfileImage}
                source={{ uri: comment.user.dp }}
            />
            <View>
                <Text style={styles.commentUsername}>
                    {comment.user.username}
                </Text>
                <Text style={styles.commentText}>
                    {comment.CommentText}
                </Text>
            </View>
        </View>
    )
}

export default Comment

const styles = StyleSheet.create({

  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  commentProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: '#555',
  },
})