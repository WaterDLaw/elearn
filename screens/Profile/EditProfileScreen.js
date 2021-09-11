import React from 'react'
import { View, Text, TextInput, Button } from 'react-native'
import { Formik } from 'formik'
import * as yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { createProfile } from '../../features/profile/profileSlice';
import { selectUserUid } from '../../features/user/userSlice';

// Form validation
const validationSchema = yup.object().shape({
    name: yup.string().label('nane').email().required(),
    age: yup.string().label('age').required(),
  
})

const EditProfileScreen = () => {

    const dispatch = useDispatch();
    const uid = useSelector(selectUserUid)

    useEffect(() => {

        

    }, dispatch)

    return (
        <Formik 
        initialValues={{
            name:'',
            age: ''
        }}
        onSubmit={(values)=>{
            
            dispatch(
                createProfile({
                    uid: uid,
                    name: values.name,
                    age: values.age
                })
            )

        }}
        validationSchema={validationSchema}
    >
        {formikProps =>(
            <View>
                <TextInput
                    placeholder="name"
                    onChangeText={formikProps.handleChange('name')}
                    error={formikProps.errors.name}
                    errorMessage={formikProps.errors.name ? formikProps.errors.name : undefined}

                />
                
                <TextInput
                    placeholder="age"
                    onChangeText={formikProps.handleChange('age')}
                    error={formikProps.errors.age}
                    errorMessage={formikProps.errors.age ? formikProps.errors.age : undefined}
                />
                
                <Button title="Submit" onPress={formikProps.handleSubmit}/>
            </View>
        )}
    </Formik>
    )
}

export default EditProfileScreen
