import React from 'react'
import {View, Text, Button} from 'react-native'
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth'; // 1

GoogleSignin.configure({
  webClientId: '954837257818-2nlon6a9javmmf6m9o4nnbufooufhdf0.apps.googleusercontent.com', // 2
  offlineAccess: true // 3
});


const LoginScreen = () => {
  async function onGoogleButtonPress() {
    try { // 4
      // Get the users ID token
      // On connecte l'utilisateur avec Google
      const { idToken } = await GoogleSignin.signIn();

      console.log(idToken)
      
      // On envoit l'information (le token Google) à notre backend, ici Firebase
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
      
    } catch (e) { // 4
      console.error(e)
    }
  }

  return (
    <>
      <View>
        <Text>LOGIN SCREEN</Text>
        <Button
          title="Google Sign-In"
          onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        />
      </View>
    </>
  )
}

export default LoginScreen
