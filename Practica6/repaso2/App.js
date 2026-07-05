import React, { useState, useEffect } from 'react';

import {View,Text,Image,Alert,FlatList,Platform,Pressable,TextInput,StyleSheet,ImageBackground,ActivityIndicator,KeyboardAvoidingView} from 'react-native';

import {SafeAreaView,SafeAreaProvider} from 'react-native-safe-area-context';


export default function App() {

  const [mostrarSplash, setMostrarSplash] = useState(true);

  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [genero, setGenero] = useState('');

  const [libros, setLibros] = useState([]);
  const [guardando, setGuardando] = useState(false);


  useEffect(() => {

    const tiempoSplash = setTimeout(() => {
      setMostrarSplash(false);
    }, 2000);
    return () => clearTimeout(tiempoSplash);

  }, []);


  const agregarLibro = () => {

    const tituloVacio = titulo.trim() === '';
    const autorVacio = autor.trim() === '';
    const generoVacio = genero.trim() === '';

    if (tituloVacio || autorVacio || generoVacio) {

      Alert.alert(
        'Datos incompletos',
        'Llena todos los campos'
      );

      return;
    }

    setGuardando(true);

    setTimeout(() => {

      const libro = {
        id: Date.now().toString(),
        titulo,
        autor,
        genero,
      };


      setLibros([...libros, libro]);

      setTitulo('');
      setAutor('');
      setGenero('');

      setGuardando(false);


      Alert.alert(
        'Se he guardado el libro',
        'Guardado'
      );

    }, 4000);

  };


  if (mostrarSplash) {

    return (

      <SafeAreaProvider>

        <SafeAreaView style={estilos.pantallaInicio}>

          <Image
            source={require('./assets/icono.webp')}
            style={estilos.logoLibros}
          />

          <Text style={estilos.nombreAplicacion}>
            Librería de Saul
          </Text>

        </SafeAreaView>

      </SafeAreaProvider>

    );

  }


  return (

    <SafeAreaProvider>

      <ImageBackground
        source={require('./assets/paisaje.webp')}
        style={estilos.imagenFondo}
      >

        <SafeAreaView style={estilos.areaPrincipal}>

          <KeyboardAvoidingView
            style={estilos.areaPrincipal}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >

            <Text style={estilos.encabezado}>
              Registro de libros
            </Text>


            <TextInput
              style={estilos.campoTexto}
              placeholder="Título del libro"
              value={titulo}
              onChangeText={setTitulo}
            />


            <TextInput
              style={estilos.campoTexto}
              placeholder="Autor"
              value={autor}
              onChangeText={setAutor}
            />


            <TextInput
              style={estilos.campoTexto}
              placeholder="Género"
              value={genero}
              onChangeText={setGenero}
            />


            <Pressable
              style={estilos.botonAgregar}
              onPress={agregarLibro}
              disabled={guardando}
            >

              {guardando ? (

                <View style={estilos.contenedorCarga}>

                  <ActivityIndicator />

                  <Text style={estilos.textoBoton}>
                    Subiendo...
                  </Text>

                </View>

              ) : (

                <Text style={estilos.textoBoton}>
                  Agregar libro
                </Text>

              )}

            </Pressable>


            <Text style={estilos.contadorLibros}>
              Total de libros: {libros.length}
            </Text>


            <FlatList
              data={libros}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (

                <View style={estilos.contenedorLibro}>

                  <Text style={estilos.nombreLibro}>
                    {item.titulo}
                  </Text>

                  <Text style={estilos.informacionLibro}>
                    Autor: {item.autor}
                  </Text>

                  <Text style={estilos.informacionLibro}>
                    Género: {item.genero}
                  </Text>

                </View>

              )}
            />

          </KeyboardAvoidingView>

        </SafeAreaView>

      </ImageBackground>

    </SafeAreaProvider>

  );

}


const estilos = StyleSheet.create({

  imagenFondo: {
    flex: 1,
  },


  areaPrincipal: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },


  pantallaInicio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f6fa',
  },


  logoLibros: {
    width: 125,
    height: 125,
    resizeMode: 'contain',
  },


  nombreAplicacion: {
    fontSize: 27,
    fontWeight: '700',
    marginTop: 18,
    color: '#253858',
  },


  encabezado: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 22,
    color: '#ffffff',
  },


  campoTexto: {
    backgroundColor: '#ffffff',
    paddingVertical: 13,
    paddingHorizontal: 14,
    marginBottom: 12,
    borderRadius: 10,
    fontSize: 15,
  },


  botonAgregar: {
    backgroundColor: '#4059ad',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 3,
  },


  textoBoton: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },


  contenedorCarga: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },


  contadorLibros: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 18,
    marginBottom: 14,
  },


  contenedorLibro: {
    backgroundColor: '#fdfdfd',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
  },


  nombreLibro: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 7,
    color: '#253858',
  },


  informacionLibro: {
    fontSize: 14,
    color: '#444444',
    marginBottom: 2,
  },

});
