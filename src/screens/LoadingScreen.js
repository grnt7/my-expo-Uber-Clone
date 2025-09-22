import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import tw from 'twrnc';
import LottieView from 'lottie-react-native';

const LoadingScreen = ({ navigation }) => {
  const [isAnimationFinished, setAnimationFinished] = useState(false);

  // Function to handle the animation completion
  const onAnimationFinish = () => {
    setAnimationFinished(true);
    // Navigate to the HomeScreen, replacing the splash screen in the stack
    navigation.replace('HomeScreen');
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-black`}>
      <LottieView
        source={require('../../assets/lottie/UberFlow1.json')}
        style={styles.animation}
        autoPlay
        loop={false}
        onAnimationFinish={onAnimationFinish}
      />
    </View>
  );
};

// Use a StyleSheet to define the animation size for better performance.
const styles = StyleSheet.create({
  animation: {
    width:'100%',
    height:'100%',
  },
});

export default LoadingScreen;

