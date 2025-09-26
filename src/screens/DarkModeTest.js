import { View, Text, Image, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { useColorScheme } from "nativewind";

// test logos
const LogoLight = require("../images/Uber_Logo_Black.png");
const LogoDark = require("../images/Uber-White-Logo.png");

const ThemeToggle = () => {
  const { colorScheme, setColorScheme } = useColorScheme();

  const toggleTheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark");
  };

  return (
    <Pressable
      onPress={toggleTheme}
      style={tw`absolute top-0 right-0 m-5 p-2 rounded-full bg-gray-200 dark:bg-gray-800`}
    >
      <Text style={tw`text-black dark:text-white font-bold text-sm`}>
        {colorScheme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </Text>
    </Pressable>
  );
};

export default function DarkModeTest() {
  const { colorScheme } = useColorScheme();
  const currentLogo = colorScheme === "dark" ? LogoDark : LogoLight;

  return (
    <SafeAreaView style={tw`flex-1 bg-white dark:bg-gray-900`}>
      <View style={tw`flex-1 items-center justify-center bg-white dark:bg-gray-900`}>
        <ThemeToggle />

        <Image
          style={tw`w-50 h-24 resize-contain mb-10`}
          source={currentLogo}
        />

        <Text style={tw`text-lg font-bold text-black dark:text-white`}>
          Current theme: {colorScheme}
        </Text>
      </View>
    </SafeAreaView>
  );
}
