import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Dimensions, SafeAreaView, Keyboard } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import logo from "./src/assets/images/Logo.png"
import api from './src/services/api';

export default function App() {


  const [cep, setCep] = useState('');
  const [data, setData] = useState([]);
  const [hasdata, setHasdata] = useState(false);



  const getCep = async () => {

    const result = await api.get(`${cep}/json/`);
    if (result.data != null) {
      setHasdata(true)
      setData(result.data);
      Keyboard.dismiss();
    }

  }

  const limpar = () => {
    setCep('');
    setData('');
    setHasdata(false)
  }

  useEffect(() => {
    console.log(data);
  }, [data])



  return (
    <SafeAreaView style={styles.container}>

      <View >
        <Image source={logo} style={styles.imageLogo} />

        <Text style={styles.title}>Digite o seu Cep</Text>

        <TextInput keyboardType="numeric" value={cep} placeholder="CEP" style={styles.input} onChangeText={(e) => setCep(e)} />

        <View style={styles.areaBtns}>

          <TouchableOpacity onPress={getCep} style={styles.btnOne}>
            <Text style={styles.textbtnOne}>Buscar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={limpar} style={styles.btnTwo}>
            <Text style={styles.textbtnTwo}>Limpar</Text>
          </TouchableOpacity>

        </View>


        {hasdata ? <View style={styles.resultado} >
          <Text style={styles.textStyle}>Cep : {data.cep}</Text>
          <Text style={styles.textStyle}>Logradouro: {data.logradouro}</Text>
          <Text style={styles.textStyle}>Localidade: {data.localidade}</Text>
          <Text style={styles.textStyle}>Bairro: {data.bairro}</Text>
          <Text style={styles.textStyle}>UF: {data.uf}</Text>
        </View> : null}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  resultado: {
    margin: 20,
    backgroundColor: "#1010"
  },
  imageLogo: {
    margin: 15,
    height: Dimensions.get('window').width / 3,
    width: Dimensions.get('window').width / 3,
    alignSelf: "center"
  },
  textStyle: {
    textAlign: "justify",
    fontSize: 20,
    fontWeight: "bold"
  },
  container: {
    flex: 1,
    backgroundColor: '#ddd',
    justifyContent: "center",
    alignItems: "center"
  },
  textbtnTwo: {
    fontSize: 14, color: "#fff",
    fontWeight: "bold"
  },

  textbtnOne: {
    fontSize: 14, color: "#fff",
    fontWeight: "bold"
  },
  btnOne: {

    borderRadius: 20,
    width: 150,
    backgroundColor: "#117EEB",
    height: 60,
    justifyContent: "center",
    alignItems: "center",

  },
  btnTwo: {
    marginLeft: 30,
    borderRadius: 20,
    width: 150,
    backgroundColor: "#FB506E",
    height: 60,
    justifyContent: "center",
    alignItems: "center"
  },
  areaBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15
  },
  input: {
    alignSelf: "center",
    borderWidth: 1,
    height: 40,
    width: "60%",
    textAlign: "center",
    borderRadius: 10,
    marginBottom: 20
  },

  title: {
    margin: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18
  }
});
