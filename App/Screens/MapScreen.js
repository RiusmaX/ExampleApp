/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useEffect, useRef, useState} from 'react'
 import {
   StatusBar,
   Text,
   useColorScheme,
   View,
   Button,
   PermissionsAndroid,
 } from 'react-native'
 
 import MapView, {Marker, Callout} from 'react-native-maps'
 import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete'
 import Geolocation from '@react-native-community/geolocation'
 import MapViewDirections from 'react-native-maps-directions';
 
 import {Colors} from 'react-native/Libraries/NewAppScreen'
 
 import { getMarkers } from '../../services/api'
 
 const LATITUDE_DELTA = 0.035
 const LONGITUDE_DELTA = 0.035
 
 const MapScreen = () => {
   const isDarkMode = useColorScheme() === 'dark'
   const mapRef = useRef()
   const [location, setLocation] = useState(null)
   const [locationGranted, setLocationGranted] = useState(
     PermissionsAndroid.check(
       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
     ),
   )
   const [markers, setMarkers] = useState([])
 
   useEffect(() => {
     const fetchData = async () => {
       const result = await getMarkers()
       setMarkers(result)
     }
 
     fetchData()
     
     const requestLocationPermission = async () => {
       try {
         const granted = await PermissionsAndroid.request(
           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
           {
             title: 'Je veux accéder à votre localisation',
             message:
               "J'ai besoin de l'accès a votre localisation pour bien fonctionner. Merci.",
             buttonNeutral: 'Demander plus tard',
             buttonNegative: "J'ai pas envie",
             buttonPositive: "Fais toi plaiz'",
           },
         )
         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
           console.log('Autorisation OK')
         } else {
           console.log('Autorisation KO')
         }
       } catch (e) {
         console.error(e)
       }
     }
     if (!locationGranted) {
       requestLocationPermission()
     } else {
       handleLocalizeMe()
     }
     // return () => {
     //   cleanup
     // }
   }, [])
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   }
 
   const handlePress = (data, details = null) => {
     // console.log(details)
     // console.log(mapRef.current)
     if (details && details.geometry && details.geometry.location) {
       const region = {
         latitude: details.geometry.location.lat,
         longitude: details.geometry.location.lng,
         latitudeDelta: LATITUDE_DELTA,
         longitudeDelta: LONGITUDE_DELTA,
       }
 
       setLocation({
         latitude: details.geometry.location.lat,
         longitude: details.geometry.location.lng,
       })
 
       setTimeout(() => mapRef.current.animateToRegion(region), 100)
     }
   }
 
   const handleLocalizeMe = () => {
     Geolocation.getCurrentPosition(
       success => {
         console.log(success)
         if (success.coords && success.coords.latitude && success.coords.longitude) {
           const region = {
             latitude: success.coords.latitude,
             longitude: success.coords.longitude,
             latitudeDelta: LATITUDE_DELTA,
             longitudeDelta: LONGITUDE_DELTA,
           }
     
           setLocation({
             latitude: success.coords.latitude,
             longitude: success.coords.longitude,
           })
     
           setTimeout(() => mapRef.current.animateToRegion(region), 100)
         }
       },
       error => {
         console.log(error)
       },
       {
         enableHighAccuracy: true,
         timeout: 10000,
         maximumAge: 1000
       }
     )
   }
 
   return (
     <View>
       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <MapView
         ref={mapRef}
         style={{width: '100%', height: '100%'}}
         initialRegion={{
           latitude: 37.78825,
           longitude: -122.4324,
           latitudeDelta: 0.0922,
           longitudeDelta: 0.0421,
         }}>
         {/* location ? (
           <Marker
             coordinate={{
               latitude: location.latitude,
               longitude: location.longitude,
             }}
           />
         ) : null */}
         {markers ? (
           markers.map(marker => {
             return (
               <Marker
                 key={marker.id} 
                 coordinate={{
                   latitude: Number(marker.latitude),
                   longitude: Number(marker.longitude)
                 }}
               >
                 <Callout>
                   <View style={{backgroundColor: 'white'}}>
                     <Text>{marker.title}</Text>
                     <Text>{marker.description}</Text>
                   </View>
                 </Callout>
               </Marker>
             )
           })
         ) : null}
         {markers && markers.length > 1 ? (
           <MapViewDirections
             language='fr'
             mode='BICYCLING'
             origin={{
               latitude: Number(markers[0].latitude),
               longitude: Number(markers[0].longitude)
             }}
             destination={{
               latitude: Number(markers[markers.length - 1].latitude),
               longitude: Number(markers[markers.length - 1].longitude)
             }}
             waypoints={markers.slice(1, markers.length - 1)}
             strokeWidth={3}
             apikey={'AIzaSyANW4LBQASZn1PIqmzcj16shMlxbt3oUYk'}
           />
         ) : null}
       </MapView>
       <View
         style={{
           flex: 0,
           flexDirection: 'row',
           justifyContent: 'center',
           alignItems: 'center',
           position: 'absolute',
           marginTop: 25,
           marginHorizontal: 15,
           zIndex: 100,
         }}>
         <GooglePlacesAutocomplete
           enablePoweredByContainer={false}
           autoFillOnNotFound
           minLength={2}
           autoFocus={false}
           fetchDetails
           returnKeyType={'default'}
           placeholder='Rechercher une adresse'
           onPress={handlePress}
           query={{
             key: 'AIzaSyANW4LBQASZn1PIqmzcj16shMlxbt3oUYk',
             language: 'fr',
             components: 'country:fr',
           }}
         />
         <Button onPress={handleLocalizeMe} title='📍' />
       </View>
     </View>
   )
 }
 
 export default MapScreen
 