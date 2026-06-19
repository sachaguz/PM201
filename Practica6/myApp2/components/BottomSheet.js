import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';

export function BottomSheet({ visible, onCerrar, titulo, children }) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
    >
      <View style={styles.fondo}>
        <Pressable style={styles.areaVacia} onPress={onCerrar} />
        <View style={styles.contenido}>
          <View style={styles.barra} />
          <Text style={styles.titulo}>{titulo}</Text>
          {children}
          <Pressable style={styles.boton} onPress={onCerrar}>
            <Text style={styles.botonTexto}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: '#00000042',
    justifyContent: 'flex-end',
  },
  areaVacia: {
    flex: 1,
  },
  contenido: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  barra: {
    width: 40,
    height: 4,
    backgroundColor: 'white',
    borderRadius: 2,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  boton: {
    marginTop: 16,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
});