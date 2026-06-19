import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { MiModal } from '../components/MiModal';
import { BottomSheet } from '../components/BottomSheet';

export default function Componente1() {
  const [modalVisible, setModalVisible] = useState(false);
  const [sheetVisible, setSheetVisible] = useState(false);

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Práctica: Modal & Bottom Sheet</Text>

      <Pressable
        style={[styles.boton, { backgroundColor: 'blue' }]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.botonTexto}>Abrir Modal</Text>
      </Pressable>

      <Pressable
        style={[styles.boton, { backgroundColor: 'green' }]}
        onPress={() => setSheetVisible(true)}
      >
        <Text style={styles.botonTexto}>Abrir Bottom Sheet</Text>
      </Pressable>

      <MiModal
        visible={modalVisible}
        onCerrar={() => setModalVisible(false)}
        titulo="Modal Centrado"
      >
        <Text>Este modal aparece al centro con fade.</Text>
      </MiModal>

      <BottomSheet
        visible={sheetVisible}
        onCerrar={() => setSheetVisible(false)}
        titulo="Bottom Sheet"
      >
        <Text>Este panel aparece desde abajo con slide.</Text>
      </BottomSheet>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  boton: {
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
