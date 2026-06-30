import React from "react";
import { View, Text, SectionList, StyleSheet } from "react-native";

export default function SectionListScreen() {
    const estudiantes = [
        { title: 'Sistemas', data: [{ nombre: 'Erick'}, { nombre: 'Juan'}, { nombre: 'Pao'}] },
        { title: 'Administracion', data: [{ nombre: 'Javier'}, { nombre: 'Regina'}, { nombre: 'Alonso'}] },
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Estudiantes</Text>

            <SectionList
                sections={estudiantes}
                renderSectionHeader={({ section }) => (
                    <Text style={styles.header}>{section.title}</Text>
                )}
                renderItem={({ item }) => (
                    <Text style={styles.item}>{item.nombre}</Text>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  titulo: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#90caf9',
    padding: 10
  },
  item: {
    padding: 15
  }
});