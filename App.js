import React, { useState, useCallback, useRef } from "react";
import { Button, View, Alert } from "react-native";
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Player from "./screens/player";
import VideoList from "./screens/videoList";

const Stack = createStackNavigator()


const App =() =>{
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="VideoList">
        <Stack.Screen
        name="VideoList"
        component={VideoList}
        options={{headerTitleAlign:'left', headerTitle:'Video List', headerTintColor:'#272822'}}
        />

        <Stack.Screen
        name="Player"
        component={Player}
        options={{headerTitleAlign:'left', headerTitle:'Player', headerTintColor:'#272822'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

