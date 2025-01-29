import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Mscoring({ route }) {
  const { format, stadium } = route.params; // Accessing data passed from MatchSetup
  const [score, setScore] = useState(0);
  const [overs, setOvers] = useState(0);
  const [wickets, setWickets] = useState(0);

  const handleAddRun = (runs) => {
    setScore(score + runs);
  };

  const handleAddWicket = () => {
    setWickets(wickets + 1);
  };

  const handleAddOver = () => {
    setOvers(overs + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scoring Page</Text>
      <Text style={styles.info}>Match Format: {format}</Text>
      <Text style={styles.info}>Stadium: {stadium}</Text>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.scoreText}>Overs: {overs}</Text>
        <Text style={styles.scoreText}>Wickets: {wickets}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleAddRun(1)}>
          <Text style={styles.buttonText}>+1 Run</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleAddRun(4)}>
          <Text style={styles.buttonText}>+4 Runs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleAddRun(6)}>
          <Text style={styles.buttonText}>+6 Runs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAddWicket}>
          <Text style={styles.buttonText}>+1 Wicket</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAddOver}>
          <Text style={styles.buttonText}>+1 Over</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e3f2fd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0D47A1',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  scoreContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 18,
    marginVertical: 5,
    fontWeight: 'bold',
    color: '#0D47A1',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#0D47A1',
    padding: 15,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
