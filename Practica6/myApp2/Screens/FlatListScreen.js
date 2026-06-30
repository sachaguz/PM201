import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Estudiante } from "../components/Estudiante";

export default function FlatListScreen() {
    const estudiantes = [
        { id: '1', nombre: 'Juan', carrera: 'ISC' },
        { id: '2', nombre: 'María', carrera: 'IM' },
        { id: '3', nombre: 'Pedro', carrera: 'LAGE' }
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Lista de Estudiantes</Text>

            <FlatList
                data={estudiantes}
                renderItem = {({item}) => (
                    <Estudiante nombre={item.nombre} carrera={item.carrera} />
                )}
                keyExtractor={(item) => item.id}
            />
        </View>

    )
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

    card: {
        backgroundColor: '#d4f1f4',
        padding: 15,
        margin: 10,
        borderRadius: 10
    }

});