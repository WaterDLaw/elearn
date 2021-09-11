import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, Pressable    } from 'react-native'

import {FlatList, NativeBaseProvider, Box, Center, Button, Flex, Menu, Modal} from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTopic, fetchTopics } from '../../features/topic/topicSlice'
import { selectTopics } from '../../features/topic/topicSlice'
import { selectUserUid } from '../../features/user/userSlice'
import Ionicons from '@expo/vector-icons/Ionicons'
import { isFulfilled } from '@reduxjs/toolkit'


const IndexTopicScreen = ({navigation}) => {

    const dispatch = useDispatch()
    const uid = useSelector(selectUserUid)
    const topics = useSelector(selectTopics)

    // Local State for Modal
    const [showModal, setShowModal] = useState(false)

    const createTopic = () => {
        console.log("createTopic")
        navigation.navigate ('CreateTopic')
    }

    const data = [
      {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
      },
      {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
      },
      {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
      },
    ]

    useEffect(() => {
        // fetch the topics

        dispatch(
            fetchTopics(uid)
        ).then((data)=>{
          console.log(data)
          console.log("inside promise of dispatch")
        })
        console.log("topics index")
        console.log(topics)
    }, [dispatch])

    // Have to config to be able to use lineargradient
    const config = {
      dependencies: {
        'linear-gradient': require('expo-linear-gradient').LinearGradient
      }
    }

        // This view contains a create Button
    // A list with all the Topics you own
    return (
      <NativeBaseProvider config={config}>
        <View>
          <FlatList
            data={topics}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Center>
                <TouchableOpacity style={{alignSelf: 'stretch'}} onPress={() => navigation.navigate('ShowTopic', { screen: 'Topic', params: {topic: item}})}>        
                  <Center>
                  <Box px={2} py={6} rounded="lg" my={2} w='90%'
                    bg={{
                      linearGradient: {
                        colors: ["lightBlue.200", "blue.300"],
                        start: [0, 0],
                        end: [1, 0],
                      },
                    }}
                    _text={{
                      fontSize: "md",
                      fontWeight: "bold",
                      color: "black",
                    }}
                    
                  >
                    <Flex direction="row" align="flex-start" justifyContent="space-between">
                      <Box>
                        {item.title}
                        {item.subject}
                      </Box>
                      <Box justifyContent="flex-end" >
                          <Menu
                            trigger={(triggerProps) => {
                              return (
                                <Pressable {...triggerProps}>
                                  <Ionicons size={28} color="black" name="ellipsis-vertical-outline" />
                                </Pressable>
                              )
                            }}
                          >
                            <Menu.Item onPress={()=> navigation.navigate('EditTopic', {item: item})}>Edit</Menu.Item>
                            <Menu.Item onPress={()=> setShowModal(true)}>Delete</Menu.Item>

                          </Menu>
                          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                              <Modal.Content>
                              <Modal.CloseButton />
                                <Modal.Header>Delete Subject</Modal.Header>
                                <Modal.Body>Are you sure you wanna delete {item.title}</Modal.Body>
                                <Modal.Footer>
                                  <Button.Group variant="ghost" space={2}>
                                    <Button onPress={()=> {
                                      console.log("Noo")
                                      setShowModal(false)
                                    }}
                                      >No</Button>
                                    <Button onPress={()=> {
                                      console.log("Yes")
                                      console.log(uid)
                                      dispatch(
                                        deleteTopic({
                                          uid: uid,
                                          topicId: item.id
                                        })
                                      )
                                      setShowModal(false)
                                    }}
                                      >Yes</Button>
                                  </Button.Group>

                                </Modal.Footer>
                              </Modal.Content>
                            </Modal>
                      </Box>
                    </Flex>
 
                    
                  
                  </Box>
                  </Center>
                </TouchableOpacity>
              </Center>
            )}
            keyExtractor={(item) => item.id}
          />
          <Center>
            <Button w='70%' title="New Topic" onPress={createTopic}>Create Topic</Button>
          </Center>
        </View>
      </NativeBaseProvider>
    )

}




const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#4287f5',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius: 10
  
    },
    title: {
      fontSize: 20,
      color: '#ffffff'
    },
  });

export default IndexTopicScreen
