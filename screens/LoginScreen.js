import { StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import { Input, Image, ThemeProvider } from '@rneui/themed'
import { Button } from '@rneui/base'
import { useEffect, useState } from 'react'
import { auth } from '../firebaseConfig'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        navigation.replace('Home');
      }
    })

    return unsubscribe;
  }, []);


  const signIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch(err => alert(err));
  }

  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <Image 
        source={{uri: 'https://static.thenounproject.com/png/178831-200.png'}} 
        style={styles.image}
      />
      <View style={styles.inputContainer}>
        <Input autoFocus
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
          onSubmitEditing={signIn}
        />
      </View>
      <Button raised containerStyle={styles.button} onPress={signIn} title="Sign In" />
      <Button containerStyle={styles.button} type="link" onPress={() => navigation.navigate('Register')} title="Register" />
      <View style={{ height: 150}} />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

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