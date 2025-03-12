import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../API/firebaseConfig'; // Ensure this path is correct
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function ScheduleManagement({ navigation }) {
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState({ date: '', time: '', opponent: '', location: '' });
  const [editMatch, setEditMatch] = useState(null); // Track the match being edited
  const auth = getAuth();
  const user = auth.currentUser;

  // Fetch matches from Firestore
  const fetchMatches = async () => {
    if (!user) {
      console.error("User is not logged in. Cannot fetch matches.");
      return;
    }

    try {
      const matchesRef = collection(db, 'users', user.uid, 'matches'); // Store matches under the user's UID
      const matchesSnapshot = await getDocs(matchesRef);
      const matchesList = matchesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMatches(matchesList);
    } catch (error) {
      console.error("Error fetching matches:", error);
      Alert.alert("Error", "Failed to fetch matches. Please try again.");
    }
  };

  // Add a new match
  const handleAddMatch = async () => {
    if (!newMatch.date || !newMatch.time || !newMatch.opponent || !newMatch.location) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const matchesRef = collection(db, 'users', user.uid, 'matches');
      await addDoc(matchesRef, newMatch);
      setNewMatch({ date: '', time: '', opponent: '', location: '' }); // Clear the form
      fetchMatches(); // Refresh the list
      Alert.alert("Success", "Match added successfully!");
    } catch (error) {
      console.error("Error adding match:", error);
      Alert.alert("Error", "Failed to add match. Please try again.");
    }
  };

  // Edit a match
  const handleEditMatch = async () => {
    if (!editMatch.date || !editMatch.time || !editMatch.opponent || !editMatch.location) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    try {
      const matchRef = doc(db, 'users', user.uid, 'matches', editMatch.id);
      await updateDoc(matchRef, editMatch);
      setEditMatch(null); // Clear the edit form
      fetchMatches(); // Refresh the list
      Alert.alert("Success", "Match updated successfully!");
    } catch (error) {
      console.error("Error updating match:", error);
      Alert.alert("Error", "Failed to update match. Please try again.");
    }
  };

  // Delete a match
  const handleDeleteMatch = async (id) => {
    try {
      const matchRef = doc(db, 'users', user.uid, 'matches', id);
      await deleteDoc(matchRef);
      fetchMatches(); // Refresh the list
      Alert.alert("Success", "Match deleted successfully!");
    } catch (error) {
      console.error("Error deleting match:", error);
      Alert.alert("Error", "Failed to delete match. Please try again.");
    }
  };

  // Fetch matches when the component mounts
  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Schedule Management</Text>

      {/* Add/Edit Match Form */}
      <View style={styles.form}>
        <Text style={styles.formTitle}>{editMatch ? "Edit Match" : "Add New Match"}</Text>
        <TextInput
          style={styles.input}
          placeholder="Date (e.g., 2023-10-15)"
          value={editMatch ? editMatch.date : newMatch.date}
          onChangeText={(text) =>
            editMatch
              ? setEditMatch({ ...editMatch, date: text })
              : setNewMatch({ ...newMatch, date: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Time (e.g., 10:00 AM)"
          value={editMatch ? editMatch.time : newMatch.time}
          onChangeText={(text) =>
            editMatch
              ? setEditMatch({ ...editMatch, time: text })
              : setNewMatch({ ...newMatch, time: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Opponent"
          value={editMatch ? editMatch.opponent : newMatch.opponent}
          onChangeText={(text) =>
            editMatch
              ? setEditMatch({ ...editMatch, opponent: text })
              : setNewMatch({ ...newMatch, opponent: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={editMatch ? editMatch.location : newMatch.location}
          onChangeText={(text) =>
            editMatch
              ? setEditMatch({ ...editMatch, location: text })
              : setNewMatch({ ...newMatch, location: text })
          }
        />
        <TouchableOpacity
          style={styles.button}
          onPress={editMatch ? handleEditMatch : handleAddMatch}
        >
          <Text style={styles.buttonText}>{editMatch ? "Update Match" : "Add Match"}</Text>
        </TouchableOpacity>
        {editMatch && (
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => setEditMatch(null)}
          >
            <Text style={styles.buttonText}>Cancel Edit</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* List of Matches */}
      <Text style={styles.sectionTitle}>Upcoming Matches</Text>
      {matches.length === 0 ? (
        <Text style={styles.noMatchesText}>No matches scheduled yet.</Text>
      ) : (
        matches.map((match) => (
          <View key={match.id} style={styles.matchCard}>
            <Text style={styles.matchText}>Date: {match.date}</Text>
            <Text style={styles.matchText}>Time: {match.time}</Text>
            <Text style={styles.matchText}>Opponent: {match.opponent}</Text>
            <Text style={styles.matchText}>Location: {match.location}</Text>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => setEditMatch(match)}>
                <Ionicons name="pencil" size={24} color="#0D47A1" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteMatch(match.id)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#e3f2fd',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#0D47A1',
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0D47A1',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0D47A1',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0D47A1',
  },
  noMatchesText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  matchCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  matchText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
