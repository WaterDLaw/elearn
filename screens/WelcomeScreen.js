
import React from 'react';
import { View, Text, StyleSheet, StatusBar, Dimensions, TouchableOpacity, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
const WelcomeScreen = ({navigation}) =>{
    return(
        <View style={styles.container}>
            <StatusBar barStyle="light-content"/>
            <Animatable.View style={styles.header}>
                <Image 
                    animation="bounceIn"
                    duration={1500}
                    source={require("../assets/logo.png")}
                    style={styles.logo}
                    resizeMode={'stretch'}
                />
                
                
            </Animatable.View>
            <View 
                style= {styles.footer}
                animation="fadeInUpBig"
                >
                <Text style={styles.title}>
                    Your personal learning experience!
                </Text>
                <Text style= {styles.text}>
                    Sign in with account
                </Text>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={()=> {navigation.navigate('Login')}}
                    >
                        <LinearGradient
                            colors={['#5db8fe', '#39cff2']}
                            style={styles.signIn}
                        >
                            <Text style={styles.textSign}>Get started</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const {height} = Dimensions.get("screen")
const height_logo = height *0.6 * 0.4
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00274d'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius:30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 50
    },
    logo: {
        width: height_logo,
        height: height_logo,
        borderRadius: 50
    },
    title:{
        color: '#00274d',
        fontWeight:'bold',
        fontSize: 30
    },
    text: {
        color: 'gray',
        marginTop: 5
    },
    button: {
        alignItems:'flex-end',
        marginTop:30
    },
    signIn:{
        width: 150,
        height: 40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:50,
        flexDirection:'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }

})

export default WelcomeScreen;