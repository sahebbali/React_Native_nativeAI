import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function WellcomePage() {
    const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.containerStyle}>
            <Text style={styles.headerText}>  Jarvis</Text>
            <Text style={styles.pText}>The future is here, powerd by AI.</Text>
        </View>
        <View style={styles.wellcomeImage}>
            <Image 
                source={require('../../assets/welcome.png')}
                style={styles.image}
            />
           
        </View>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.getStart}>
            <Text style={styles.getStartBtn}> Get Started</Text>
        </TouchableOpacity>
    </SafeAreaView>
   
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'space-around',
        backgroundColor: 'white',
    },
    containerStyle: {
        display: 'flex',
        flexDirection: 'column',
    },
    headerText: {
        fontSize: wp(10), // Assuming wp(10) returns a valid font size value
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#7C7C7C',
    },
    pText:{
        fontSize: wp(4), // Assuming wp(4) returns a valid font size value
        textAlign: 'center',
        letterSpacing: 2,
        fontWeight: '600', // Assuming this is the font weight for font-semibold
        color: '#6B7280',
    },
    wellcomeImage:{
        display: 'flex',
        flexDirection: 'row', // flex-row
        justifyContent: 'center', // justify-center
        
    },
    image: {
        height: wp(75),
        width: wp(75)
    },
    getStart: {
        backgroundColor: '#10B981', // bg-emerald-600
        marginHorizontal: 20,      // mx-5
        padding: 16,               // p-4
        borderRadius: 16,
    },
    getStartBtn:{
        textAlign: 'center',
        fontWeight: 'bold',
         color: 'white',
    }
})