import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { createTopic } from '../../features/topic/topicSlice'
import { useSelector, useDispatch } from 'react-redux';
import { selectUserUid } from '../../features/user/userSlice'
import { Input, Button, Center, NativeBaseProvider, Stack, TextArea } from "native-base"

const CreateTopicScreen = ({navigation}) => {

    const dispatch = useDispatch();
    const userUid = useSelector(selectUserUid)

    
    const validationSchema = yup.object().shape({
        title: yup.string().label('Title').required(),
        subject: yup.string().label('Subject').required(),
        subSubject: yup.string().label('Sub-subject').required(),
        description: yup.string().label('description'),
    })

    return (
        
    <NativeBaseProvider>
        <View style={styles.container}>
        <Formik 
            initialValues={{
                title:'',
                subject: '',
                subSubject:'',
                description: ''
            }}
            onSubmit={(values)=>{
                
                console.log("submit topic")
                console.log(values)
                //dispatch the createTopic Thunk
                dispatch(
                    createTopic({
                        title: values.title,
                        subject: values.subject,
                        subsubject: values.subSubject,
                        description: values.description,
                        uid: userUid
                    })
                , [dispatch])
                // Handle the fullfilled and rejected values
                .then((value) => {
                    if(value.type == "topic/createTopic/fulfilled"){
                        console.log("topic created")
                        navigation.navigate('IndexTopic')
                    }else{
                        console.log("rejected")
                    }
                })
                

            }}
            validationSchema={validationSchema}
        >
            {({handleChange, values, handleSubmit, touched, errors, handleBlur}) =>(

 
                <View>
                    <Stack space={4}>
                    <Input
                        placeholder="Title"
                        onChangeText={handleChange('title')}
                        error={errors.title}
                        errorMessage={errors.title ? errors.title : undefined}
 
                    />
                    <Input
                        placeholder="Subject"
                        onChangeText={handleChange('subject')}
                        error={errors.subject}
                        errorMessage={errors.subject ? errors.subject : undefined}
 
                    />
                    <Input
                        placeholder="Sub-subject"
                        onChangeText={handleChange('subSubject')}
                        error={errors.subSubject}
                        errorMessage={errors.subSubject ? errors.subSubject : undefined}
 
                    />
                     <TextArea 
                        h={20} placeholder="Description" 
                        onChangeText={handleChange('description')}
                        error={errors.description}
                        errorMessage={errors.description ? errors.subdescriptionSubject : undefined}
                     
                     />
                    
                    <Button size={"md"} onPress={handleSubmit} >
                        Create
                    </Button>

                    </Stack>

                </View>
               
            )}
        </Formik>
        </View>
        </NativeBaseProvider>
        
    )

}

const styles = StyleSheet.create({

    container: {
        backgroundColor: 'white'
    }

})

export default CreateTopicScreen
