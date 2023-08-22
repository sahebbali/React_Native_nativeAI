import { Image, View } from "react-native";
import { ScrollView, StyleSheet, Text } from "react-native"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

function Features() {
  return (
    <ScrollView style={styles.scrollview} bounces={false} showsVerticalScrollIndicator={false} >
        <Text style={styles.featureText}>Features</Text>

        <View style={styles.view}>
            <View style={styles.viewcontain}>
                <Image style={styles.imageview} source={require('../../assets/chatgptIcon.png')} />
                <Text style={styles.imagetext}>ChatGPT</Text>
            </View>
             <Text style={styles.bodytext} >
                ChatGPT can provide you with instant and knowledgeable responses, assist you with creative ideas on a wide range of topics.
            </Text>
        </View>

        <View style={styles.view}>
            <View style={styles.viewcontain}>
                <Image style={styles.imageview} source={require('../../assets/dalleIcon.png')} />
                <Text style={styles.imagetext}>DAll -E </Text>
            </View>
             <Text style={styles.bodytext} >
                DALL-E can generate imaginative and diverse images from textual descriptions, expanding the boundaries of visual creativity.
            </Text>
        </View>

        <View style={styles.view}>
            <View style={styles.viewcontain}>
                <Image style={styles.imageview} source={require('../../assets/smartaiIcon.png')} />
                <Text style={styles.imagetext}> Smart AI </Text>
            </View>
             <Text style={styles.bodytext} >
                A powerful voice assistant with the abilities of ChatGPT and Dall-E, providing you the best of both worlds.

            </Text>
        </View>
        
    </ScrollView>
  
  )
}

export default Features
const styles = StyleSheet.create({
    scrollview: {
        marginTop: 45,
        height: hp(60)
    },
    featureText: {
        marginLeft: 10,
        fontSize: wp(6.5),
        fontWeight: '600', 
        color: '#4a5568',
    },
    view: {
        backgroundColor: '#38a169',
        padding: 10,
        borderRadius: 20,
        margin:10,
        marginTop: 'space-y-2',
        
    },
    viewcontain: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-x-1',
    },
    imageview: {
         height: hp(4), 
         width: hp(4),
         borderRadius: 10,
    },
    imagetext: {
        fontWeight: '600',        // Font weight for semibold (font-semibold)
        color: '#4a5568',  
        marginLeft: 5,       // Text color for text-gray-700
        fontSize: wp(4.8), 
    },
    bodytext:{
         color: '#4a5568',  // Set text color to gray-700
        fontWeight: '500',
        alignItems: 'center',
        fontSize: wp(3.8)
    }
})
