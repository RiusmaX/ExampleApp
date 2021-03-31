/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import type {Node} from 'react'
import {
  StatusBar,
  useColorScheme,
  View,
} from 'react-native'

import MapScreen from './Screens/MapScreen'

import {Colors} from 'react-native/Libraries/NewAppScreen'

const LATITUDE_DELTA = 0.035
const LONGITUDE_DELTA = 0.035

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  return (
    <View>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MapScreen />
    </View>
  )
}

export default App
