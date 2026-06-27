import { StyleSheet, Text, Alert, Button, View, Platform } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const ComponenteAlert = () => {
  const [message, setMessage] = useState('Sin acción');

  
  const mostrarAlerta = (titulo, mensaje, botones) => {
    if (Platform.OS === 'web') {
      
      const resultado = window.confirm(titulo + (mensaje ? '\n' + mensaje : ''));
      
      if (resultado) {
        
        const botonAceptar = botones.find(b => b.style !== 'cancel' && b.text !== 'Pregúntame más tarde');
        if (botonAceptar && botonAceptar.onPress) {
          botonAceptar.onPress();
        }
      } else {
        
        const botonCancelar = botones.find(b => b.style === 'cancel');
        if (botonCancelar && botonCancelar.onPress) {
          botonCancelar.onPress();
        }
      }
    } else {
      
      Alert.alert(titulo, mensaje, botones);
    }
  };

  const createTwoButtonAlert = () =>
    mostrarAlerta('Alerta de 2 botones', 'Elige una opción', [
      {
        text: 'Cancelar',
        onPress: () => setMessage('Presionaste cancelar'),
        style: 'cancel',
      },
      {
        text: 'Aceptar',
        onPress: () => setMessage('Presionaste aceptar'),
      },
    ]);

  const createThreeButtonAlert = () =>
    mostrarAlerta('Alerta de 3 botones', 'Elige una opción', [
      {
        text: 'Pregúntame más tarde',
        onPress: () => setMessage('Pregúntame más tarde'),
      },
      {
        text: 'Cancelar',
        onPress: () => setMessage('Presionaste cancelar'),
        style: 'cancel',
      },
      {
        text: 'Aceptar',
        onPress: () => setMessage('Presionaste aceptar'),
      },
    ]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Estado actual: {message}</Text>

        <View style={styles.button}>
          <Button title="Alerta de dos botones" onPress={createTwoButtonAlert} />
        </View>
        <View style={styles.button}>
          <Button title="Alerta de 3 botones" onPress={createThreeButtonAlert} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    marginVertical: 10,
    width: '80%', 
  },
});

export default ComponenteAlert;