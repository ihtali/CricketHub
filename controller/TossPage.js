import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ModernDropdown from '../controller/ModernDropdown' // adjust the path based on where you save ModernDropdown.js

export default function TossPage({ navigation, route }) {
  const { teamAName, teamBName, teamAPlayers, teamBPlayers } = route.params;

  const [tossWinner, setTossWinner] = useState('');
  const [tossDecision, setTossDecision] = useState('');
  const proceedToOpeningSelection = () => {
    if (tossWinner === '' || tossDecision === '') {
      Alert.alert('Incomplete Toss', 'Please select toss winner and decision.');
      return;
    }

    navigation.navigate('OpeningSelection', {
      teamAName,
      teamBName,
      teamAPlayers,
      teamBPlayers,
      tossWinner: tossWinner === teamAName ? 'A' : 'B',
      tossDecision,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Toss</Text>

      <ModernDropdown
        label="Toss Winner"
        options={[teamAName, teamBName]}
        selectedValue={tossWinner}
        onValueChange={(value) => setTossWinner(value)}
      />

      <ModernDropdown
        label="Decision"
        options={['Bat', 'Bowl']}
        selectedValue={tossDecision}
        onValueChange={(value) => setTossDecision(value)}
      />

      <TouchableOpacity style={styles.button} onPress={proceedToOpeningSelection}>
        <Text style={styles.buttonText}>Proceed to Select Players</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e3f2fd', justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  button: { backgroundColor: '#0D47A1', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
