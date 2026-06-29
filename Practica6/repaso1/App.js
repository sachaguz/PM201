/* Zona 1: Importaciones de archivos y componentes*/

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import Registro from './Screens/Registro';


/* Zona 2: Main - Componentes  */

export default function App() {
  return (
    <Registro></Registro>
  );
}


/* Zona 3: Estilos y posicionamiento de los componentes*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  }
});
