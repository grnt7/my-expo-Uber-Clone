import { StyleSheet, Text, View } from 'react-native'

//import MapView, { Marker } from 'react-native-maps';
//import { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps


import React, {useEffect, useRef} from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { selectDestination,selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import { Maps_APIKEY} from '@env';

import MapViewDirections from 'react-native-maps-directions';

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;

    
    //Zoom & fit to markers its not zooming out!
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;

    const getTravelTime = async () => {
        fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${Maps_APIKEY}`
        )
            .then((res) => res.json())
            .then((data) => {
                dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
            });
    };
    getTravelTime();
}, [origin, destination, Maps_APIKEY]);
  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      //mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude:origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >

      {origin && destination && (
        <MapViewDirections
        origin={origin.description}
        destination={destination.description}
        apikey={Maps_APIKEY}
        strokeWidth={3}
        strokeColor="black"

        
        />
      )}
     
      {origin?.location && (
      <Marker
        coordinate={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
        }}
        title="Origin"
        description={origin.description}
        identifier="origin"
      />
     )}

      {destination?.location && (
      <Marker
        coordinate={{
          latitude: destination.location.lat,
          longitude: destination.location.lng,
        }}
      title="Destination"
        description={origin.description}
        identifier="origin"
        />
      )}
      
   </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});




/*
 ref={mapRef}
    style={tw`flex-1`}
    //mapType="mutedStandard"
    initialRegion={{
      latitude: origin.location.lat,
      longitude:origin.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    }}

*/