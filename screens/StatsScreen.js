import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useColor } from '../ColorContext';

export default function StatsScreen() {
  const [selectedTab, setSelectedTab] = useState('Air Clarity');
  const { getColor, safetyVariable } = useColor();

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
      return 'All Clear';
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
        <Text style={styles.headerText}>Statistics</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Air Clarity' && { backgroundColor: getColor() }]}
          onPress={() => setSelectedTab('Air Clarity')}
        >
          <Text style={[styles.tabText, selectedTab === 'Air Clarity' && styles.tabTextSelected]}>Air Clarity</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'CO' && { backgroundColor: getColor() }]}
          onPress={() => setSelectedTab('CO')}
        >
          <Text style={[styles.tabText, selectedTab === 'CO' && styles.tabTextSelected]}>CO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Gas' && { backgroundColor: getColor() }]}
          onPress={() => setSelectedTab('Gas')}
        >
          <Text style={[styles.tabText, selectedTab === 'Gas' && styles.tabTextSelected]}>Gas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.mainContent}>
        <Text style={styles.status}>{getStatusText()}</Text>
        <View style={styles.squareContainer}>
          <View style={[styles.square, styles.squareOuter, { backgroundColor: getTransparentColor(0.2) }]} />
          <View style={[styles.square, styles.squareMiddle, { backgroundColor: getTransparentColor(0.3) }]} />
          <View style={[styles.square, styles.squareInner, { backgroundColor: getColor() }]}>
            <Text style={styles.statText}>{safetyVariable}%</Text>
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
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#D3D3D3',
  },
  tabText: {
    fontSize: 16,
    color: 'black',
  },
  tabTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontSize: 44,
    color: '#000',
    marginBottom: 160,
  },
  squareContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 120,
  },
  square: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',

  },
  squareOuter: {
    width: 270,
    height: 270,
    borderRadius: 20,
  },
  squareMiddle: {
    width: 240,
    height: 240,
    borderRadius: 20,
  },
  squareInner: {
    width: 210,
    height: 210,
    borderRadius: 20,
  },
  statText: {
    fontSize: 60,
    color: '#000',
  },
});
