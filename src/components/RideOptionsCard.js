import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import React, { useState } from 'react';
import { Icon } from "@rneui/themed";
import tw from 'twrnc';
import UberX from '../images/UberXcar.webp';
import UberXL from '../images/UberXLnoBg.webp';
import UberLux from '../images/UberLuxNobg.webp';

import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectTravelTimeInformation } from '../slices/navSlice';

const data = [
    { id: "Uber-X-123", title: "Uber X", multiplier: 1.0, image:UberX },
    { id: "Uber-XL-456", title: "Uber XL", multiplier: 1.2, image: UberXL },
    { id: "Uber-LUX-123", title: "Uber LUX", multiplier: 1.75, image: UberLux },
];

// Define a BASE_FARE (e.g., £2.50)
const BASE_FARE = 2.5; // Base fare in GBP
const COST_PER_MINUTE = 0.20; // Example: £0.20 per minute
const COST_PER_MILE = 1.20; // Example: £1.20 per mile (or per km, adjust unit based on Google API)

// Surge rates are applied on top of the base cost.
// Ensure these match the 'title' keys without spaces
const SURGE_RATE = {
    UberX: 1.0, // No surge for UberX usually, or a minimal one
    UberXL: 1.2,
    UberLUX: 1.5,
};

const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null);
    const travelTimeInformation = useSelector(selectTravelTimeInformation);

    // Calculate approximate price based on duration and distance
    // Google's travelTimeInformation.duration.value is in seconds
    // Google's travelTimeInformation.distance.value is in meters
    const calculatePrice = (multiplier, title) => {
        if (!travelTimeInformation || !travelTimeInformation.duration || !travelTimeInformation.distance) {
            return "Calculating...";
        }

        const durationInMinutes = travelTimeInformation.duration.value / 60; // Convert seconds to minutes
        const distanceInMiles = travelTimeInformation.distance.value / 1609.34; // Convert meters to miles (or divide by 1000 for km)

        const surge = SURGE_RATE[title.replace(" ", "")] || 1.0; // Get surge rate, default to 1 if not found

        const price = (BASE_FARE + (durationInMinutes * COST_PER_MINUTE) + (distanceInMiles * COST_PER_MILE))
                      * multiplier * surge;

        return new Intl.NumberFormat("en-gb", {
            style: "currency",
            currency: "GBP",
        }).format(price);
    };

    return (
        
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                {/* Changed navigation action from navigate("HomeScreen") to popToTop() */}
                    <TouchableOpacity
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomeScreen' }],
                    })}
                    style={tw`absolute top-3 left-5 p-3 rounded-full`}
                >
                    
                    <Icon name="chevron-left" type="font-awesome" />
                </TouchableOpacity>
                <Text style={tw`text-center py-5 text-xl`}>Select A Ride {travelTimeInformation?.distance?.text || "Calculating..."}
                </Text>
            </View>

            {/* Horizontal FlatList for Ride Options */}
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                horizontal // Make the FlatList scroll horizontally
                showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
                contentContainerStyle={tw`px-2 py-2 `} // Add some padding around the content
                renderItem={({ item: { id, title, multiplier, image }, item }) => (
                    <TouchableOpacity
                        onPress={() => setSelected(item)}
                        style={tw`flex-col items-center p-2 m-2 rounded-lg ${id === selected?.id ? "bg-gray-200" : "bg-gray-50"} w-40 h-48 justify-center shadow-md`} // Added width, height, and alignment for horizontal layout
                    >
                        <Image style={tw`w-36 h-24 resizeMode="contain"`} source={ item.image } />
                        <View style={tw`items-center mt-2 `}>
                            <Text style={tw`text-lg font-semibold`}>{title}</Text>
                            <Text style={tw`text-sm text-gray-600`}>
                                {travelTimeInformation?.duration?.text || "Calculating..."}
                            </Text>
                        </View>
                        <Text style={tw`text-xl font-bold mt-2 mb-4`}>
                            {calculatePrice(multiplier, title)}
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <View style={tw`mt-auto border-t border-gray-100`}>
                <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 rounded-xl ${!selected && "bg-gray-400"}`}>
                    <Text style={tw`text-center text-white text-xl`}>Choose{selected?.title || "Ride"}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default RideOptionsCard;

const styles = StyleSheet.create({});