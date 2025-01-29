import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Mscoring from './Mscoring';

export default function MatchSetup({ navigation }) {
  const [selectedFormat, setSelectedFormat] = useState('');
  const [stadiumName, setStadiumName] = useState('');

  const handleSelectFormat = (format) => {
    setSelectedFormat(format);
  };

  const handleStartMatch = () => {
    // Navigate to the Scoring page
    navigation.navigate('Mscoring', { format: selectedFormat, stadium: stadiumName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Match Setup</Text>

      <Text style={styles.label}>Choose Match Format</Text>
      <View style={styles.optionsContainer}>
        {['10 Overs', '20 Overs', '30 Overs', '40 Overs', '50 Overs'].map((format) => (
          <TouchableOpacity
            key={format}
            style={[
              styles.option,
              selectedFormat === format && styles.selectedOption,
            ]}
            onPress={() => handleSelectFormat(format)}
          >
            <Text
              style={[
                styles.optionText,
                selectedFormat === format && styles.selectedOptionText,
              ]}
            >
              {format}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Enter Stadium Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter stadium name"
        value={stadiumName}
        onChangeText={setStadiumName}
      />

      <TouchableOpacity
        style={styles.startButton}
        onPress={handleStartMatch}
        disabled={!selectedFormat || !stadiumName}
      >
        <Text style={styles.startButtonText}>Start Match</Text>
      </TouchableOpacity>
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
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: '#0D47A1',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  option: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#0D47A1',
    margin: 5,
    width: '28%',
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: '#0D47A1',
  },
  optionText: {
    color: '#0D47A1',
    fontWeight: 'bold',
  },
  selectedOptionText: {
    color: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#0D47A1',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
  },
  startButton: {
    marginTop: 20,
    backgroundColor: '#0D47A1',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
