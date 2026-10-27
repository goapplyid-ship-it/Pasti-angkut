import { View, Text } from 'react-native';
export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: '#0E9F6E', justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>TES PASTI ANGKUT</Text>
      <Text style={{ color: 'white', marginTop: 10 }}>Kalau ini kebuka, berarti build berhasil!</Text>
    </View>
  );
}
