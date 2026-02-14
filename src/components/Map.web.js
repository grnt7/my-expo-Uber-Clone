import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from '@teovilla/react-native-web-maps';
import tw from 'twrnc';

const Map = ({ origin, destination }) => {
  // Use the key that matches your Vercel Environment Variables exactly
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}> 
      <MapView
        // Add a hardcoded height or a very specific tailwind class
        style={[tw`flex-1`, { height: '100%', width: '100%' }]}
        provider={PROVIDER_GOOGLE}
        googleMapsApiKey={apiKey} 
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
    </div>
  );
};

export default Map;