import React from "react";
import { View, StatusBar, Platform } from "react-native";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducer from "./reducers";
import middleware from "./middleware";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import "react-native-screens";
import Constants from "expo-constants";

import NewDeck from "./components/newDeck";
import Decks from "./components/decks";
import DeckDetail from "./components/deckDetail";
import AddCard from "./components/addCard";
import Quiz from "./components/quiz";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function StatusBaar({ backGroundColor, ...props }) {
  return (
    <View
      style={{
        backgroundColor: backGroundColor,
        height: Constants.statusBarHeight,
      }}
    >
      <StatusBar translucent backgroundColor={backGroundColor} {...props} />
    </View>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Decks"
      tabBarOptions={{
        activeTintColor: Platform.OS === "ios" ? "#000" : "#fff",
        style: {
          height: 56,
          backgroundColor: Platform.OS === "ios" ? "#fff" : "#000",
          shadowRadius: 6,
          shadowOpacity: 1,
          shadowColor: "rgba(0,0,0,0.24)",
          shadowOffset: {
            height: 3,
            width: 0,
          },
        },
      }}
    >
      <Tab.Screen
        component={Decks}
        name="Decks"
        options={{
          tabBarLabel: "Decks",
          tabBarIcon: ({ color }) => (
            <Ionicons name="ios-bookmarks" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={NewDeck}
        name="NewDeck"
        options={{
          tabBarLabel: "New Deck",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome name="plus-square" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: "#fff",
          headerStyle: {
            backgroundColor: "#000",
          },
        }}
      >
        <Stack.Screen component={Tabs} name="Home" />
        <Stack.Screen
          component={DeckDetail}
          name="DeckDetail"
          options={({ route }) => {
            const { title } = route.params;
            return {
              title,
            };
          }}
        />
        <Stack.Screen
          component={AddCard}
          name="AddCard"
          options={() => {
            return {
              title: "Add Card",
            };
          }}
        />

        <Stack.Screen
          component={Quiz}
          name="Quiz"
          options={() => {
            return {
              title: "Quiz",
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={createStore(reducer, middleware)}>
      <View style={{ flex: 1 }}>
        <StatusBaar backGroundColor={"#000"} barStyle="light-content" />
        <MyStack />
      </View>
    </Provider>
  );
}
