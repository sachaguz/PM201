import {View, Text, Image, Button} from 'react-native';

export const Saludo2= () => {
    return(
        <View>
            <Text>Hola RN: Componente Propio 2</Text>
            <Image source={require('../assets/wave.png')}/>
            <Button title='Hola S201'></Button>
        </View>
    )
}