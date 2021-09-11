import { NativeBaseProvider, View, Text } from 'native-base'
import React from 'react'

const IndexCardScreen = () => {
    return (
        <NativeBaseProvider>
            <View>
                <Text>Index Cards</Text>
            </View>
        </NativeBaseProvider>
    )
}

export default IndexCardScreen
