import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { useTimer } from '../TimerContext';

export default function HomeScreen() {
  const { timer, isRunning, startTimer, stopTimer, resetTimer, color } = useTimer();
  const { t } = useTranslation();

  const handleButtonPress = () => {
    stopTimer();
    resetTimer();
    Alert.alert(t("notification"), t("alarm_deactivated"));
  };

  const getTransparentColor = (opacity) => {
    const rgbColor = color.replace('#', '');
    const bigint = parseInt(rgbColor, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  const getStatusText = () => {
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
      <View style={[styles.header, { backgroundColor: color }]}>
        <Text style={styles.headerText}>{t('home')}</Text>
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.status}>{getStatusText()}</Text>
        <View style={styles.circleContainer}>
          <View style={[styles.circle, styles.circleOuter, { backgroundColor: getTransparentColor(0.2) }]} />
          <View style={[styles.circle, styles.circleMiddle, { backgroundColor: getTransparentColor(0.3) }]} />
          <TouchableOpacity style={[styles.circle, styles.circleInner, { backgroundColor: color }]} onPress={handleButtonPress}>
            <Ionicons name="power" size={64} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.timer}>{`${Math.floor(timer / 60)}:${('0' + (timer % 60)).slice(-2)}`}</Text>
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
});
