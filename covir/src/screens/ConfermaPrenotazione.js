import React, { useState, useContext, useEffect } from 'react';
import { Portal,Paragraph,Dialog } from 'react-native-paper';
import { View, Text, Image, StyleSheet, TouchableOpacity, ViewPropTypes  } from 'react-native'
import RadioButton from '../components/Radio';
import { Divider, Card, Button, Icon } from 'react-native-elements';
import FormButton from '../components/FormButton3';
import DialogButton from '../components/FormButton4';
import FormInput from '../components/FormInput';
import { AuthContext } from '../navigation/AuthProvider';
import { db } from '../common/crud'; 


export default function ConfermaPrenotazione({navigation,route}) { //non legge immagin
    const [checked, setChecked] = React.useState(false);
    const {user,setUser} = useContext(AuthContext);
    const id = route.params.idSlot;
    const mailV = route.params.emailvolontario;
    const mailric = user.email;
    const [mailVol,setMailVol] = useState("");
    const piatt = "Skype";
    console.log("piattaforma"+piatt);
    const [visible, setVisible] = useState(false);
    const [info, setInfo] = useState('la tua informazione');
    const app = {idslot:id, mailrichiedente:mailric, mailvolontario: mailV, piattaforma:piatt,informazione:info};
    const [slot, setSlot] = useState("");
    


    useEffect(() => {
        prelevaSlot();
      }, []);
    
    async function prelevaSlot(){
        var x = await db.getSlotObj(id);
        console.log(x.id);
        setSlot(x);
    };

    function showDialog(id){ setVisible(true);};                         
    function confermaDialog(){hideDialog(); db.addAppuntamento(slot.id,app);};
    function hideDialog(){setVisible(false);};
    
    
    return (
    <View>
     <Portal>
  <Dialog visible={visible}  onDismiss={hideDialog}>
    <Dialog.Title>CONFERMA</Dialog.Title>
    <Dialog.Content>
      <Paragraph>Sei sicuro di voler prenotare questo appuntamento?</Paragraph>
    </Dialog.Content>
    <Dialog.Actions>
      <DialogButton title=' No' modeValue='contained' labelStyle={styles.loginButtonLabel}  onPress={hideDialog}/>
      <DialogButton title=' Si' modeValue='contained' labelStyle={styles.loginButtonLabel} onPress={ () => {confermaDialog(); navigation.navigate('Il mio Profilo');}}/>
    </Dialog.Actions>
  </Dialog>
</Portal>   
    <View containerStyle={styles.container}>
        <Text  style={styles.scelta}>SCEGLI LA PIATTAFORMA</Text>
        <Card containerStyle={styles.card}>
        </Card>
        <RadioButton></RadioButton>
        <FormInput style={{marginTop:10,backgroundColor:'#ffffff'}}
          			labelName='Info contatto relativo alla piattaforma scelta'
                value={info}
                autoCapitalize='none'
                onChangeText={userInfo => setInfo(userInfo)}
        		/>
    </View>
    <View containerStyle={styles.container1}>
        <FormButton
          containerStyle={styles.bottone}
          title='Conferma'
          modeValue='contained'
          labelStyle={styles.loginButtonLabel}
          onPress={() => showDialog()}  //{() => login(email, password)}
        />
    </View>
    </View>
    );
}

const styles = StyleSheet.create({
    scelta: {
        fontSize: 26,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 20,
        marginLeft: '10%',
        marginRight: '10%',
        color:'#1979a9',
        fontWeight: "bold"
    },
    loginButtonLabel: {
        fontSize: 22,
    
      },
    card:{
        backgroundColor:'#1979a9',
        borderWidth:0,
        height:30,
        width:'100%', 
        padding: 7,
        marginBottom: '-15%',
        marginLeft: '0%'
            
            
    },
    loginButtonLabel: {
        fontSize: 15,
        marginLeft: '0%',
        textAlign: 'center',
        color: '#ffffff'
    },
    container: {
        flex:1
    },
    container1: {
        flex:1
    },
    botton:  {
        backgroundColor:'#1979a9',
        width: 10,
        height:10
    }
        
});