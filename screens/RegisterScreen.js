import { useLayoutEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Input, Image, Text } from '@rneui/themed';
import { Button } from '@rneui/base';
import { StatusBar } from 'expo-status-bar';
import { auth } from '../firebaseConfig';

const RegisterScreen = ({ navigation }) => {
  const [name, setName]= useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL: null
        })
      }).catch((error) => {
        alert(error.message)
      })
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login'
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style="light" />
      <Image 
        source={{uri: 'https://cdn.iconscout.com/icon/free/png-256/user-circle-plus-3605378-3005458.png'}} 
        style={styles.image}
      />
      <Text h6 style={{ marginBottom: 50 }}>
        Create New Account
      </Text>
      <View style={styles.inputContainer}>
        <Input autoFocus
          placeholder='Full Name'
          type="text"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder='Email'
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input secureTextEntry
          placeholder='Password' 
          type="password"  
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      <Button raised containerStyle={styles.button} onPress={register} title="Register" />
      <Button containerStyle={styles.button} type="link" onPress={() => navigation.navigate('Login')} title="I have an account" />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  image: {
    width: 120, 
    height: 120
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white'
  },
  button: {
    width: 200,
    marginTop: 10,
    borderRadius: 10
  },
  inputContainer: {
    width: 300
  }
})