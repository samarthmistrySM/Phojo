import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';

import React from 'react';

const GlobalModal = (props) => {
  return (
    <Modal
      visible={props.isModalOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={props.handleModalClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={props.handleModalClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>{props.title}</Text>
          {props.children}
        </View>
      </View>
    </Modal>
  );
};

export default GlobalModal;

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
});
