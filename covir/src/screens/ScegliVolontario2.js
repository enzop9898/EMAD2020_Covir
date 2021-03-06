import React from 'react';
import { Title } from 'react-native-paper';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { View, Text, Image, StyleSheet } from 'react-native'
import { Card, ListItem, Button, Icon, Avatar } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
import { LinearGradient } from 'expo-linear-gradient'; 
import { db } from '../common/crud';

export default function ScegliVolontario({navigation}) { //non legge immagin
    
    return (
    <View>
        <Text style={styles.scelta}> SCEGLI L'OPERATORE IN BASE ALLA FASCIA D'ETÀ</Text>
        <ListItem containerStyle={styles.card1} onPress={() => navigation.navigate('ScegliTempo',{"eta":18})}
            Component={TouchableScale}
            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} 
             // Only if no expo
            >
            <Avatar rounded source={{ uri: 'https://raw.githubusercontent.com/enzop9898/Covir/main/covir/src/images/teenage.png' }}  avatarStyle={styles.icona} containerStyle={styles.immagine}></Avatar>
            <ListItem.Content>
                <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}><Text>PER OVER 18</Text></ListItem.Title>
                <ListItem.Subtitle style={{ color: 'white' }}><Text>20 disponibili</Text></ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="white" />
        </ListItem>  
        <ListItem containerStyle={styles.card2} onPress={() => navigation.navigate('ScegliTempo',{"eta":30})}
            Component={TouchableScale}
            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95}
             // Only if no expo
            >
            <Avatar rounded source={{ uri: 'https://raw.githubusercontent.com/enzop9898/Covir/main/covir/src/images/actress.png' }} avatarStyle={styles.icona} containerStyle={styles.immagine}/>
            <ListItem.Content>
                <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}><Text>PER OVER 30</Text></ListItem.Title>
                <ListItem.Subtitle style={{ color: 'white' }}><Text>12 disponibili</Text></ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="white" />
        </ListItem> 
        <ListItem containerStyle={styles.card3} onPress={() => navigation.navigate('ScegliTempo',{"eta":40})}
            Component={TouchableScale}
            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} 
            // Only if no expo
            >
            <Avatar rounded source={{ uri: 'https://raw.githubusercontent.com/enzop9898/Covir/main/covir/src/images/40.png' }} avatarStyle={styles.icona} containerStyle={styles.immagine} />
            <ListItem.Content>
                <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}><Text>PER OVER 40</Text></ListItem.Title>
                <ListItem.Subtitle style={{ color: 'white' }}><Text>30 disponibili</Text></ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="white" />
        </ListItem> 
        <ListItem containerStyle={styles.card4} onPress={() => navigation.navigate('ScegliTempo',{"eta":60})}
            Component={TouchableScale}
            friction={90} //
            tension={100} // These props are passed to the parent component (here TouchableScale)
            activeScale={0.95} 
             // Only if no expo
            >
            <Avatar rounded source={{ uri: 'https://raw.githubusercontent.com/enzop9898/Covir/main/covir/src/images/grandmother.png' }} avatarStyle={styles.icona} containerStyle={styles.immagine}/>
            <ListItem.Content>
                <ListItem.Title style={{ color: 'white', fontWeight: 'bold' }}><Text>PER OVER 60</Text></ListItem.Title>
                <ListItem.Subtitle style={{ color: 'white' }}><Text>1 disponibili</Text></ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron color="white" />
        </ListItem> 
    </View>
    );
        
}

const styles = StyleSheet.create({
    card1:{
        height:110,
        marginLeft:10,
        marginBottom: 3,
        borderRadius: 10,
        width: '95%',
        marginTop: 10,
        backgroundColor: '#00b8ff'
               
    },
    card2:{
        height:110,
        marginLeft:10,
        marginBottom: 3,
        borderRadius: 10,
        width: '95%',
        marginTop: 10,
        backgroundColor: '#009bd6'
               
    },
    card3:{
        height:110,
        marginLeft:10,
        marginBottom: 3,
        borderRadius: 10,
        width: '95%',
        marginTop: 10,
        backgroundColor: '#00719c'
               
    },
    card4:{
        height:110,
        marginLeft:10,
        marginBottom: 3,
        borderRadius: 10,
        width: '95%',
        marginTop: 10,
        backgroundColor: '#00415a'
               
    },
    immagine:{
        borderTopLeftRadius:17,
        borderTopRightRadius:17,
        height: '100%',
        width: '25%',
        paddingLeft: '0%',
        marginLeft: '0%'
    },
    icona: {
        height:'100%',
        width: '100%',
        alignContent: 'center',
        justifyContent: 'center',
        borderRadius: 80,  
    },
    scelta: {
        fontSize: 26,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 20,
        color:'#1979a9',
        fontWeight: "bold"

    }
});