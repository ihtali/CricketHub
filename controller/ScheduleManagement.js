import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Modal, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db, auth } from '../API/firebaseConfig';

const ScheduleManagement = () => {
  const [matches, setMatches] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    title: '',
    venue: '',
    opponent: '',
    matchType: '',
    date: '',
    time: '',
  });

  const fetchMatches = async () => {
    const querySnapshot = await getDocs(collection(db, 'matches'));
    const allMatches = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMatches(allMatches);
  };

  const addMatch = async () => {
    const { title, venue, opponent, matchType, date, time } = form;
  
    console.log("Form Data:", form); // ✅ Check input values
    if (!title || !venue || !opponent || !matchType || !date || !time) {
      alert("Please fill in all fields");
      return;
    }
  
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert("You must be logged in to create a match.");
      return;
    }
  
    try {
      console.log("Attempting to add match…");
      await addDoc(collection(db, 'matches'), {
        ...form,
        createdBy: currentUser.email,
        createdAt: new Date(),
      });
      console.log("Match added successfully! ✅");
      setModalVisible(false);
      fetchMatches();
    } catch (error) {
      console.error("Error adding match:", error); // ❌ Log error
      alert("Error adding match. Check console.");
    }
  };
  

  const deleteMatch = async (id) => {
    await deleteDoc(doc(db, 'matches', id));
    fetchMatches();
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Scheduled Matches</Text>

      <FlatList
        data={matches}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No matches scheduled yet</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <TouchableOpacity 
                onPress={() => deleteMatch(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date:</Text>
              <Text style={styles.detailText}>{item.date} at {item.time}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Venue:</Text>
              <Text style={styles.detailText}>{item.venue}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Opponent:</Text>
              <Text style={[styles.detailText, styles.opponentText]}>{item.opponent}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Type:</Text>
              <Text style={styles.matchType}>{item.matchType}</Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>+ Add New Match</Text>
      </TouchableOpacity>

      {/* Modal for Match Creation */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create New Match</Text>
          
          <TextInput 
            placeholder="Match Title" 
            placeholderTextColor="#999"
            onChangeText={(val) => setForm({ ...form, title: val })} 
            style={styles.input} 
          />
          
          <TextInput 
            placeholder="Opponent Team" 
            placeholderTextColor="#999"
            onChangeText={(val) => setForm({ ...form, opponent: val })} 
            style={styles.input} 
          />
          
          <TextInput 
            placeholder="Venue" 
            placeholderTextColor="#999"
            onChangeText={(val) => setForm({ ...form, venue: val })} 
            style={styles.input} 
          />
          
          <TextInput 
            placeholder="Match Type (e.g. T20)" 
            placeholderTextColor="#999"
            onChangeText={(val) => setForm({ ...form, matchType: val })} 
            style={styles.input} 
          />
          
          <TextInput 
            placeholder="Date (e.g. 2025-04-28)" 
            placeholderTextColor="#999"
            onChangeText={(val) => setForm({ ...form, date: val })} 
            style={styles.input} 
          />
          
          <TextInput 
            placeholder="Time (e.g. 14:30)" 
            placeholderTextColor="#999"
            onChangeText={(val) => setForm({ ...form, time: val })} 
            style={styles.input} 
          />
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.submitButton]}
              onPress={addMatch}
            >
              <Text style={styles.buttonText}>Create Match</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f8f9fa' 
  },
  header: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 20,
    color: '#2c3e50'
  },
  listContainer: {
    paddingBottom: 20
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  emptyText: {
    fontSize: 16,
    color: '#7f8c8d'
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  deleteButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e74c3c',
    alignItems: 'center',
    justifyContent: 'center'
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 'bold'
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 6
  },
  detailLabel: {
    fontWeight: '600',
    color: '#7f8c8d',
    width: 80
  },
  detailText: {
    flex: 1,
    color: '#34495e'
  },
  opponentText: {
    fontWeight: 'bold',
    color: '#e74c3c'
  },
  matchType: {
    color: '#3498db',
    fontWeight: '600'
  },
  addButton: {
    backgroundColor: '#3498db',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#f8f9fa'
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#2c3e50',
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    marginRight: 10
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    marginLeft: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});
export default ScheduleManagement;
