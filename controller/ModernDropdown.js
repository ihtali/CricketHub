import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

export default function ModernDropdown({ label, options, selectedValue, onValueChange }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {selectedValue || `Select ${label}`}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    onValueChange(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  dropdown: { backgroundColor: '#fff', padding: 15, borderRadius: 10 },
  dropdownText: { fontSize: 16, color: '#333' },
  modalBackground: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { backgroundColor: '#fff', margin: 20, borderRadius: 10, padding: 20 },
  modalItem: { paddingVertical: 10 },
  modalText: { fontSize: 16 },
  closeButton: { marginTop: 10, backgroundColor: '#0D47A1', padding: 10, borderRadius: 10, alignItems: 'center' },
  closeButtonText: { color: '#fff', fontWeight: 'bold' },
});
