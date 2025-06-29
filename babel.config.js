// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', // Keep this if you use Reanimated
      // Ensure no 'nativewind' or other conflicting plugins are here
    
     [
            "module:react-native-dotenv",
            {
                moduleName: "@env",
                path: "./.env"
            }
        ]
    ],
  };
};