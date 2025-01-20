import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import AuthContext from '../context/AuthContext';
import {createPost, uploadImageToCloudinary} from '../services/Upload';
import {useNavigation} from '@react-navigation/native';

const PlusScreen = () => {
  const [imageUri, setImageUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  
  const [caption, setCaption] = useState('');
  const navigation = useNavigation();
  const {loggedUser, update} = useContext(AuthContext);

  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
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

  const handleImageUpload = async () => {
    setLoading(true);
    const uploadedImageUrl = await uploadImageToCloudinary(imageUri);
    if (uploadedImageUrl) {
      setUploadResult({url: uploadedImageUrl});
      try {
        await createPost(uploadedImageUrl, caption, loggedUser._id);
        update();
        navigation.navigate('ProfileScreen');
      } catch (error) {
        console.error(
          'Error uploading image:',
          error.response?.data || error.message,
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick and Upload an Image</Text>

      <View style={styles.buttonContainer}>
        <Button title={imageUri ? 'Change Image' : 'Pick Image'} onPress={pickImage} disabled={loading} />
      </View>

      {imageUri && !loading && (
        <View style={styles.imageContainer}>
          <Image source={{uri: imageUri}} style={styles.image} />
          <TextInput
            style={styles.captionInput}
            placeholder="Enter caption"
            value={caption}
            onChangeText={setCaption}
          />
        </View>
      )}

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
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
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
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 4,
  },
  imageContainer:{
    width: 250,
    
  },
  captionInput: {
    width: '100%',
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
