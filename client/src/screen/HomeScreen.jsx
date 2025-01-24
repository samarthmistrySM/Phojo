import React, {useEffect, useState, useContext} from 'react';
import {ScrollView, View, StyleSheet, Alert, SafeAreaView} from 'react-native';
import { getAllPosts } from '../services/FeedService';
import AuthContext from '../context/AuthContext';
import PostCard from '../components/PostCard';
import Header from '../components/Header';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const {reload, loggedUser} = useContext(AuthContext);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const posts = await getAllPosts();
        setPosts(posts);
      } catch (error) {
        Alert.alert(
          'Post Fetch Failed',
          error.response?.data?.message || 'Something went wrong!',
        );
      }
    };
    getPosts();
  }, [reload]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Header />
        </View>

        <ScrollView>
          {posts?.map((post, index) => (
            <PostCard loggedUser={loggedUser} key={index} post={post} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default HomeScreen;
