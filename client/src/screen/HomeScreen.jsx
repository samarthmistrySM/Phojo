import React, { useEffect, useState, useContext } from 'react';
import { Button, Text, View, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { getAllPosts } from '../services/FeedService';
import AuthContext from '../context/AuthContext';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const { reload } = useContext(AuthContext);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await getAllPosts();
        setPosts(posts);
        console.log(posts);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
    console.log(posts);
  }, [reload]);

  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {posts.map((post, key) => (
        <View key={key} style={styles.card}>
          <View style={styles.userInfo}>
            <Image style={styles.profileImage} source={{ uri: post.user.dp }} />
            <Text style={styles.username}>{post.user.fullname}</Text>
          </View>

          <Image style={styles.postImage} source={{ uri: post.image }} />

          <Text style={styles.caption}>{post.caption}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
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

export default HomeScreen;
