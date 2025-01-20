import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  Alert
} from 'react-native';

import { launchImageLibrary } from 'react-native-image-picker';

import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { uploadImageToCloudinary } from '../services/Upload';
import { updateUser } from '../services/UserServices';

const EditProfileModal = ({ isEditProfileOpen, handleCloseEditProfileModal }) => {
  const { update, loggedUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const [imageUri, setImageUri] = useState(loggedUser.dp);
  const [username, setUsername] = useState(loggedUser.username);
  const [fullname, setFullname] = useState(loggedUser.fullname);

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({ mediaType: 'photo', quality: 1 });

      if (result.didCancel) {
        console.log('User canceled image picker');
        return;
      }

      if (result.errorCode) {
        console.error('Image Picker Error: ', result.errorMessage);
        Alert.alert('Error', 'Failed to pick an image');
        return;
      }

      const selectedImageUri = result.assets[0].uri;
      setImageUri(selectedImageUri);
      setLoading(true);

      try {
        const uploadedImageUrl = await uploadImageToCloudinary(selectedImageUri);

        if (uploadedImageUrl) {
          setImageUri(uploadedImageUrl);
        }
      } catch (uploadError) {
        console.log('Error uploading image:', uploadError);
        Alert.alert('Error', 'Failed to upload image');
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.log('Unexpected error during image selection:', error);
      Alert.alert('Error', 'Something went wrong');
      setLoading(false);
    }
  };

  const handleUpdateClick = async () => {
    try {
      await updateUser(username, fullname, imageUri);
      update();
    } catch (error) {
      Alert.alert(
        'Update Failed',
        error.response?.data?.message || 'Something went wrong!',
      );
    } finally{
      handleCloseEditProfileModal();
    }
  }

  return (
    <Modal
      visible={isEditProfileOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={handleCloseEditProfileModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleCloseEditProfileModal}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.input}
              placeholder='Enter your username'
              value={username}
              onChangeText={setUsername}
            />

            <Text style={styles.label}>Full Name:</Text>
            <TextInput
              style={styles.input}
              placeholder='Enter your full name'
              value={fullname}
              onChangeText={setFullname}
            />

            <Text style={styles.label}>Avatar:</Text>
            <Image source={{ uri: imageUri }} style={styles.avatar} />

            <TouchableOpacity disabled={loading} onPress={pickImage} style={[styles.editButton, loading && { backgroundColor: '#b00000' }]}>
              <Text style={styles.buttonText}>Edit Avatar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleUpdateClick} disabled={loading} style={[styles.updateButton, loading && { backgroundColor: '#0050a5' }]}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditProfileModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '90%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    borderRadius: 15,
    padding: 5,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  avatar: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
    borderWidth: 3,
  },
  updateButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },

});
