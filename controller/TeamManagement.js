import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ScrollView, FlatList, Modal, Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';

export default function TeamManagement({ navigation }) {
  const auth = getAuth();
  const db = getFirestore();

  const [players, setPlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerRole, setNewPlayerRole] = useState('Player'); // Default role
  const [roleModalVisible, setRoleModalVisible] = useState(false); // Controls list visibility

  // Role options
  const roles = ["Player", "Coach", "Staff", "Management"];

  useEffect(() => {
    if (auth.currentUser) {
      fetchPlayers();
    }
  }, [auth.currentUser]);

  // Fetch all team members
  const fetchPlayers = async () => {
    if (!auth.currentUser) return;

    const userUID = auth.currentUser.uid;
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

  // Add a new team member
  const addPlayer = async () => {
    if (!auth.currentUser || !newPlayerName.trim()) return;

    const userUID = auth.currentUser.uid;
    const playersCollection = collection(db, "teams", userUID, "players");

    try {
      const newDocRef = await addDoc(playersCollection, {
        name: newPlayerName,
        role: newPlayerRole,
      });

      const newPlayer = { id: newDocRef.id, name: newPlayerName, role: newPlayerRole };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
      setNewPlayerRole('Player'); // Reset role
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  // Remove a player
  const removePlayer = async (id) => {
    if (!auth.currentUser) return;

    const userUID = auth.currentUser.uid;
    const playerDocRef = doc(db, "teams", userUID, "players", id);

    try {
      await deleteDoc(playerDocRef);
      setPlayers(players.filter((player) => player.id !== id));
    } catch (error) {
      console.error("Error deleting player:", error);
    }
  };

  return (
    <LinearGradient colors={['#e3f2fd', '#bbdefb']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.addPlayerForm}>
          <Text style={styles.sectionTitle}>Add New Team Member</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Name" 
            value={newPlayerName} 
            onChangeText={setNewPlayerName} 
            placeholderTextColor="#888"
          />

          {/* Role Selection Button */}
          <TouchableOpacity 
            style={styles.roleSelector} 
            onPress={() => setRoleModalVisible(true)}
          >
            <Text style={styles.roleSelectorText}>{newPlayerRole}</Text>
            <Ionicons name="chevron-down" size={20} color="#333" />
          </TouchableOpacity>

          {/* Role Selection Modal */}
          <Modal visible={roleModalVisible} transparent animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Role</Text>
                <FlatList 
                  data={roles}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity 
                      style={styles.roleOption} 
                      onPress={() => {
                        setNewPlayerRole(item);
                        setRoleModalVisible(false);
                      }}
                    >
                      <Text style={styles.roleOptionText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity 
                  style={styles.modalClose} 
                  onPress={() => setRoleModalVisible(false)}
                >
                  <Text style={styles.modalCloseText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity style={styles.addButton} onPress={addPlayer}>
            <Text style={styles.addButtonText}>Add Member</Text>
          </TouchableOpacity>
        </View>

        {/* Team List */}
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
      </ScrollView>
    </LinearGradient>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0D47A1', marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0D47A1', marginBottom: 15 },
  input: { 
    height: 50, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 15, marginBottom: 15,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 
  },
  roleSelector: { 
    height: 50, backgroundColor: '#fff', borderRadius: 10, 
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 15, marginBottom: 15,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 
  },
  roleSelectorText: { fontSize: 16, color: '#333' },
  addButton: { 
    backgroundColor: '#0D47A1', borderRadius: 10, padding: 15, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 5 
  },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  playerCard: { 
    flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 10,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 
  },
  playerInfo: { flex: 1 },
  playerName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  playerRole: { fontSize: 14, color: '#666' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', width: '80%', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  roleOption: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  roleOptionText: { fontSize: 16 },
  modalClose: { marginTop: 10, alignItems: 'center' },
  modalCloseText: { color: 'red', fontSize: 16, fontWeight: 'bold' }
});