import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColor } from '../ColorContext';
import { useTranslation } from 'react-i18next';
import * as Linking from 'expo-linking';

export default function HomeScreen() {
  const { getColor, safetyVariable, setSafetyVariable } = useColor();
  const { t } = useTranslation();
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const phoneNumber = '3159828135';  // desired phone number "911"

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer + 1;
          if (newTimer === 30) {
            makePhoneCall();
          }
          return newTimer;
        });
        setSafetyVariable((prevSafetyVariable) => prevSafetyVariable + 1);
      }, 1000);
    } else if (!isTimerRunning && timer !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const makePhoneCall = () => {
    const url = `tel:${phoneNumber}`;
    Linking.openURL(url)
      .catch((err) => console.error('Error making phone call', err));
  };

  const handleButtonPress = () => {
    if (isTimerRunning) {
      setIsTimerRunning(false);
      Alert.alert(t("notification"), `${t("alarm_deactivated")}. ${t("added_seconds", { seconds: timer })}`);
      setTimer(0);
    } else {
      Alert.alert(t("notification"), t("alarm_deactivated"));
    }
  };

  const handleTestButtonPress = () => {
    setIsTimerRunning(true);
  };

  const handleResetButtonPress = () => {
    setSafetyVariable(0);
    Alert.alert(t("notification"), t("safety_variable_reset"));
  };

  const getTransparentColor = (opacity) => {
    const color = getColor();
    const rgbColor = color.replace('#', '');
    const bigint = parseInt(rgbColor, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const getStatusText = () => {
    const color = getColor();
    if (color === '#00C853') {
      return t('all_safe');
    } else if (color === '#FFD700') {
      return t('caution');
    } else if (color === '#FF3B30') {
      return t('danger');
    }
    return t('all_clear');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: getColor() }]}>
        <Text style={styles.headerText}>{t('home')}</Text>
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.status}>{getStatusText()}</Text>
        <View style={styles.circleContainer}>
          <View style={[styles.circle, styles.circleOuter, { backgroundColor: getTransparentColor(0.2) }]} />
          <View style={[styles.circle, styles.circleMiddle, { backgroundColor: getTransparentColor(0.3) }]} />
          <TouchableOpacity style={[styles.circle, styles.circleInner, { backgroundColor: getColor() }]} onPress={handleButtonPress}>
            <Ionicons name="power" size={64} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.timer}>{`${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`}</Text>
      </View>
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.testButton} onPress={handleTestButtonPress}>
          <Text style={styles.testButtonText}>Test</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resetButton} onPress={handleResetButtonPress}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0eded',
    justifyContent: 'space-between',
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
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontSize: 34,
    color: '#000',
    marginBottom: 160,
  },
  circleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleOuter: {
    width: 260,
    height: 260,
    borderRadius: 130,
  },
  circleMiddle: {
    width: 220,
    height: 220,
    borderRadius: 110,
  },
  circleInner: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  timer: {
    fontSize: 34,
    color: '#000',
    marginTop: 160,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  testButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  testButtonText: {
    color: 'white',
    fontSize: 18,
  },
  resetButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
  },
});
