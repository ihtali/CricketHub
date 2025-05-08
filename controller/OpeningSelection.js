import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import ModernDropdown from '../controller/ModernDropdown';

export default function OpeningSelection({ navigation, route }) {
  const { teamAName, teamBName, teamAPlayers, teamBPlayers, tossWinner, tossDecision } = route.params;

  // Determine which team is batting and which is bowling
  const battingTeam = (tossWinner === 'A' && tossDecision === 'Bat') || (tossWinner === 'B' && tossDecision === 'Bowl') ? teamAPlayers : teamBPlayers;
  const bowlingTeam = (battingTeam === teamAPlayers) ? teamBPlayers : teamAPlayers;
  const battingTeamName = (battingTeam === teamAPlayers) ? teamAName : teamBName;
  const bowlingTeamName = (bowlingTeam === teamAPlayers) ? teamAName : teamBName;

  const [striker, setStriker] = useState('');
  const [nonStriker, setNonStriker] = useState('');
  const [bowler, setBowler] = useState('');

  const startMatch = () => {
    if (!striker || !nonStriker || !bowler) {
      Alert.alert('Incomplete Selection', 'Please select both batsmen and the bowler.');
      return;
    }
    if (striker === nonStriker) {
      Alert.alert('Invalid Selection', 'Striker and Non-Striker must be different players.');
      return;
    }

    navigation.navigate('ScoringScreen', {
      teamAName,
      teamBName,
      teamAPlayers,
      teamBPlayers,
      battingTeamName,
      bowlingTeamName,
      striker,
      nonStriker,
      bowler,
      tossWinner,
      tossDecision,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Opening Selection</Text>

      <ModernDropdown
        label={`Striker (${battingTeamName})`}
        options={battingTeam}
        selectedValue={striker}
        onValueChange={(value) => setStriker(value)}
      />

      <ModernDropdown
        label={`Non-Striker (${battingTeamName})`}
        options={battingTeam}
        selectedValue={nonStriker}
        onValueChange={(value) => setNonStriker(value)}
      />

      <ModernDropdown
        label={`Bowler (${bowlingTeamName})`}
        options={bowlingTeam}
        selectedValue={bowler}
        onValueChange={(value) => setBowler(value)}
      />

      <TouchableOpacity style={styles.startButton} onPress={startMatch}>
        <Text style={styles.startButtonText}>Start Scoring</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e3f2fd', justifyContent: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30 },
  startButton: { backgroundColor: '#0D47A1', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  startButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
