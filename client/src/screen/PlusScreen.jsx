import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator, TextInput } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import FormData from 'form-data';
import AuthContext from '../context/AuthContext';
import { createPost } from '../services/UploadPost';

const PlusScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [caption, setCaption] = useState(''); // State to store the caption text

  const { loggedUser } = useContext(AuthContext);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, response => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.errorCode) {
        console.log('Image Picker Error: ', response.errorMessage);
      } else {
        setImageUri(response.assets[0].uri);
        setUploadResult(null);
      }
    });
  };

  const uploadImageToCloudinary = async () => {
    if (!imageUri || !caption) {
      console.log('No image selected or caption is empty');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    formData.append('upload_preset', 'gbxinum8');
    formData.append('cloud_name', 'pinorama');
    formData.append('caption', caption);

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/pinorama/image/upload',
        formData
      );
      return response.data.url;
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    const uploadedImageUrl = await uploadImageToCloudinary();
    if (uploadedImageUrl) {
      setUploadResult({ url: uploadedImageUrl });

      try {
        const createdPost = createPost(uploadedImageUrl, caption, loggedUser._id);
        console.log(createdPost);
        
      } catch (error) {
        console.error("Error logging in:", error.response?.data || error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick and Upload an Image</Text>

      <View style={styles.buttonContainer}>
        <Button title="Pick Image" onPress={pickImage} disabled={loading} />
      </View>

      {imageUri && !loading && (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}

      <TextInput
        style={styles.captionInput}
        placeholder="Enter caption"
        value={caption}
        onChangeText={setCaption}
      />

      <View style={styles.buttonContainer}>
        <Button
          title={loading ? 'Uploading...' : 'Upload Image'}
          onPress={handleImageUpload}
          disabled={loading || !imageUri || !caption}
        />
      </View>

      {loading && (
        <ActivityIndicator size="large" color="#00ff00" style={styles.loader} />
      )}

      {uploadResult && !loading && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Image uploaded successfully!</Text>
          <Text style={styles.resultText}>URL: {uploadResult.url}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    marginTop: 20,
    width: 250,
    height: 250,
    resizeMode: 'cover',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
  },
  captionInput: {
    width: '80%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 15,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 16,
    marginTop: 10,
    color: '#28a745',
    textAlign: 'center',
  },
});

export default PlusScreen;
