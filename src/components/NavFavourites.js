import { StyleSheet, Text, View, FlatList, TouchableOpacity  } from 'react-native';


import { Icon } from '@rneui/themed';
import tw from 'twrnc';


const data = [

    {
      id: "123",
      icon:"home",
      location: "Home",
      destination: "Code Street, London, Uk",



    },

    {
      id: "456",
      icon:"briefcase",
      location: "Work",
      destination: "Tate Modern, London, UK",
    },
  ];


const NavFavourites = () => {
  
  return (
   <FlatList data={data} keyExtractor={(item) => item.id} 
  // 💡 FIX 1: Add a dark background to the FlatList container itself 
            // (or ensure its parent in HomeScreen is fully themed)
            style={tw`  dark:bg-black`} 
            
            ItemSeparatorComponent={() => (
                <View 
                    // 💡 FIX 2: Apply dark mode style to the item separator line
                    style={[tw`bg-gray-200 dark:bg-gray-700`, {height: 0.5}]}
                />
            )}
   renderItem={({item: { location, destination, icon} }) => (
        <TouchableOpacity style={tw`flex-row items-center p-5`}>
          <Icon
          style={tw`mr-4 rounded-full bg-gray-300 p-3`}
          name={icon}
          type="ionicon"
          color="black"
          size={20}
          />
          <View>
            <Text style={tw`font-semibold text-lg text-gray-500`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>

        </TouchableOpacity>
   )}/>
  );
};

export default NavFavourites;

const styles = StyleSheet.create({})