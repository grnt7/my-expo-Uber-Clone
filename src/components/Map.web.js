import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from '@teovilla/react-native-web-maps';
import tw from 'twrnc';

const Map = ({ origin, destination }) => {
  return (
    <MapView
      style={tw`flex-1`}
      provider={PROVIDER_GOOGLE}
      // This is the key Vercel will use
      googleMapsApiKey={process.env.EXPO_PUBLIC_MAPS_APIKEY} 
      initialRegion={{
        latitude: origin?.location.lat || 37.78825,
        longitude: origin?.location.lng || -122.4324,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          identifier="origin"
        />
      )}
    </MapView>
  );
};

export default Map;