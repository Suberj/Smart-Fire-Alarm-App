import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColor } from '../ColorContext';

export default function HomeScreen() {
  const { getColor } = useColor();

  const handleButtonPress = () => {
    Alert.alert("Notification", "The Alarm is Deactivated");
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
      return 'All Safe';
    } else if (color === '#FFD700') {
      return 'Caution';
    } else if (color === '#FF3B30') {
      return 'Danger';
    }
    return 'All Clear';
  };

  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: getColor() }]}>
        <Text style={styles.headerText}>HOME</Text>
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
        <Text style={styles.timer}>0:00</Text>
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
