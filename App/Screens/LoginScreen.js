import React from 'react'
import {View, Text, Button} from 'react-native'
import { GoogleSignin } from '@react-native-community/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: '954837257818-2nlon6a9javmmf6m9o4nnbufooufhdf0.apps.googleusercontent.com',
  offlineAccess: true
});


const LoginScreen = () => {
  async function onGoogleButtonPress() {
    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
    
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
      
    } catch (e) {
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
