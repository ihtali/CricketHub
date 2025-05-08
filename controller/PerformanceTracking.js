import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, addDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';

export default function PerformanceTracking({ navigation }) {
  const auth = getAuth(); 
  const db = getFirestore(); 

  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerMatches, setNewPlayerMatches] = useState('');
  const [newPlayerRuns, setNewPlayerRuns] = useState('');
  const [newPlayerWickets, setNewPlayerWickets] = useState('');
  const [editingPlayerId, setEditingPlayerId] = useState(null);

  // Fetch players from Firestore
  useEffect(() => {
    if (auth.currentUser) {
      fetchPlayers();
    }
  }, [auth.currentUser]);

  const fetchPlayers = async () => {
    if (!auth.currentUser) return;
  
    const userUID = auth.currentUser.uid;
    const playersCollection = collection(db, "teams", userUID, "players");
  
    try {
      const querySnapshot = await getDocs(playersCollection);
      const playersList = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((player) => player.role === "Player"); // 🔥 Only fetch players
  
      setPlayers(playersList);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };
  
  

  // Add a new player to Firestore
  const addPlayer = async () => {
    if (!auth.currentUser || !newPlayerName.trim() || !newPlayerMatches || !newPlayerRuns || !newPlayerWickets) return;

    const userUID = auth.currentUser.uid;
    const playersCollection = collection(db, "teams", userUID, "players");

    try {
      const newDocRef = await addDoc(playersCollection, {
        name: newPlayerName,
        matches: parseInt(newPlayerMatches),
        runs: parseInt(newPlayerRuns),
        wickets: parseInt(newPlayerWickets),
      });

      const newPlayer = {
        id: newDocRef.id,
        name: newPlayerName,
        matches: parseInt(newPlayerMatches),
        runs: parseInt(newPlayerRuns),
        wickets: parseInt(newPlayerWickets),
      };

      setPlayers([...players, newPlayer]);
      resetForm();
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  // Edit player stats
  const editPlayer = (player) => {
    setEditingPlayerId(player.id);
    setNewPlayerName(player.name);
    setNewPlayerMatches(player.matches.toString());
    setNewPlayerRuns(player.runs.toString());
    setNewPlayerWickets(player.wickets.toString());
  };

  // Update player stats in Firestore
  const updatePlayer = async () => {
    if (!auth.currentUser || !editingPlayerId) return;

    const userUID = auth.currentUser.uid;
    const playerDocRef = doc(db, "teams", userUID, "players", editingPlayerId);

    try {
      await updateDoc(playerDocRef, {
        name: newPlayerName,
        matches: parseInt(newPlayerMatches),
        runs: parseInt(newPlayerRuns),
        wickets: parseInt(newPlayerWickets),
      });

      setPlayers(players.map(player => 
        player.id === editingPlayerId 
          ? { ...player, name: newPlayerName, matches: parseInt(newPlayerMatches), runs: parseInt(newPlayerRuns), wickets: parseInt(newPlayerWickets) } 
          : player
      ));

      resetForm();
    } catch (error) {
      console.error("Error updating player:", error);
    }
  };

  // Remove a player
  const removePlayer = async (id) => {
    if (!auth.currentUser) return;

    const userUID = auth.currentUser.uid;
    const playerDocRef = doc(db, "teams", userUID, "players", id);

    try {
      await deleteDoc(playerDocRef);
      setPlayers(players.filter(player => player.id !== id));
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  // Reset form
  const resetForm = () => {
    setNewPlayerName('');
    setNewPlayerMatches('');
    setNewPlayerRuns('');
    setNewPlayerWickets('');
    setEditingPlayerId(null);
  };

  return (
    <LinearGradient colors={['#e3f2fd', '#bbdefb']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>      

        {/* Add or Edit Player Form */}
        <View style={styles.addPlayerForm}>
          <Text style={styles.sectionTitle}>{editingPlayerId ? "Edit Player" : "Add New Player"}</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Player Name" 
            value={newPlayerName} 
            onChangeText={setNewPlayerName} 
            placeholderTextColor="#888"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Matches Played" 
            keyboardType="numeric" 
            value={newPlayerMatches} 
            onChangeText={setNewPlayerMatches} 
            placeholderTextColor="#888"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Total Runs" 
            keyboardType="numeric" 
            value={newPlayerRuns} 
            onChangeText={setNewPlayerRuns} 
            placeholderTextColor="#888"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Total Wickets" 
            keyboardType="numeric" 
            value={newPlayerWickets} 
            onChangeText={setNewPlayerWickets} 
            placeholderTextColor="#888"
          />
          
          {editingPlayerId ? (
            <TouchableOpacity style={styles.updateButton} onPress={updatePlayer}>
              <Text style={styles.buttonText}>Update Player</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.addButton} onPress={addPlayer}>
              <Text style={styles.buttonText}>Add Player</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Player Performance List */}
        <View style={styles.performanceList}>
          <Text style={styles.sectionTitle}>Player Performance</Text>
          <FlatList
            data={players}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.playerCard}>
                <Text style={styles.playerName}>{item.name}</Text>
                <Text style={styles.statText}>Matches: {item.matches}</Text>
                <Text style={styles.statText}>Runs: {item.runs}</Text>
                <Text style={styles.statText}>Wickets: {item.wickets}</Text>
                
                <View style={styles.actions}>
                  <TouchableOpacity onPress={() => editPlayer(item)}>
                    <Ionicons name="create" size={24} color="blue" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => removePlayer(item.id)}>
                    <Ionicons name="trash" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#0D47A1', 
    marginBottom: 15, 
    textAlign: 'center' 
  },
  input: { 
    height: 50, 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    marginBottom: 15,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 
  },
  addButton: { 
    backgroundColor: '#0D47A1', 
    borderRadius: 10, 
    padding: 15, 
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 5 
  },
  updateButton: { 
    backgroundColor: 'green', 
    borderRadius: 10, 
    padding: 15, 
    alignItems: 'center',
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 5 
  },
  buttonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  playerCard: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: 15, 
    marginBottom: 15,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 3 
  },
  playerName: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333', 
    marginBottom: 5 
  },
  statText: { 
    fontSize: 14, 
    color: '#666', 
    marginBottom: 3 
  },
  actions: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10 
  },
});