import React from 'react'
import {View, Text, Button} from 'react-native'
import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
  webClientId: '954837257818-la44iqtid0p6pg19tbaiq7dhj8kutsjc.apps.googleusercontent.com',
});


const LoginScreen = () => {
  async function onGoogleButtonPress() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
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
