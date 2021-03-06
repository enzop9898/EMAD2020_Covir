import React, { useState, useContext, useEffect } from 'react';
import { db } from '../common/crud'; 
import { AuthContext } from '../navigation/AuthProvider';
import { Title } from 'react-native-paper';
import { IconButton, List, Card, Avatar } from 'react-native-paper';
import { View, Text, Image, StyleSheet, VirtualizedList,ActivityIndicator, LogBox } from 'react-native'
import {ListItem, Button, Icon, SocialIcon } from 'react-native-elements'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import { LinearGradient } from 'expo-linear-gradient'; 
import { color } from 'react-native-reanimated';


LogBox.ignoreLogs(['Warning: ...', 'Require cycle:', ' @firebase/database:, FIREBASE WARNING:']);
LogBox.ignoreAllLogs();
 

export default function ScegliSlotTempo({navigation,route}) {
  var mesi = new Array(12);
mesi[0] = "Gennaio";
                        mesi[1] = "Febbraio";
                        mesi[2] = "Marzo";
                        mesi[3] = "Aprile";
                        mesi[4] = "Maggio";
                        mesi[5] = "Giugno";
                        mesi[6] = "Luglio";
                        mesi[7] = "Agosto";
                        mesi[8] = "Settembre";
                        mesi[9] = "Ottobre";
                        mesi[10] = "Novembre";
                        mesi[11] = "Dicembre";
  LogBox.ignoreLogs(['Warning: ...', 'Require cycle:', ' @firebase/database:, FIREBASE WARNING:']);
  const  etajs = route.params.eta;
    console.log("età"+etajs);
    const [result,setResult] = useState([]);
    const [loading,setLoading] = useState(true);
    var listavolontaricorretti = [];
    var listafinale=[];
    LogBox.ignoreAllLogs();

    useEffect(() => {
      LogBox.ignoreLogs(['Warning: ...', 'Require cycle:', ' @firebase/database:, FIREBASE WARNING:']);

        caricaDati(etajs);
      }, []);

      
      function calcolaeta( d ) {
        LogBox.ignoreLogs(['Warning: ...', 'Require cycle:', ' @firebase/database:, FIREBASE WARNING:']);

        var timestamp = Date.parse( d );
        var today = new Date().getTime();
        var diff = ( today - timestamp ) / ( 1000 * 60 * 60 * 24 * 365 );
        var n = parseInt( diff, 10 );
        return n;
    };

    async function caricaDati(eta){
      LogBox.ignoreLogs(['Warning: ...', 'Require cycle:', ' @firebase/database:, FIREBASE WARNING:']);

        console.log("DAVIDEEEEEEEEEEEEEEEEEE");
        var list = await db.getAllVolontari();
        console.log(list[0].cognome);
        console.log("GIANLUCAAAAAAAAAAAAAAAAA");
        
        for(i=0;i<list.length;i++){
          const datajs = list[i].datanascita.toDate();
          const etaattuale = calcolaeta(datajs);
          var volon = list[i];
          if(etaattuale>eta){
            listavolontaricorretti.push(volon); 
        }
        
          /*
          const datajs = slot.dataorainizio.toDate().toDateString();
          const inizio = slot.inizio;
          const fine = slot.fine;
          console.log(datajs);
          console.log(inizio);
          console.log(fine);
          */
        }
        //setLoading(false);
        caricaSlot();
          
    };
      
     async function caricaSlot() {
      LogBox.ignoreLogs(['Warning: ...', 'Require cycle:', ' @firebase/database:, FIREBASE WARNING:']);

      //ERRORE QUI
      var i,j;
      var listaslot= [];
      for(i=0;i<listavolontaricorretti.length;i++){
          var mail = listavolontaricorretti[i].email;
          listaslot = await db.getAllSlotByVolontario(mail);
          console.log("ciao"+listaslot);
          if(listaslot.length>0){
            crealistafinale(listaslot);
          }
        }  
        setResult( listafinale);
        setLoading(false); 
        //settaris();
        //A QUI
    }

    function crealistafinale(listaslot){
      LogBox.ignoreLogs(['Warning: ...', 'Require cycle:', ' @firebase/database:, FIREBASE WARNING:']);

       var j;
       for(j=0;j<listaslot.length;j++){
        console.log("Chiavevol:"+listaslot[j]);
        const datajs = listaslot[j].dataorainizio.toDate();
        var dataoggi= new Date(Date.now()+(10*60*1000)); 
        if(listaslot[j].occupato==false && datajs>dataoggi){
        listafinale.push(listaslot[j]);
        }
        }
        
    }
      
      const renderContent =()=>{
        LogBox.ignoreLogs(['Warning: ...', 'Require cycle:', ' @firebase/database:, FIREBASE WARNING:']);
        LogBox.ignoreAllLogs();
        if(loading){
          return (
            <ActivityIndicator size="small" color={"#000000"}/>
          )
        }else{
          console.log("sto renderizzando lo screen");
          return(
            <View>
        
            <Text style={styles.scelta}>APPUNTAMENTI DISPONIBILI</Text>
            <FlatList 
            scrollEnabled={true}
                title="APPUNTAMENTI DISPONIBILI"
                containerStyle={styles.app}
                data={result}
                  renderItem={({item}) => <Card.Title 
                                                style={styles.card}
                                                title={item.inizio.toDate().getDate()+' '+ mesi[item.inizio.toDate().getMonth()]+' '+item.inizio.toDate().getFullYear()}
                                                titleStyle={styles.testo}
                                                subtitle={item.inizio.toDate().getHours()+":"+item.inizio.toDate().getMinutes()+" - "+item.fine.toDate().getHours()+":"+item.fine.toDate().getMinutes()}
                                                left={(props) => <Avatar.Icon  icon={{ uri:'https://raw.githubusercontent.com/enzop9898/EMAD2020_Covir/main/covir/src/images/calendar3.png'}} style={styles.icona} />}
                                                leftStyle={styles.bottoneLeft}
                                                right={(props) => <IconButton icon={{uri:'https://raw.githubusercontent.com/enzop9898/Covir/main/covir/src/images/logout.png'}} style={styles.bottoneRight} onPress={() => navigation.navigate('ConfermaAppuntamento',{"idSlot":item.id,"emailvolontario":item.chiavevolontario})} />}/> }/>      
         
          </View>
      
          )
        }
      }


    return (
    <View>
    {renderContent()}
    </View>
    );
        
}

const styles = StyleSheet.create({
    scelta: {
        fontSize: 26,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 20,
        color:'#1979a9',
        fontWeight: "bold"

    },
    icona:{
        backgroundColor: '#009bd6',
        borderRadius:0,
        marginLeft: '-40%',
        height: '177%'

    },
    app:{
        height: '45%',
        borderColor: '#1979a9'

    },
    bottoneLeft:{
        paddingLeft: '0%',
        marginRight: '10%'
    },
    card: {
        borderColor: '#009bd6',
        borderTopWidth: 4,
        borderBottomWidth: 4,
        marginTop: '0%'
    },
    testo: {
        color:'rgb(33,82,114)'
    }
});