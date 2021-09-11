import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Image } from 'react-native';
import * as yup from 'yup';
import SignupScreen from './SignupScreen';
import Ionicons from '@expo/vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../features/user/userSlice';


//formik
import { Formik } from 'formik';
import { LinearGradient } from 'expo-linear-gradient';


const validationSchema = yup.object().shape({
    email: yup.string().label('Email').email(),
    password: yup.string().label('Password')
})

const LoginScreen = ({navigation})=>{

    // Local UI State to toggle the password field on and off and change the eye Icon
    const [visiblePassword, setVissiblePassword] = useState(true)
    const [passwordIcon, setPasswordIcon] = useState('eye-off-outline')
    const passwordVisabilityHandler = () => {
        setVissiblePassword(value => !value)
        if(visiblePassword){
            setPasswordIcon('eye-outline')
            
        }else{
            setPasswordIcon('eye-off-outline')
        }
        
    }

    // Redux 
    const dispatch = useDispatch();
    const userEmail = useSelector((state) => state.userEmail)
    

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text_header}> Welcome to ELEARN</Text>
                
            </View>
            <Animatable.View 
                style= {styles.footer}
                animation="fadeInUpBig"
                >
            <Formik 
                 
                    initialValues={{
                        email:'',
                        password: ''
                    }}
                  
                    onSubmit={(values)=>{
                        console.log("signin")
                        
                        dispatch(
                            loginUser({
                                email: values.email,
                                password: values.password
                            })
                        )

                    }}
                    validationSchema={validationSchema}
          
                >
                    {({handleChange, values, handleSubmit, touched, errors, handleBlur}) =>(
                        <>
                        <View style={styles.footer}>
                            {/** Email Textinput */}
                            <Text style={styles.text_footer}>E-MAIL</Text>
                            <View style={styles.action}>
                                <Ionicons name="person-outline" size={25}/>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Your Email"
                                    onChangeText={handleChange('email')}
                                    error={errors.email}
                                    errorMessage={errors.email ? errors.email : undefined}
            
                                />
                                <Ionicons name="checkmark-circle-outline" size={25} color="green"/>
                            </View>

                            {/** Password Textinput */}
                            <Text style={[styles.text_footer,{marginTop:35}]}>PASSWORD</Text>
                            <View style={styles.action}>
                                <Ionicons name="key-outline" size={25} />
                                <TextInput
                                    secureTextEntry={visiblePassword}
                                    style={styles.textInput}
                                    placeholder="Your Password"
                                    onChangeText={handleChange('password')}
                                    error={errors.password}
                                    errorMessage={errors.password ? errors.password : undefined}
                                />
                                <Ionicons name={passwordIcon} size={25} color="grey"
                                    onPress={passwordVisabilityHandler}
                                />
                            </View>

                            {/**  SignIn and Login Button*/}
                            <Text style={{color: '#009bd1', marginTop:15}}>Forgot password</Text>
                            <View style={styles.button}>
                                <TouchableOpacity  onPress={handleSubmit} style={{width: '100%'}}>
                                    <LinearGradient
                                        colors={['#5db8fe', '#39cff2']}
                                        style={styles.signIn}
                                    >
                                        <Text style={styles.textSign}>
                                            Sign In
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.signUp]} onPress={() => navigation.navigate ('Signup')} >
                                    <Text style={styles.textSignUp}>
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            </View>
                           
                        </View>
                        </>
                    )}
                </Formik>
                </Animatable.View >
                {/** Social Media Login options*/}
                <View style={styles.socialLoginWrap}>
                    <Animatable.View animation= "bounceInUp" delay={1000}>
                    <TouchableOpacity style={styles.socialLogin} >
                        
                        <Image 
                            source={require("../assets/logo-facebook.png")} 
                            style = {{height: 30, width: 30, resizeMode : 'stretch'}}
                            
                        />
                    </TouchableOpacity>
                    </Animatable.View>
                    <Animatable.View animation= "bounceInUp" delay={1200}>
                    <TouchableOpacity style={styles.socialLogin}>
                        <Image source={require("../assets/logo-google.png")} style = {{height: 30, width: 30, resizeMode : 'stretch'}}/>
                    </TouchableOpacity>
                    </Animatable.View>
                    <Animatable.View animation= "bounceInUp" delay={1400}>
                    <TouchableOpacity style={styles.socialLogin}>
                        <Image source={require("../assets/logo-apple.png")} style = {{height: 30, width: 30, resizeMode : 'stretch'}}/>
                    </TouchableOpacity>
                    </Animatable.View>
                </View>
            </View>
        

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00274d'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal:20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: 'white',
        borderTopLeftRadius:30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius:40,
        borderBottomRightRadius: 40
   
    },
    text_footer:{
        color: '#00274d',
        fontSize: 18
    },
    text_header:{
        color:'white',
        fontWeight:'bold',
        fontSize:30
    },
    action:{
        flexDirection: 'row',
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor: '#f2f2f2',
        paddingBottom:5
    },
    textInput: {
        flex:1,
        paddingLeft:10,
        color:'#00274d'
    },
    button:{
        alignItems: 'center',
        marginTop: 40
    },
    signIn:{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
    },
    signUp:{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:10,
        color:'#fff',
        borderColor: '#4dc2f8',
        borderWidth:1,
        marginTop: 15
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    textSignUp:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4dc2f8'
    },
    socialLoginWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        flex: 1,
    },
    socialLogin: {
        width: 50,
        height: 50,
        borderRadius: 50,
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 1,
        borderColor: '#00274d',
        marginRight: 10,
        marginLeft: 10,
        backgroundColor: 'white'
        
    },
    socialLoginText:{
        
        justifyContent:'center',
        textAlign:'center',
        color: '#009bd1'
    },
    errorMessage:{
        color: 'red'
    }
});

export default LoginScreen;