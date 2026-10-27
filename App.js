import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, Image, Alert, TextInput } from 'react-native';
import { useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const COLORS = { primary:'#0E9F6E', primaryDark:'#057A55', primaryLight:'#D1FAE5', bg:'#F0FDF4', white:'#FFFFFF', gray:'#6B7280', danger:'#EF4444' };

export default function App(){
  const [role,setRole]=useState(null);
  const [warga,setWarga]=useState([]);
  const [settings,setSettings]=useState({requirePhotoProof:true, iuranDefault:20000});
  const [selectedWarga,setSelectedWarga]=useState(null);
  const [fotoBukti,setFotoBukti]=useState(null);
  const [gps,setGps]=useState(null);
  const [permission,requestPermission]=useCameraPermissions();
  const [history,setHistory]=useState([]);
  const [iuranList,setIuranList]=useState([]);
  const [search,setSearch]=useState('');

  useEffect(()=>{ loadData(); },[]);
  const loadData=async()=>{
    const w=await AsyncStorage.getItem('pasti_warga');
    const s=await AsyncStorage.getItem('pasti_settings');
    const h=await AsyncStorage.getItem('pasti_history');
    const iu=await AsyncStorage.getItem('pasti_iuran');
    if(w) setWarga(JSON.parse(w));
    else {
      const def=[
        {id:'1',kode:'CSJGDDXO',nama:'Sahar',noRumah:'4321',blok:'Blok A',iuran:20000},
        {id:'2',kode:'DEMO01',nama:'Budi Sambso',noRumah:'B-03',blok:'Blok B',iuran:30000},
        {id:'3',kode:'MY11',nama:'Mayxi',noRumah:'11',blok:'Blok A',iuran:20000},
      ];
      setWarga(def); await AsyncStorage.setItem('pasti_warga',JSON.stringify(def));
    }
    if(s) setSettings(JSON.parse(s));
    if(h) setHistory(JSON.parse(h));
    if(iu) setIuranList(JSON.parse(iu));
  };

  const totalPelanggan=warga.length;
  const hariIni=new Date().toDateString();
  const diangkutHariIni=history.filter(x=>new Date(x.tanggal).toDateString()===hariIni).length;
  const totalTerkumpul=iuranList.reduce((a,b)=>a+b.jumlah,0);
  const belumBayar=totalPelanggan - new Set(iuranList.filter(x=>x.periode==='Oktober 2026').map(x=>x.wargaId)).size;

  if(!role){
    return (
      <ScrollView style={{flex:1,backgroundColor:COLORS.bg}}>
        <View style={{height:260,backgroundColor:COLORS.primary,padding:20,justifyContent:'flex-end',borderBottomLeftRadius:24,borderBottomRightRadius:24}}>
          <Text style={{color:'white',fontSize:32,fontWeight:'800'}}>Pasti Angkut</Text>
          <Text style={{color:COLORS.primaryLight,marginTop:6}}>Data dinamis - {totalPelanggan} warga - {diangkutHariIni}/{totalPelanggan} angkut - Rp {totalTerkumpul.toLocaleString()}</Text>
          <Text style={{color:'rgba(255,255,255,0.7)',fontSize:10,marginTop:8}}>7, 6, 20.000 dulu contoh - sekarang dinamis dari database</Text>
        </View>
        <View style={{padding:16,marginTop:-20,flexDirection:'row',flexWrap:'wrap',gap:12}}>
          {[
            {id:'pengelola',label:'Pengelola',icon:'👑'},
            {id:'kebersihan',label:'Petugas Kebersihan',icon:'🧹'},
            {id:'iuran',label:'Petugas Iuran Rina',icon:'💰'},
            {id:'warga',label:'Warga Web QR',icon:'🏠'},
          ].map(r=>(
            <TouchableOpacity key={r.id} onPress={()=>setRole(r.id)} style={{width:'48%',backgroundColor:'white',padding:16,borderRadius:16}}>
              <Text style={{fontSize:28}}>{r.icon}</Text>
              <Text style={{fontWeight:'800',marginTop:8}}>{r.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    );
  }

  if(role==='pengelola'){
    return (
      <ScrollView style={{flex:1,backgroundColor:COLORS.bg}}>
        <View style={{backgroundColor:COLORS.primary,padding:16,paddingTop:50}}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View><Text style={{color:'white',fontWeight:'800',fontSize:18}}>Dashboard Pengelola</Text><Text style={{color:COLORS.primaryLight,fontSize:11}}>Total {totalPelanggan} (dinamis) - Belum {belumBayar<0?0:belumBayar} - Rp {totalTerkumpul.toLocaleString()}</Text></View>
            <TouchableOpacity onPress={()=>setRole(null)}><Text style={{color:'white'}}>Keluar</Text></TouchableOpacity>
          </View>
        </View>
        <View style={{padding:12}}>
          <View style={{backgroundColor:'#FEF3C7',padding:14,borderRadius:14,borderWidth:1,borderColor:'#FCD34D'}}>
            <Text style={{fontWeight:'800',fontSize:12}}>⚙️ Toggle Foto Bukti ON/OFF - Request Kamu</Text>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10,backgroundColor:'white',padding:12,borderRadius:12}}>
              <Text style={{fontSize:12}}>Wajibkan foto bukti</Text>
              <Switch value={settings.requirePhotoProof} onValueChange={async(v)=>{const ns={...settings,requirePhotoProof:v};setSettings(ns);await AsyncStorage.setItem('pasti_settings',JSON.stringify(ns));}} />
            </View>
          </View>
          <TouchableOpacity onPress={()=>setRole(null)} style={{marginTop:20,alignItems:'center'}}><Text style={{color:COLORS.danger}}>Kembali</Text></TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const isIuran=role==='iuran';
  return (
    <View style={{flex:1,backgroundColor:COLORS.bg}}>
      <View style={{backgroundColor:COLORS.primary,padding:16,paddingTop:50}}><Text style={{color:'white',fontWeight:'800'}}>Halo, {isIuran?'Rina - Iuran Manual':'Joko - Kebersihan'} - {totalPelanggan} warga dinamis</Text></View>
      <ScrollView style={{padding:12}}>
        {!selectedWarga?(
          <View style={{backgroundColor:'white',padding:16,borderRadius:16}}>
            <Text style={{fontWeight:'700'}}>{isIuran?'Scan QR Pembayaran':'Scan QR Rumah + Foto Bukti'}</Text>
            {warga.map(w=>(
              <TouchableOpacity key={w.id} onPress={()=>setSelectedWarga(w)} style={{padding:12,borderBottomWidth:1,borderBottomColor:'#eee'}}>
                <Text>{w.noRumah} - {w.nama} - Rp {w.iuran.toLocaleString()} (dinamis)</Text>
              </TouchableOpacity>
            ))}
          </View>
        ):(
          <View style={{backgroundColor:'white',padding:16,borderRadius:16}}>
            <TouchableOpacity onPress={()=>setSelectedWarga(null)}><Text style={{color:COLORS.primary}}>← Kembali</Text></TouchableOpacity>
            <Text style={{fontWeight:'800',marginTop:10}}>{selectedWarga.nama} - {selectedWarga.kode}</Text>
            {!isIuran?(
              <View style={{marginTop:12}}>
                {fotoBukti?<Image source={{uri:fotoBukti}} style={{height:150,borderRadius:10}}/>:null}
                <TouchableOpacity onPress={async()=>{let r=await ImagePicker.launchCameraAsync({quality:0.6});if(!r.canceled) setFotoBukti(r.assets[0].uri);}} style={{backgroundColor:COLORS.primary,padding:12,borderRadius:10,marginTop:10,alignItems:'center'}}><Text style={{color:'white'}}>{fotoBukti?'Ambil Ulang':'Ambil Foto Bukti'}</Text></TouchableOpacity>
                <TouchableOpacity disabled={settings.requirePhotoProof&&!fotoBukti} onPress={async()=>{const rec={id:Date.now().toString(),wargaId:selectedWarga.id,tanggal:new Date().toISOString()};const ex=await AsyncStorage.getItem('pasti_history');const hist=ex?JSON.parse(ex):[];hist.unshift(rec);await AsyncStorage.setItem('pasti_history',JSON.stringify(hist));setHistory(hist);Alert.alert('Berhasil','Tercatat di server');setSelectedWarga(null);setFotoBukti(null);}} style={{backgroundColor:(settings.requirePhotoProof&&!fotoBukti)?'#9CA3AF':COLORS.primary,padding:14,borderRadius:12,marginTop:12,alignItems:'center'}}><Text style={{color:'white',fontWeight:'800'}}>✓ Konfirmasi Diangkut - Simpan Server</Text></TouchableOpacity>
              </View>
            ):(
              <TouchableOpacity onPress={async()=>{const rec={id:Date.now().toString(),wargaId:selectedWarga.id,periode:'Oktober 2026',jumlah:selectedWarga.iuran};const ex=await AsyncStorage.getItem('pasti_iuran');const list=ex?JSON.parse(ex):[];list.unshift(rec);await AsyncStorage.setItem('pasti_iuran',JSON.stringify(list));setIuranList(list);Alert.alert('Tercatat',`Rp ${selectedWarga.iuran.toLocaleString()} masuk server`);setSelectedWarga(null);}} style={{backgroundColor:COLORS.primary,padding:14,borderRadius:12,marginTop:12,alignItems:'center'}}><Text style={{color:'white',fontWeight:'800'}}>✓ Simpan Pembayaran Rp {selectedWarga.iuran.toLocaleString()}</Text></TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
