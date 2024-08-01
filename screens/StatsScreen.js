import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useColor } from '../ColorContext';
import { useTranslation } from 'react-i18next';
import { useTimer } from '../TimerContext';

export default function StatsScreen() {
  const { startTimer, stopTimer, color } = useTimer();
  const { t } = useTranslation();

  const [selectedStat, setSelectedStat] = useState('Air_qual');

  const Air_qual = 5;  // Example values, replace with actual data
  const CO_num = 10;    // Example values, replace with actual data
  const Gas_num = 15;   // Example values, replace with actual data

  const THRESHOLD_AIR_QUAL = 20; // Example threshold, adjust as needed
  const THRESHOLD_CO_NUM = 20;   // Example threshold, adjust as needed
  const THRESHOLD_GAS_NUM = 20;  // Example threshold, adjust as needed

  useEffect(() => {
    checkThresholds();
  }, [Air_qual, CO_num, Gas_num]);

  const checkThresholds = () => {
    if (Air_qual > THRESHOLD_AIR_QUAL || CO_num > THRESHOLD_CO_NUM || Gas_num > THRESHOLD_GAS_NUM) {
      startTimer();
    } else {
      stopTimer();
    }
  };

  const getDisplayValue = () => {
    switch (selectedStat) {
      case 'Air_qual':
        return Air_qual;
      case 'CO_num':
        return CO_num;
      case 'Gas_num':
        return Gas_num;
      default:
        return 0;
    }
  };

  const getStatusText = () => {
    const value = getDisplayValue();
    if (value < 20) {
      return t('all_clear');
    } else if (value < 50) {
      return t('caution');
    } else {
      return t('danger');
    }
  };

  const getTransparentColor = (opacity) => {
    const rgbColor = color.replace('#', '');
    const bigint = parseInt(rgbColor, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: color }]}>
        <Text style={styles.headerText}>{t('statistics')}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.topButton,
            { backgroundColor: selectedStat === 'Air_qual' ? color : '#D3D3D3' },
          ]}
          onPress={() => setSelectedStat('Air_qual')}
        >
          <Text style={styles.buttonText}>{t('air_clarity')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.topButton,
            { backgroundColor: selectedStat === 'CO_num' ? color : '#D3D3D3' },
          ]}
          onPress={() => setSelectedStat('CO_num')}
        >
          <Text style={styles.buttonText}>{t('co')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.topButton,
            { backgroundColor: selectedStat === 'Gas_num' ? color : '#D3D3D3' },
          ]}
          onPress={() => setSelectedStat('Gas_num')}
        >
          <Text style={styles.buttonText}>{t('gas')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.status}>{getStatusText()}</Text>
        <View style={styles.squareContainer}>
          <View style={[styles.square, styles.squareOuter, { backgroundColor: getTransparentColor(0.2) }]} />
          <View style={[styles.square, styles.squareMiddle, { backgroundColor: getTransparentColor(0.3) }]} />
          <View style={[styles.square, styles.squareInner, { backgroundColor: color }]}>
            <Text style={styles.squareText}>{getDisplayValue()}%</Text>
          </View>
        </View>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  topButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontSize: 34,
    color: '#000',
    marginBottom: 20,
  },
  squareContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareOuter: {
    width: 260,
    height: 260,
    borderRadius: 20,
  },
  squareMiddle: {
    width: 220,
    height: 220,
    borderRadius: 20,
  },
  squareInner: {
    width: 180,
    height: 180,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareText: {
    fontSize: 60,
    color: 'black',
  },
});
