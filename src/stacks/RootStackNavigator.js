import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootDrawerNavigator from "./RootDrawerNavigator"

const RootStack = createNativeStackNavigator()

const RootStackNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
        <RootStack.Screen 
            name="RootDrawer"
            component={RootDrawerNavigator}
        />
    </RootStack.Navigator>
  )
}

export default RootStackNavigator



