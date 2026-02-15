import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from '@teovilla/react-native-web-maps';
import tw from 'twrnc';

const Map = ({ origin, destination }) => {
  // Ensure this matches your Vercel Environment Variable name exactly
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    // Explicit height is the #1 reason maps don't show on web
    <div style={{ width: '100%', height: '500px', position: 'relative' }}> 
      <MapView
        style={{ flex: 1, height: '100%' }}
        provider={PROVIDER_GOOGLE}
        googleMapsApiKey={apiKey} 
        initialRegion={{
          latitude: origin?.location.lat || 51.5074, // Default to London if empty
          longitude: origin?.location.lng || -0.1278,
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
          />
        )}

        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
            }}
            title="Destination"
          />
        )}
      </MapView>
    </div>
  );
};

export default Map;