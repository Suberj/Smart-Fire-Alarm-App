import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColor } from '../ColorContext';

export default function SettingsScreen() {
  const { getColor } = useColor();
  const [language, setLanguage] = useState('English');
  const [modalVisible, setModalVisible] = useState(false);
  const [profileSettingsVisible, setProfileSettingsVisible] = useState(false);
  const [name, setName] = useState("User's Name");
  const [pronoun, setPronoun] = useState('He/Him');
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const savedName = await AsyncStorage.getItem('name');
        const savedPronoun = await AsyncStorage.getItem('pronoun');
        const savedProfileImage = await AsyncStorage.getItem('profileImage');
        if (savedName) setName(savedName);
        if (savedPronoun) setPronoun(savedPronoun);
        if (savedProfileImage) setProfileImage(savedProfileImage);
      } catch (error) {
        console.error('Failed to load profile data', error);
      }
    };

    loadProfileData();
  }, []);

  const handleLanguageChange = async (lang) => {
    setLanguage(lang);
    setModalVisible(false);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
      await AsyncStorage.setItem('profileImage', result.assets[0].uri);
    }
  };

  const saveProfileData = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('pronoun', pronoun);
      setProfileSettingsVisible(false);
    } catch (error) {
      console.error('Failed to save profile data', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: getColor() }]}>
        <Text style={styles.headerText}>{name}</Text>
        <Text style={styles.subHeaderText}>{pronoun}</Text>
        <View style={styles.profileIcon}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-circle-outline" size={60} color="white" />
          )}
        </View>
      </View>
      <View style={styles.mainContent}>
        <View style={styles.row}>
          <TouchableOpacity style={[styles.languageButton, { backgroundColor: getColor() }]} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Language</Text>
          </TouchableOpacity>
          <View style={styles.languageDisplay}>
            <Text style={styles.buttonText}>{language}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.largeButton}>
          <Text style={styles.buttonText}>Link Devices</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.largeButton} onPress={() => setProfileSettingsVisible(true)}>
          <Text style={styles.buttonText}>Profile Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.largeButton}>
          <Text style={styles.buttonText}>Delete Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Language Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Language</Text>
            <TouchableOpacity
              style={[styles.modalButton, language === 'English' && styles.modalButtonSelected]}
              onPress={() => handleLanguageChange('English')}
            >
              <Text style={styles.textStyle}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, language === 'Spanish' && styles.modalButtonSelected]}
              onPress={() => handleLanguageChange('Spanish')}
            >
              <Text style={styles.textStyle}>Spanish</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButtonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Profile Settings Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={profileSettingsVisible}
        onRequestClose={() => {
          setProfileSettingsVisible(!profileSettingsVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Profile Settings</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Pronoun"
              value={pronoun}
              onChangeText={setPronoun}
            />
            <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
              <Text style={styles.textStyle}>Pick an Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButtonClose]}
              onPress={saveProfileData}
            >
              <Text style={styles.textStyle}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0eded',
  },
  header: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginTop: 30,
  },
  subHeaderText: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  profileIcon: {
    marginTop: 10,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  languageButton: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageDisplay: {
    flex: 1,
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeButton: {
    width: '80%',
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: '#D3D3D3',
    marginVertical: 5,
  },
  modalButtonSelected: {
    backgroundColor: '#00C853',
  },
  modalButtonClose: {
    backgroundColor: '#2196F3',
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  input: {
    width: 200,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
});
