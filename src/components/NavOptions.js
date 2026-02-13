import {  FlatList, Text, View, TouchableOpacity, Image} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import tw from 'twrnc';
import { Icon } from "@rneui/themed"; // Use the updated RNEUI package
import UberCarImage from '../images/UberXcar.webp';
import UberFoodImage from '../images/order-food.png';
import { useNavigation } from '@react-navigation/native';//installed
import { useSelector } from'react-redux';
import { selectOrigin } from '../slices/navSlice';


const data = [
    {
        id:"123",
        title:"Get a Ride",
        image: UberCarImage,
        screen: "MapScreen",
    
    },
    
    {
        id: "456",
        title: "Order Food",
        image: UberFoodImage,
        screen:  "EatScreen",//change in future...
    },
    ];
    
    const NavOptions = () => {
        const navigation = useNavigation();
    const origin = useSelector(selectOrigin); // You're importing selectOrigin but not using it here currently.

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false} // Hide scroll indicator
            // Apply centering styles to the content container of the FlatList
            // `mx-auto` centers the content within the FlatList's available width
            // This will make the two items (Get a Ride, Order Food) center on larger screens.
            contentContainerStyle={tw`flex-row justify-center items-center flex-grow p-2`}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() => navigation.navigate(item.screen)}
                    // Conditional styling to disable if origin is null
                    // Removed max-w-lg as it's redundant with w-40 for individual items
                     //  FIX 1: Apply dark mode background styles to the item 
                   style={tw`
        p-2 pl-6 pb-8 pt-4 m-2 w-40 rounded-lg 
        bg-gray-200 dark:bg-gray-800  
        ${!origin && 'opacity-20'}
    `}// Add background color for light and dark modes
                >
                    <View>
                        <Image
                            style={{ width: 120, height: 120, resizeMode: "contain" }}
                            source={ item.image }
                        />
                        <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
                        <AntDesign name= "arrow-right"
                            style={tw`p-2 bg-black rounded-full h-10 w-10 mt-4`}
                            type="antdesign"
                            color="white"
                            size={20}   
                        />
                    </View>
                </TouchableOpacity>
            )}
        />
        );
    };
    
    export default NavOptions;


  // Note: The above code uses Tailwind CSS for styling, React Navigation for navigation, and Redux for state management.
