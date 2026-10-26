import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// LOGIN - 4 ROLE kayak di video
function LoginScreen({ navigation }) {
  const [role, setRole] = useState('Pengelola');
  const roles = [
    { id: 'Pengelola', title: 'Pengelola', desc: 'Data warga & laporan' },
    { id: 'Petugas Kebersihan', title: 'Petugas Kebersihan', desc: 'Scan & angkut sampah' },
    { id: 'Petugas Iuran', title: 'Petugas Iuran', desc: 'Catat pembayaran' },
    { id: 'Warga', title: 'Warga', desc: 'Cek tagihan & riwayat' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding:16}}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Angkut Sampah</Text>
        <Text style={styles.heroSub}>Lingkungan bersih, tercatat rapi & transparan</Text>
      </View>
      
      <Text style={{fontWeight:'700', marginBottom:8}}>Masuk sebagai</Text>
      <View style={{flexDirection:'row', flexWrap:'wrap', gap:10}}>
        {roles.map(r => (
          <TouchableOpacity key={r.id} onPress={()=>setRole(r.id)} style={[styles.roleCard, role===r.id && styles.roleActive]}>
            <Text style={styles.roleTitle}>{r.title}</Text>
            <Text style={styles.roleDesc}>{r.desc}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput style={styles.input} placeholder="Email atau No. HP" defaultValue="admin@angkutsampah.id" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry defaultValue="admin123" />
      
      <TouchableOpacity style={styles.btn} onPress={()=>navigation.replace('Main')}>
        <Text style={styles.btnText}>Masuk sebagai {role}</Text>
      </TouchableOpacity>
      <Text style={{textAlign:'center', marginTop:8, color:'#666', fontSize:11}}>* Login default Pengelola</Text>
    </ScrollView>
  );
}

// DASHBOARD PENGELOLA - Rp 20.000, 1/7, dll persis video
function DashboardPengelola() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding:16, paddingBottom:90}}>
      <View style={styles.greenHeader}>
        <Text style={{color:'white', fontWeight:'700'}}>Selamat datang, Pengelola Utama</Text>
        <Text style={{color:'white', fontSize:12}}>Dashboard - 11 Okt 2024</Text>
      </View>

      <View style={{flexDirection:'row', gap:10, marginTop:12}}>
        <View style={styles.stat}><Text style={styles.statNum}>7</Text><Text style={styles.statLabel}>Pelanggan Aktif</Text></View>
        <View style={styles.stat}><Text style={styles.statNum}>1/7</Text><Text style={styles.statLabel}>Pengangkutan Hari Ini</Text></View>
      </View>
      <View style={{flexDirection:'row', gap:10, marginTop:10}}>
        <View style={styles.stat}><Text style={styles.statNum}>Rp 20.000</Text><Text style={styles.statLabel}>Pemasukan Hari Ini</Text></View>
        <View style={styles.stat}><Text style={styles.statNum}>6</Text><Text style={styles.statLabel}>Menunggak</Text></View>
      </View>

      <Text style={styles.section}>Rincian Pembayaran - Blok A</Text>
      <View style={{flexDirection:'row', gap:10}}>
        <View style={styles.payCard}><Text style={{fontWeight:'700'}}>Rp 20.000</Text><Text style={styles.small}>Sudah Bayar</Text></View>
        <View style={styles.payCard}><Text style={{fontWeight:'700'}}>Rp 0</Text><Text style={styles.small}>Belum Bayar</Text></View>
      </View>

      <Text style={styles.section}>Fitur Pengelola</Text>
      <View style={styles.grid}>
        {['Kelola Warga','Jadwal Angkut','Pencatatan','Laporan','Keuangan','Kinerja Petugas','Laporan Warga','Cetak QR'].map(l=>(
          <View key={l} style={styles.gridItem}><Text style={styles.gridLabel}>{l}</Text></View>
        ))}
      </View>

      <Text style={styles.section}>Jadwal Hari Ini - Senin</Text>
      <View style={styles.listItem}><Text>Blok A - 7 Rumah - Siap Angkut</Text></View>
      
      <Text style={styles.section}>Kinerja Petugas Kebersihan</Text>
      <View style={styles.listItem}><Text>Samba - 0/3 selesai</Text></View>
    </ScrollView>
  );
}

function DataPelangganScreen(){
  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding:16}}>
      <Text style={styles.title}>Data Pelanggan</Text>
      <TextInput style={styles.input} placeholder="Cari nama, no rumah, alamat..." />
      <View style={styles.clientCard}><Text style={{fontWeight:'700'}}>Andi Wijaya</Text><Text style={styles.small}>Blok B No12 - Rp 10.000 - Belum Bayar</Text></View>
      <View style={styles.clientCard}><Text style={{fontWeight:'700'}}>Budi Santoso</Text><Text style={styles.small}>Blok A No5 - Rp 20.000 - Belum Bayar</Text></View>
      <View style={styles.clientCard}><Text style={{fontWeight:'700'}}>Dwi</Text><Text style={styles.small}>Blok C No3 - Lunas</Text></View>
    </ScrollView>
  );
}

function RiwayatScreen(){
  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding:16}}>
      <Text style={styles.title}>Riwayat Pengangkutan</Text>
      <View style={{flexDirection:'row', gap:8, marginBottom:10}}>
        <View style={[styles.chip, {backgroundColor:'#16a34a'}]}><Text style={{color:'white'}}>Semua</Text></View>
        <View style={styles.chip}><Text>Hari Ini</Text></View>
      </View>
      <View style={styles.clientCard}><Text>Mayat 11 - 21 Okt 2024 06:45 - Selesai</Text></View>
      <View style={styles.clientCard}><Text>Dwi 12345 - 20 Okt 2024 07:10 - Selesai</Text></View>
      <View style={styles.clientCard}><Text>Sabar 4321 - 20 Okt 2024 07:10 - Selesai</Text></View>
    </ScrollView>
  );
}

function LainnyaScreen(){
  return (
    <ScrollView style={styles.container} contentContainerStyle={{padding:16, paddingBottom:80}}>
      <View style={styles.profile}><Text style={{fontWeight:'700', fontSize:16}}>Pengelola Utama</Text><Text style={styles.small}>pengelola@angkutsampah.id</Text></View>
      {['Laporan Warga','Rekap Tagihan','Jadwal Angkut','Kelola Petugas','Pola Pengangkutan','Pengaturan QR & Barcode','Pengaturan Data & Aplikasi','Tentang Aplikasi'].map(t=>(
        <View key={t} style={styles.menuItem}><Text>{t}</Text><Text>{'>'}</Text></View>
      ))}
      <TouchableOpacity style={[styles.btn, {backgroundColor:'#fee2e2', marginTop:20}]}><Text style={{color:'#dc2626', textAlign:'center', fontWeight:'700'}}>Keluar</Text></TouchableOpacity>
    </ScrollView>
  );
}

function MainTabs(){
  return (
    <Tab.Navigator screenOptions={{headerShown:false, tabBarActiveTintColor:'#16a34a'}}>
      <Tab.Screen name="Beranda" component={DashboardPengelola} />
      <Tab.Screen name="Riwayat" component={RiwayatScreen} />
      <Tab.Screen name="Pelanggan" component={DataPelangganScreen} />
      <Tab.Screen name="Lainnya" component={LainnyaScreen} />
    </Tab.Navigator>
  );
}

export default function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#f8fafc'},
  hero:{height:180, backgroundColor:'#22c55e', borderRadius:16, padding:16, justifyContent:'flex-end', marginBottom:12},
  heroTitle:{color:'white', fontSize:22, fontWeight:'800'},
  heroSub:{color:'white', fontSize:11},
  roleCard:{width:'48%', backgroundColor:'white', borderRadius:12, padding:10, borderWidth:1, borderColor:'#e2e8f0'},
  roleActive:{borderColor:'#16a34a', borderWidth:2, backgroundColor:'#f0fdf4'},
  roleTitle:{fontWeight:'700', fontSize:12, marginTop:4},
  roleDesc:{fontSize:10, color:'#64748b'},
  input:{backgroundColor:'white', borderRadius:10, padding:12, borderWidth:1, borderColor:'#e2e8f0', marginTop:10},
  btn:{backgroundColor:'#16a34a', padding:14, borderRadius:12, marginTop:12},
  btnText:{color:'white', textAlign:'center', fontWeight:'700'},
  greenHeader:{backgroundColor:'#16a34a', borderRadius:12, padding:14},
  stat:{flex:1, backgroundColor:'white', borderRadius:12, padding:12},
  statNum:{fontWeight:'800', fontSize:16},
  statLabel:{fontSize:10, color:'#64748b'},
  section:{fontWeight:'700', marginTop:16, marginBottom:8},
  payCard:{flex:1, backgroundColor:'white', borderRadius:10, padding:10, alignItems:'center'},
  small:{fontSize:10, color:'#64748b'},
  grid:{flexDirection:'row', flexWrap:'wrap', gap:10},
  gridItem:{width:'48%', backgroundColor:'white', borderRadius:10, padding:16, alignItems:'center'},
  gridLabel:{fontSize:12, textAlign:'center', fontWeight:'600'},
  listItem:{backgroundColor:'white', borderRadius:10, padding:10, marginBottom:8},
  title:{fontSize:18, fontWeight:'800', marginBottom:10},
  clientCard:{backgroundColor:'white', borderRadius:10, padding:12, marginBottom:8},
  chip:{paddingHorizontal:12, paddingVertical:6, backgroundColor:'#e2e8f0', borderRadius:20, marginTop:8},
  profile:{alignItems:'center', backgroundColor:'white', borderRadius:12, padding:16, marginBottom:12},
  menuItem:{flexDirection:'row', justifyContent:'space-between', backgroundColor:'white', padding:14, borderRadius:10, marginBottom:8}
});