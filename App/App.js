/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react'
import type {Node} from 'react'
import {Alert, StatusBar, useColorScheme, View, Button} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Colors} from 'react-native/Libraries/NewAppScreen'
import OneSignal from 'react-native-onesignal'
import AsyncStorage from '@react-native-async-storage/async-storage'

import MapScreen from './Screens/MapScreen'
import NotifScreen from './Screens/NotifScreen'
import LoginScreen from './Screens/LoginScreen'

const Tab = createBottomTabNavigator()

const App: () => Node = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  useEffect(() => {
    /* O N E S I G N A L   S E T U P */
    OneSignal.setAppId('ad6dfa05-5087-4d16-a35e-0ef295368097')
    OneSignal.setLogLevel(6, 0)
    OneSignal.setRequiresUserPrivacyConsent(false)
    OneSignal.promptForPushNotificationsWithUserResponse(response => {
      console.log('Prompt response:', response)
    })

    /* O N E S I G N A L  H A N D L E R S */
    OneSignal.setNotificationWillShowInForegroundHandler(notifReceivedEvent => {
      console.log(
        'OneSignal: notification will show in foreground:',
        notifReceivedEvent,
      )
      let notif = notifReceivedEvent.getNotification()

      const button1 = {
        text: 'Cancel',
        onPress: () => {
          notifReceivedEvent.complete()
        },
        style: 'cancel',
      }

      const button2 = {
        text: 'Complete',
        onPress: () => {
          notifReceivedEvent.complete(notif)
        },
      }

      Alert.alert('Complete notification?', 'Test', [button1, button2], {
        cancelable: true,
      })
    })
    OneSignal.setNotificationOpenedHandler(notification => {
      console.log('OneSignal: notification opened:', notification)
    })
    OneSignal.setInAppMessageClickHandler(event => {
      console.log('OneSignal IAM clicked:', event)
    })
    OneSignal.addEmailSubscriptionObserver(event => {
      console.log('OneSignal: email subscription changed: ', event)
    })
    OneSignal.addSubscriptionObserver(event => {
      console.log('OneSignal: subscription changed:', event)
    })
    OneSignal.addPermissionObserver(event => {
      console.log('OneSignal: permission changed:', event)
    })

    // const checkToken = async () => {
    //   const token = await AsyncStorage.getItem('token')
    //   if (token) {
    //     setIsLoggedIn(true)
    //   } else {
    //     setIsLoggedIn(false)
    //   }
    // }

    // checkToken()
  }, [])

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {isLoggedIn ? (
        <Tab.Navigator initialRouteName='Notifs'>
          <Tab.Screen name='Map' component={MapScreen} />
          <Tab.Screen name='Notifs' component={NotifScreen} />
        </Tab.Navigator>
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  )
}

export default App
