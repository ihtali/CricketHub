import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function TeamName({ navigation }) {
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');

  const handleNext = () => {
    if (team1 && team2) {
      navigation.navigate('PlayerSection', { team1, team2 });
    } else {
      alert('Please enter both team names.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Team Names</Text>

      <TextInput
        style={styles.input}
        placeholder="Team 1 Name"
        value={team1}
        onChangeText={setTeam1}
      />
      <TextInput
        style={styles.input}
        placeholder="Team 2 Name"
        value={team2}
        onChangeText={setTeam2}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D47A1',
    textAlign: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0D47A1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
