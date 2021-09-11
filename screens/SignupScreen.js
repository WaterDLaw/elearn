import React, {useEffect, useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Image, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import * as yup from 'yup';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import {createUser} from '../features/user/userSlice';
import * as Animatable from 'react-native-animatable';
//formik
import { Formik, Form } from 'formik';

//firebase


// Form validation
const validationSchema = yup.object().shape({
    email: yup.string().label('Email').email().required(),
    password: yup.string().label('Password').required(),
    repeatPassword: yup.string().label('repeatPassword').required()
})

// The Screen itself
const SignupScreen = ({navigation})=>{

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

    const user = useSelector((state) => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        // Update the document title using the browser API
        console.log("USEEFFECT")
      });

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
                        
                        dispatch(
                            createUser({
                                email: values.email,
                                password: values.password
                            })
                        )

                    }}
                    validationSchema={validationSchema}
                >
                    {formikProps =>(
                        <View style={styles.footer}>
                            {/** Email Textinput */}
                            <Text style={styles.text_footer}>E-MAIL</Text>
                            <View style={styles.action}>
                                <Ionicons name="person-outline" size={25}/>
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Your Email"
                                    onChangeText={formikProps.handleChange('email')}
                                    error={formikProps.errors.email}
                                    errorMessage={formikProps.errors.email ? formikProps.errors.email : undefined}
            
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
                                    onChangeText={formikProps.handleChange('password')}
                                    error={formikProps.errors.password}
                                    errorMessage={formikProps.errors.password ? formikProps.errors.password : undefined}
                                />
                                <Ionicons name={passwordIcon} size={25} color="grey"
                                    onPress={passwordVisabilityHandler}
                                />
                            </View>
                            {/** Password Textinput repeat*/}
                            <Text style={[styles.text_footer,{marginTop:35}]}>REPEAT PASSWORD</Text>
                            <View style={styles.action}>
                                <Ionicons name="key-outline" size={25} />
                                <TextInput
                                    secureTextEntry={visiblePassword}
                                    style={styles.textInput}
                                    placeholder="Repeat Password"
                                    onChangeText={formikProps.handleChange('repeatPassword')}
                                    error={formikProps.errors.repeatPassword}
                                    errorMessage={formikProps.errors.repeatPassword ? formikProps.errors.repeatPassword : undefined}
                                />
                                <Ionicons name={passwordIcon} size={25} color="grey"
                                    onPress={passwordVisabilityHandler}
                                />
                            </View>
                            {/**  SignIn and Login Button*/}
                 
                            <View style={styles.button}>
                                <TouchableOpacity onPress={formikProps.handleSubmit} style={{width: '100%'}}>
                                    <LinearGradient
                                        colors={['#5db8fe', '#39cff2']}
                                        style={styles.signIn}
                                    >
                                        <Text style={styles.textSign}>
                                            Sign Up
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>

               
                            </View>
                           
                        </View>
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
    /*
    return(
        <Formik 
            initialValues={{
                email:'',
                password: ''
            }}
            onSubmit={(values)=>{
                dispatch(
                    createUser({
                        email: values.email,
                        password: values.password
                    })
                )
            }}
            validationSchema={validationSchema}
        >
            {formikProps =>(
                <View>
                    <Input
                        placeholder="Email"
                        onChangeText={formikProps.handleChange('email')}
                        error={formikProps.errors.email}
                        errorMessage={formikProps.errors.email ? formikProps.errors.email : undefined}
 
                    />
                    
                    <Input
                        placeholder="Password"
                        onChangeText={formikProps.handleChange('password')}
                        error={formikProps.errors.password}
                        errorMessage={formikProps.errors.password ? formikProps.errors.password : undefined}
                    />
                    <Input
                        placeholder="Repeat password"
                        onChangeText={formikProps.handleChange('repeatPassword')}
                        error={formikProps.errors.password}
                        errorMessage={formikProps.errors.password ? formikProps.errors.password : undefined}
                    />
                    <Button title="Submit" onPress={formikProps.handleSubmit}/>
                    <Text onPress={() => navigation.navigate ('Signup')}>Create Account</Text>
                </View>
            )}
        </Formik>
    );*/
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


export default SignupScreen;