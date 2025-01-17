import React, {useEffect, useState, useContext} from 'react';
import {ScrollView, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {getAllPosts} from '../services/FeedService';
import AuthContext from '../context/AuthContext';
import PostCard from '../components/PostCard';

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const {reload} = useContext(AuthContext);

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
    <View style={styles.container}>
      <ScrollView style={styles.scroller}>
        {posts?.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    backgroundColor: '#ffffff',
  },
});

export default HomeScreen;
