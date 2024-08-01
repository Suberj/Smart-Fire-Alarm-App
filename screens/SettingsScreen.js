import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useColor } from '../ColorContext';
import { useTranslation } from 'react-i18next';
import { useTimer } from '../TimerContext';

export default function SettingsScreen() {
  // const { getColor } = useColor();
  const { startTimer, stopTimer, color } = useTimer();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(t('english'));
  const [modalVisible, setModalVisible] = useState(false);
  const [profileSettingsVisible, setProfileSettingsVisible] = useState(false);
  const [name, setName] = useState(t('insert_name'));
  const [pronoun, setPronoun] = useState(t('pronouns'));
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const savedName = await AsyncStorage.getItem('name');
        const savedPronoun = await AsyncStorage.getItem('pronoun');
        const savedProfileImage = await AsyncStorage.getItem('profileImage');
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedName) setName(savedName);
        if (savedPronoun) setPronoun(savedPronoun);
        if (savedProfileImage) setProfileImage(savedProfileImage);
        if (savedLanguage) {
          switch(savedLanguage) {
            case 'en': setLanguage(t('english')); break;
            case 'es': setLanguage(t('spanish')); break;
            case 'fr': setLanguage(t('french')); break;
            case 'zh': setLanguage(t('mandarin')); break;
            case 'hi': setLanguage(t('hindi')); break;
            default: setLanguage(t('english'));
          }
        }
      } catch (error) {
        console.error('Failed to load profile data', error);
      }
    };

    loadProfileData();
  }, [t]);

  const handleLanguageChange = async (lang, lngCode) => {
    setLanguage(lang);
    setModalVisible(false);
    i18n.changeLanguage(lngCode);
    await AsyncStorage.setItem('language', lngCode);
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

  const confirmDeleteProfile = () => {
    Alert.alert(
      t('delete_profile'),
      t('are_you_sure'),
      [
        {
          text: t('cancel'),
          style: 'cancel',
        },
        {
          text: t('ok'),
          onPress: deleteProfileData,
        },
      ],
      { cancelable: false }
    );
  };

  const deleteProfileData = async () => {
    try {
      await AsyncStorage.removeItem('name');
      await AsyncStorage.removeItem('pronoun');
      await AsyncStorage.removeItem('profileImage');
      setName(t('insert_name'));
      setPronoun(t('pronouns'));
      setProfileImage(null);
    } catch (error) {
      console.error('Failed to delete profile data', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: color }]}>
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
          <TouchableOpacity style={[styles.languageButton, { backgroundColor: '#D3D3D3' }]} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>{t('language')}</Text>
          </TouchableOpacity>
          <View style={styles.languageDisplay}>
            <Text style={styles.buttonText}>{language}</Text>
          </View>
        </View>
        <TouchableOpacity style={[styles.largeButton, { backgroundColor: color }]}>
          <Text style={styles.buttonText}>{t('link_devices')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.largeButton, { backgroundColor: color }]} onPress={() => setProfileSettingsVisible(true)}>
          <Text style={styles.buttonText}>{t('profile_settings')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.largeButton, { backgroundColor: color }]} onPress={confirmDeleteProfile}>
          <Text style={styles.buttonText}>{t('delete_profile')}</Text>
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
            <Text style={styles.modalText}>{t('select_language')}</Text>
            <TouchableOpacity
              style={[styles.modalButton, language === t('english') && styles.modalButtonSelected]}
              onPress={() => handleLanguageChange(t('english'), 'en')}
            >
              <Text style={styles.textStyle}>{t('english')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, language === t('spanish') && styles.modalButtonSelected]}
              onPress={() => handleLanguageChange(t('spanish'), 'es')}
            >
              <Text style={styles.textStyle}>{t('spanish')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, language === t('french') && styles.modalButtonSelected]}
              onPress={() => handleLanguageChange(t('french'), 'fr')}
            >
              <Text style={styles.textStyle}>{t('french')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, language === t('mandarin') && styles.modalButtonSelected]}
              onPress={() => handleLanguageChange(t('mandarin'), 'zh')}
            >
              <Text style={styles.textStyle}>{t('mandarin')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, language === t('hindi') && styles.modalButtonSelected]}
              onPress={() => handleLanguageChange(t('hindi'), 'hi')}
            >
              <Text style={styles.textStyle}>{t('hindi')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButtonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>{t('close')}</Text>
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
            <Text style={styles.modalText}>{t('profile_settings')}</Text>
            <TextInput
              style={styles.input}
              placeholder={t('enter_name')}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder={t('enter_pronoun')}
              value={pronoun}
              onChangeText={setPronoun}
            />
            <TouchableOpacity style={styles.modalButton} onPress={pickImage}>
              <Text style={styles.textStyle}>{t('pick_image')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButtonClose]}
              onPress={saveProfileData}
            >
              <Text style={styles.textStyle}>{t('save')}</Text>
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
    backgroundColor: '#F5F5F5',
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
