import React, { useEffect }  from 'react'
import { View, Text } from 'react-native'
import { Box, Flex, Center, Image, NativeBaseProvider,Button } from 'native-base'

import { useDispatch, useSelector } from 'react-redux'
import { selectTopics } from '../../features/topic/topicSlice'



const ShowTopicScreen = ({route}) => {

    useEffect(() => {
        // With nested navs we need to call params to get access to the topic
        console.log(route)

        
    }, []) 

    return (
        <NativeBaseProvider>
            <View>
                <Center>
                    <Flex>
                        <Box>
                            <Image 
                                source={require("../../assets/cards.png")}
                                resizeMode="cover"
                                alt={"Cards"}
                                size="300px"
                            />
                        </Box>
                        <Box my={10}>
                            <Center>
                                <Text>You have no cards so far.</Text>
                            </Center>
                        </Box>
                        <Box>
                            <Button onPress={()=>{console.log("create cards")}}>Create Cards</Button>
                        </Box>
                    </Flex>
                </Center>
            </View>
        </NativeBaseProvider>
    )
}

export default ShowTopicScreen
