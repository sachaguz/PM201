/* Zona 1: Importaciones de archivos y componentes*/
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Perfil } from '../components/Perfil';

/* Zona 2: Main - Componentes  */

export default function App() {
  return (
    <View style={styles.container}>
      
      {/* <Image source={require('./assets/wave.png')} />
      <Text>Hola mundo React Native</Text>
      <Text>-----------------------------------------------------------------------------------</Text>
      <Saludo/>

      <Text>-----------------------------------------------------------------------------------</Text>
      <Saludo2/>

       */}
      
      <Perfil style={styles.tarjetaVerde} nombre="Saul" carrera="Ing Sistemas" materia="Programacion movil" cuatrimestre="9"/>
      <Perfil style={styles.tarjetaRoja} nombre="Pao" carrera="Ing Sistemas" materia="Movil" cuatrimestre="10"/>
      <Perfil style={styles.tarjetaVerde} nombre="Saul2" carrera="Ing Sistemas" materia="Programacion movil" cuatrimestre="9"/>

      <StatusBar style="auto" />
      

    </View>
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
  }, 
  tarjetaVerde:{backgroundColor: '#00ff0042'},
  tarjetaRoja:{backgroundColor: '#ff000038'},
});
