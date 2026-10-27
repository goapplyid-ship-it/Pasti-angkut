{
  "name": "pasti-angkut-apk",
  "version": "2.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "build:apk": "eas build -p android --profile apk"
  },
  "dependencies": {
    "expo": "~51.0.0",
    "expo-router": "~3.5.10",
    "react": "18.2.0",
    "react-native": "0.74.5",
    "expo-camera": "~15.0.1",
    "expo-location": "~17.5.0",
    "expo-image-picker": "~15.0.7",
    "@supabase/supabase-js": "^2.45.4",
    "@react-native-async-storage/async-storage": "1.23.1",
    "react-native-maps": "1.14.0"
  },
  "expo": {
    "name": "Pasti Angkut",
    "slug": "pasti-angkut",
    "primaryColor": "#0E9F6E",
    "android": { "package": "com.pastiangkut.app" }
  }
}
