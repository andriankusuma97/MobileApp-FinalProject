import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const BASE_URL = "http://192.168.100.167:4002";

const RatingModal = ({ isVisible, onClose, onRatingSelected,id }) => {
  const [selectedRating, setSelectedRating] = useState(0);

  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
    onRatingSelected(rating);
    onClose();
  };

  const sendRatingToServer = async () => {
    try {
      const access_token = await AsyncStorage.getItem("access_token");

      const response = await axios.patch(BASE_URL+'/users/rate/'+id, {
        rating: selectedRating,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "access_token": access_token,
        },
      });
      console.log('Rating updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating rating:', error);
    }
  };

  const handleClose = () => {
    sendRatingToServer();
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Rate This Driver</Text>
          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((rating) => (
              <TouchableOpacity
                key={rating}
                onPress={() => handleRatingSelect(rating)}
              >
                <Ionicons
                  name={rating <= selectedRating ? 'ios-star' : 'ios-star-outline'}
                  size={50}
                  color="#FFD700"
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity onPress={handleClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  starIcon: {
    marginHorizontal: 5,
  },
  closeButton: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#007BFF',
    marginTop: 10,
  },
});

export default RatingModal;