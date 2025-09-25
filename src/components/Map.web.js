// src/components/Map.web.js
import React from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';

const Map = () => {
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-lg text-gray-500`}>
        Map functionality is not available on the web.
      </Text>
    </View>
  );
};

export default Map;