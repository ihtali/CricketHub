import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, addDoc, getDocs, deleteDoc } from 'firebase/firestore';

export default function TeamManagement({ navigation }) {
  const auth = getAuth(); // Get logged-in user
  const db = getFirestore(); // Firestore instance

  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerRole, setNewPlayerRole] = useState('');

  useEffect(() => {
    if (auth.currentUser) {
      fetchPlayers();
    }
  }, [auth.currentUser]);

  // Fetch players from Firestore
  const fetchPlayers = async () => {
    if (!auth.currentUser) return;
  
    const userUID = auth.currentUser.uid; // Use UID instead of email
    const playersCollection = collection(db, "teams", userUID, "players");
  
    try {
      const querySnapshot = await getDocs(playersCollection);
      const playersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlayers(playersList);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };
  

  // Add a new player
  const addPlayer = async () => {
    if (!auth.currentUser || !newPlayerName.trim() || !newPlayerRole.trim()) return;
  
    const userUID = auth.currentUser.uid; // Use UID instead of email
    const playersCollection = collection(db, "teams", userUID, "players");
  
    try {
      const newDocRef = await addDoc(playersCollection, {
        name: newPlayerName,
        role: newPlayerRole,
      });
  
      const newPlayer = { id: newDocRef.id, name: newPlayerName, role: newPlayerRole };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
      setNewPlayerRole('');
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };
  

  const removePlayer = async (id) => {
    if (!auth.currentUser) return;
  
    const userUID = auth.currentUser.uid; // Use UID instead of email
    const playerDocRef = doc(db, "teams", userUID, "players", id);
  
    try {
      await deleteDoc(playerDocRef);
      setPlayers(players.filter((player) => player.id !== id));
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Team Management</Text>
          
        </View>

        <View style={styles.addPlayerForm}>
          <Text style={styles.sectionTitle}>Add New Team Member</Text>
          <TextInput
            style={styles.input}
            placeholder="Player Name"
            value={newPlayerName}
            onChangeText={setNewPlayerName}
          />
          <TextInput
            style={styles.input}
            placeholder="Player Role (e.g., Batsman, Bowler)"
            value={newPlayerRole}
            onChangeText={setNewPlayerRole}
          />
          <TouchableOpacity style={styles.addButton} onPress={addPlayer}>
            <Text style={styles.addButtonText}>Add Player</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.playerList}>
          <Text style={styles.sectionTitle}>Team Players</Text>
          <FlatList
            data={players}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.playerCard}>
                <View style={styles.playerInfo}>
                  <Text style={styles.playerName}>{item.name}</Text>
                  <Text style={styles.playerRole}>{item.role}</Text>
                </View>
                <TouchableOpacity onPress={() => removePlayer(item.id)}>
                  <Ionicons name="trash" size={24} color="red" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#e3f2fd' },
  scrollContent: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0D47A1' },
  addPlayerForm: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0D47A1', marginBottom: 10 },
  input: { height: 50, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 15, marginBottom: 10 },
  addButton: { backgroundColor: '#0D47A1', borderRadius: 10, padding: 15, alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  playerList: { marginBottom: 20 },
  playerCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 10 },
  playerInfo: { flex: 1 },
  playerName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  playerRole: { fontSize: 14, color: '#666' },
});

