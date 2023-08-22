import React, {useEffect, useRef, useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity,ScrollView,Image, SafeAreaView, Alert} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Features from '../components/Features';
import { dummyMessages } from '../constants';
import Voice from '@react-native-community/voice';
import Tts from 'react-native-tts';
function HomePage() {
   const [result, setResult] = useState('');
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const scrollViewRef = useRef();

   const speechStartHandler = e => {
    console.log('speech start event', e);
  };
  const speechEndHandler = e => {
    setRecording(false);
    console.log('speech stop event', e);
  };
  const speechResultsHandler = e => {
    console.log('speech event: ',e);
    const text = e.value[0];
    setResult(text);
    
  };

  const speechErrorHandler = e=>{
    console.log('speech error: ',e);
  }

  
  const startRecording = async () => {
    setRecording(true);
    // Tts.stop(); 
    try {
      await Voice.start('en-GB'); // en-US

    } catch (error) {
      console.log('error', error);
    }
  };
  const stopRecording = async () => {
    
    try {
      await Voice.stop();
      setRecording(false);
      fetchResponse();
    } catch (error) {
      console.log('error', error);
    }
  };
  // const clear = () => {
  //   Tts.stop();
  //   setSpeaking(false);
  //   setLoading(false);
  //   setMessages([]);
  // };

  const fetchResponse = async ()=>{
    if(result.trim().length>0){
      setLoading(true);
      let newMessages = [...messages];
      newMessages.push({role: 'user', content: result.trim()});
      setMessages([...newMessages]);

      // scroll to the bottom of the view
      updateScrollView();

      // fetching response from chatGPT with our prompt and old messages
      apiCall(result.trim(), newMessages).then(res=>{
        console.log('got api data');
        setLoading(false);
        if(res.success){
          setMessages([...res.data]);
          setResult('');
          updateScrollView();

          // now play the response to user
          startTextToSpeach(res.data[res.data.length-1]);
          
        }else{
          Alert.alert('Error', res.msg);
        }
        
      })
    }
  }



  const updateScrollView = ()=>{
    setTimeout(()=>{
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    },200)
  }

  const startTextToSpeach = message=>{
    if(!message.content.includes('https')){
      setSpeaking(true);
     // playing response with the voice id and voice speed
      Tts.speak(message.content, {
        iosVoiceId: 'com.apple.ttsbundle.Samantha-compact',
        rate: 0.5,
      });
    }
  }
  

  const stopSpeaking = ()=>{
    // Tts.stop();
    setSpeaking(false);
  }

  useEffect(() => {

    // // voice handler events
    // Voice.onSpeechStart = speechStartHandler;
    // Voice.onSpeechEnd = speechEndHandler;
    // Voice.onSpeechResults = speechResultsHandler;
    // Voice.onSpeechError = speechErrorHandler;
    
    // // text to speech events
    // Tts.setDefaultLanguage('en-IE');
    // Tts.addEventListener('tts-start', event => console.log('start', event));
    // Tts.addEventListener('tts-finish', event => {console.log('finish', event); setSpeaking(false)});
    // Tts.addEventListener('tts-cancel', event => console.log('cancel', event));

    
    
    return () => {
      // destroy the voice instance after component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ display:'flex',margin:10}}>
          <View style={styles.bot}>
              <Image source={require('../../assets/bot.png')} 
                style={{height: hp(15), width: hp(15)}}
              />
          </View>
        
          {
            messages.length > 0 ? (
              <View style={styles.msgview}>
                   
                <Text style={styles.msgtext}>Assistant</Text>

                  <View style={styles.msgcontain}>
                   <ScrollView>
                      {
                        messages.map((message, index)=>{
                          if(message.role=== 'assistant'){
                            if(message.content.includes('https')){
                               return (
                                <View key={index} style={styles.msgimageview}>
                                  <Image 
                                    source={{uri: message.content}}
                                    resizeMode='contain'
                                    style={styles.msgimage}
                                   />
                                </View>
                               )
                            } else{
                              return (
                                  <View key={index} style={styles.messageStyles}>
                                    <Text style={styles.textStyles}>
                                      {message.content}
                                    </Text>
                                  </View>
                                );
                            }
                          } else{
                            return(
                                <View key={index} style={styles.userinput}>
                                  <View style={styles.userinputtext}>
                                      <Text style={styles.msgcontainbody}> {message.content}</Text>
                                  </View>
                                </View>
                              );
                            
                          }
                        })
                      }
                  </ScrollView> 

                  </View> 
              </View>
            ) :(
          <Features />
            )
          }

           {/* recording, clear and stop buttons */}
            <View style={styles.recordingview}>
               {
            loading? (
              <Image 
                source={require('../../assets/loading.gif')}
                style={{width: hp(10), height: hp(10)}}
              />
            ):
              recording ? (
                <TouchableOpacity className="space-y-2" onPress={stopRecording}>
                  {/* recording stop button */}
                  <Image 
                    source={require('../../assets/voiceLoading.gif')}
                    style={{width: hp(10), height: hp(10), borderRadius: 20}}
                  />
                </TouchableOpacity>
                
              ) : (
                <TouchableOpacity onPress={startRecording}>
                  {/* recording start button */}
                  <Image 
                    source={require('../../assets/recordingIcon.png')}
                    style={{width: hp(10), height: hp(10), borderRadius: 20}}
                  />
                </TouchableOpacity>
              )
          }
          {
            messages.length>0 && (
              <TouchableOpacity 
                onPress={clear} 
                style={styles.msgtouch}
              >
                <Text className="text-white font-semibold">Clear</Text>
              </TouchableOpacity>
            )
          }
          {
            speaking && (
              <TouchableOpacity 
                onPress={stopSpeaking} 
                className="bg-red-400 rounded-3xl p-2 absolute left-10"
              >
                <Text className="text-white font-semibold">Stop</Text>
              </TouchableOpacity>
            )
          }
            
            
          
        </View>
            

      
      </SafeAreaView>
       
    </View>
  )
}

export default HomePage;


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white'
  },
  saveArea:{
     display: 'flex',
      flex: 1,
      marginLeft: '5rem'
  },
  bot:{
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  msgview: {
    display: 'flex',
     spaceY: 16,// Assuming this is applied to a parent container
        
  },
  msgtext:{
    color: '#4a5568',       // Color code for text-gray-700
    fontWeight: '600',      // Font weight for font-semibold
    marginLeft: 16,     // Margin left of 1 rem
    fontSize: wp(5),
  },
  msgcontain: {
     backgroundColor: '#d1d5db',
    borderRadius: 26,
    padding: 'p-4',
    height: hp(58)
  },
  msgimageview:{
    display: 'flex',
    backgroundColor: '#A8DF8E',
    flexDirection: 'row',
    width: wp(63),
    padding: 5,

  justifyContent: 'flex-start', //
  },
  msgimage: {
    borderRadius: 12,
    height: wp(60),
    paddingLeft:10,  // Assuming wp(60) calculates a responsive height
    width: wp(60),
  },
  msgcontainbody: {
     color: '#808080',
     fontSize: wp(4)
  },
  messageStyles: {
    width: wp(70),
    backgroundColor: '#c3e0c3',
    padding: 12,
    borderRadius: 24,
    borderTopLeftRadius: 0,
},

 textStyles: {
    color: '#808080',
    fontSize: wp(4),
},
  userinput:{
      display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  userinputtext:{
    width: wp(70),
    backgroundColor: 'white',    // White background color
    padding: 12,  
    margin:10,                // Padding of 2 units
    borderRadius: 12,      // Rounded corners with extra-large radius
    borderTopRightRadius: 0, 
  },

  recordingview:{
     display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  msgtouch:{
    background: '#A8DF8E',
    rounded: 40,
    padding: 12,
    position: 'absolute',
    right: 10
  },
})