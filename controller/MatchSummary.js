import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function MatchSummary({ route, navigation }) {
  const {
    teamAName,
    teamBName,
    battingTeamName,
    bowlingTeamName,
    battingStats,
    bowlingStats,
    result,
    targetRuns,
    finalRuns,
    finalWickets,
  } = route.params;

  const calculateStrikeRate = (runs, balls) => {
    if (balls === 0) return 0;
    return ((runs / balls) * 100).toFixed(2);
  };

  const calculateEconomy = (runs, balls) => {
    if (balls === 0) return 0;
    return ((runs / (balls / 6))).toFixed(2);
  };

  const renderBattingScorecard = () => {
    return Object.keys(battingStats).map((player, index) => {
      const stats = battingStats[player];
      return (
        <View key={index} style={styles.scoreRow}>
          <Text style={styles.playerName}>{player}</Text>
          <Text style={styles.statText}>{stats.runs}</Text>
          <Text style={styles.statText}>{stats.balls}</Text>
          <Text style={styles.statText}>{stats.fours}</Text>
          <Text style={styles.statText}>{stats.sixes}</Text>
          <Text style={styles.statText}>{calculateStrikeRate(stats.runs, stats.balls)}</Text>
        </View>
      );
    });
  };

  const renderBowlingFigures = () => {
    return Object.keys(bowlingStats).map((bowler, index) => {
      const stats = bowlingStats[bowler];
      return (
        <View key={index} style={styles.scoreRow}>
          <Text style={styles.playerName}>{bowler}</Text>
          <Text style={styles.statText}>{(stats.ballsBowled / 6).toFixed(1)}</Text>
          <Text style={styles.statText}>{stats.runsConceded}</Text>
          <Text style={styles.statText}>{stats.wickets}</Text>
          <Text style={styles.statText}>{calculateEconomy(stats.runsConceded, stats.ballsBowled)}</Text>
        </View>
      );
    });
  };

  const resultText = result === 'win' 
    ? `${battingTeamName} WON by ${10 - finalWickets} wickets!`
    : `${bowlingTeamName} WON by ${targetRuns - finalRuns - 1} runs!`;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.resultHeader}>Match Result</Text>
      <Text style={styles.resultText}>{resultText}</Text>

      <Text style={styles.sectionHeader}>Batting Scorecard</Text>
      <View style={styles.scoreHeader}>
        <Text style={styles.headerText}>Player</Text>
        <Text style={styles.headerText}>R</Text>
        <Text style={styles.headerText}>B</Text>
        <Text style={styles.headerText}>4s</Text>
        <Text style={styles.headerText}>6s</Text>
        <Text style={styles.headerText}>SR</Text>
      </View>
      {renderBattingScorecard()}

      <Text style={styles.sectionHeader}>Bowling Figures</Text>
      <View style={styles.scoreHeader}>
        <Text style={styles.headerText}>Bowler</Text>
        <Text style={styles.headerText}>Ov</Text>
        <Text style={styles.headerText}>R</Text>
        <Text style={styles.headerText}>W</Text>
        <Text style={styles.headerText}>Eco</Text>
      </View>
      {renderBowlingFigures()}

      <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('HomePage')}>
        <Text style={styles.homeButtonText}>Go to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#e3f2fd' },
  resultHeader: { fontSize: 28, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  resultText: { fontSize: 20, textAlign: 'center', marginBottom: 20, color: 'green' },
  sectionHeader: { fontSize: 22, fontWeight: 'bold', marginVertical: 15 },
  scoreHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  playerName: { flex: 2, fontSize: 14, fontWeight: 'bold' },
  statText: { flex: 1, fontSize: 14, textAlign: 'center' },
  headerText: { flex: 1, fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  homeButton: { backgroundColor: '#0D47A1', marginTop: 30, padding: 15, borderRadius: 10, alignItems: 'center' },
  homeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

