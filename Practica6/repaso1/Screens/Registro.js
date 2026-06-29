import React, { act, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Switch, Pressable, Alert, Platform} from 'react-native';

  if (Platform.OS === "web") {
  Alert.alert = (titular, mensaje, botones) => {
    if (botones && botones.length > 0) {
      const resultado = window.confirm(
        titular + (mensaje ? "\n" + mensaje : "")
      );

      if (resultado) {
        const aceptar = botones.find(b => b.text === "Aceptar");
        if (aceptar && aceptar.onPress) {
          aceptar.onPress();
        }
      } else {
        const cancelar = botones.find(b => b.style === "cancel");
        if (cancelar && cancelar.onPress) {
          cancelar.onPress();
        }
      }
    } else {
      window.alert(titular + (mensaje ? "\n" + mensaje : ""));
    }
  };
}

export default function App() {
  const [nombre, setNombre] = useState('');
  const [carrera, setCarrera] = useState('');
  const [numero, setNumero] = useState('');
  const [asistencia, setAsistencia] = useState(false);
  const [constancia, setConstancia] = useState(false);
  const [actDeportivas, setActDeportivas] = useState(false);
  const [message, setMessage] = useState('');



  const registroExitoso = () =>
    Alert.alert('Registro enviado', 
      `Nombre: ${nombre}
Carrera: ${carrera}
Semestre: ${numero}
Asitencia: ${asistencia ? 'Si' : 'No'}
Constancia: ${constancia ? 'Si' : 'No'}
Deportes: ${actDeportivas ? 'Si' : 'No'}`, [
      {
        text: 'Aceptar',
        onPress: () => {
          setMessage('Presionaste aceptar');
        },
      }
    ]);

    const noNumero = () =>
    Alert.alert('Error', 
      'El semestre debe ser un numero', [
      {
        text: 'Aceptar',
        onPress: () => {
          setMessage('Presionaste aceptar');
        },
      }
    ]);

    const camposVacios = () =>
    Alert.alert('Error', 
      'Todos los campos deben estar llenos', [
      {
        text: 'Aceptar',
        onPress: () => {
          setMessage('Presionaste aceptar');
        },
      }
    ]);
  
  return (
    <View style={styles.container}>

      <Text style={styles.title}>Registro de Evento Universitario</Text>
      <TextInput
        placeholder="Escribe tu nombre..."
        value={nombre}
        onChangeText={setNombre}
        maxLength={100}
        autoCapitalize="words"
        style={styles.input}
      />
      <TextInput
        placeholder="Escribe tu carrera..."
        value={carrera}
        onChangeText={setCarrera}
        maxLength={100}
        autoCapitalize="words"
        style={styles.input}
      />
      <TextInput
        placeholder="Escribe tu numero de semestre..."
        value={numero}
        onChangeText={setNumero}
        maxLength={2}
        style={styles.input}
      />
      <Text style={styles.subtitle}>Opciones</Text>

      <View style={styles.questions}>
        <Text>¿Asistira al taller?</Text>
        <Switch
            value = {asistencia}
            onValueChange={setAsistencia}
        />
      </View>

      <View style={styles.questions}>
        <Text>¿Requiere contancia?</Text>
        <Switch
            value = {constancia}
            onValueChange={setConstancia}
        />
      </View>

      <View style={styles.questions}>
        <Text>¿Participara en deportes?</Text>
        <Switch
            value = {actDeportivas}
            onValueChange={setActDeportivas}
        />
      </View>

      <Pressable
          //si numero es un numero valido, se envia el registro
          onPress={() => {
          if (nombre === '' || carrera === '' || numero === '') {
            camposVacios();
          } else if (isNaN(numero)) {
            noNumero();
          } else {
            registroExitoso();
          };
          }}
          style={({ pressed }) => [
              styles.boton,
              {
                  backgroundColor:
                      pressed ? '#05ba1a' : '#6BCB77'
              }
          ]}
      ><Text style={styles.textoBoton}>Enviar registro</Text></Pressable>
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    fontSize: 15,
    width: '80%'
  },
  questions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 40
  },
  boton: {
      padding: 15,
      borderRadius: 10,
      width: '80%',
      alignItems: 'center'
  },

  textoBoton: {
      color: 'white',
      fontWeight: 'bold'
  }
});