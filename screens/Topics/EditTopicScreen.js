import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup'
import { updateTopic } from '../../features/topic/topicSlice'
import { useSelector, useDispatch } from 'react-redux';
import { selectUserUid } from '../../features/user/userSlice'
import { Input, Button, Center, NativeBaseProvider, Stack, TextArea } from "native-base"

const EditTopicScreen = ({navigation, route}) => {

    const dispatch = useDispatch();
    const userUid = useSelector(selectUserUid)

    
    const validationSchema = yup.object().shape({
        title: yup.string().label('title'),
        subject: yup.string().label('subject'),
        subSubject: yup.string().label('subSubject'),
        description: yup.string().label('description'),
    })

    useEffect(() => {
        console.log("Edit Topics")
        console.log(route)
    }, [])

    return (
        
    <NativeBaseProvider>
        <View style={styles.container}>
        <Formik 
            initialValues={{
                title: route.params.item.subject,
                subject: route.params.item.subject,
                subSubject: route.params.item.subSubject,
                description: route.params.item.description
            }}
            onSubmit={(values)=>{
                
                console.log("submit topic")
                console.log(values)
                //dispatch the createTopic Thunk
                dispatch(
                    updateTopic({
                        title: values.title,
                        subject: values.subject,
                        subsubject: values.subSubject,
                        description: values.description,
                        uid: userUid,
                        id: route.params.item.id
                    })
                , [dispatch])
                navigation.navigate('IndexTopic')

            }}
            validationSchema={validationSchema}
        >
            {({handleChange, values, handleSubmit, touched, errors, handleBlur}) =>(

 
                <View>
                    <Stack space={4}>
                    <Input
                        value={values.title}
                        name="title"
                        placeholder="Title"
                        onChangeText={handleChange('title')}
                        error={errors.title}
                        errorMessage={errors.title ? errors.title : undefined}
 
                    />
                    <Input
                        name="subject"
                        value={values.subject}
                        placeholder="Subject"
                        onChangeText={handleChange('subject')}
                        error={errors.subject}
                        errorMessage={errors.subject ? errors.subject : undefined}
 
                    />
                    <Input
                        name="subsubject"
                        value={values.subSubject}
                        placeholder="Sub-subject"
                        onChangeText={handleChange('subSubject')}
                        error={errors.subSubject}
                        errorMessage={errors.subSubject ? errors.subSubject : undefined}
 
                    />
                     <TextArea 
                        name="description"
                        value={values.description}
                        h={20} placeholder="Description" 
                        onChangeText={handleChange('description')}
                        error={errors.description}
                        errorMessage={errors.description ? errors.description : undefined}
                     
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

export default EditTopicScreen
