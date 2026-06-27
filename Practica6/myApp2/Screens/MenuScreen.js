/* Zona 1: Importaciones de archivos y componentes*/

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import React,{useState} from 'react';
import TarjetasScreen from './TarjetasScreen';
import Componente1 from './Componente1';
import PracticaGena from './PracticaGena';
import PressableScreen from './PressableScreen';
import SwitchScreen from './SwitchScreen';
import { TextInputScreen } from './TextInputScreen';
import ComponenteAlert from './ComponenteAlerta';



/* Zona 2: Main - Componentes  */

export default function App() {
    const [screen,setScreen]= useState('menu');
    switch(screen){
        case 'tarjetas':
            return <TarjetasScreen/>;
        case 'componente1':
            return <Componente1/>;
        case 'PracticaGena':
            return <PracticaGena/>;
        case 'SwitchScreen':
            return <SwitchScreen/>
        case 'PressableScreen':
            return <PressableScreen/>
        case 'TextInputScreen':
            return <TextInputScreen/>
        case 'ComponenteAlert':
            return <ComponenteAlert/>
        case 'menu':
            default:
                return (
                    <View>
                        <Text>Aqui va la primer practica de componentes nativos</Text>
                        <Button title="Practica tarjetas" onPress={()=>setScreen('tarjetas')}/>
                        <Button title="Practica Equipo Genaro" onPress={()=>setScreen('PracticaGena')}/>
                        <Button title="Practica Componente1" onPress={()=>setScreen('componente1')}/>
                        <Button title="Pressable" onPress={()=>setScreen('PressableScreen')}/>
                        <Button title="Switch" onPress={()=>setScreen('SwitchScreen')}/>
                        <Button title="Practica TextInput" onPress={()=>setScreen('TextInputScreen')}/>
                        <Button title="Alerta" onPress={()=>setScreen('ComponenteAlert')}/>
                    </View>
                );
    }
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
