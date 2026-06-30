import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

export function Estudiante(props) {
    return(
        <View style={styles.card}>
            <Text style={styles.texto}>Nombre: {props.nombre}</Text>
            <Text style={styles.texto}>Carrera: {props.carrera}</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    card:{
    backgroundColor:'#6BCB77',
    padding:15,
    margin:10,
    borderRadius:10
    }
});