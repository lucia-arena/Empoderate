//componente para la navegación

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
/* import { View } from "react-native"; */
import { Icon } from "react-native-elements";
/* import { createDrawerNavigator } from "@react-navigation/drawer"; */

import HomeStack from "./HomeStack";
import FavoritesStack from "./FavoritesStack";
import TopArticlesStack from "./TopArticlesStack";
import SearchStack from "./SearchStack";
import AccountStack from "./AccountStack";

const Tab = createBottomTabNavigator();
//El drawer da problemas, revisarlo
/* const Drawer = createDrawerNavigator(); */

export default function Navigation() {
  return (
    /*     <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={FavoritesStack} />
        <Drawer.Screen name="Notifications" component={SearchStack} />
      </Drawer.Navigator>
    </NavigationContainer> */
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="home"
        tabBarOptions={{
          inactiveTintColor: "#646464",
          activeTintColor: "#7C039C",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => screenOptions(route, color),
        })}
      >
        <Tab.Screen
          name="home"
          component={HomeStack}
          options={{ title: "Home" }}
        />
        <Tab.Screen
          name="favorites"
          component={FavoritesStack}
          options={{ title: "Favoritos" }}
        />
        <Tab.Screen
          name="top-articles"
          component={TopArticlesStack}
          options={{ title: "Top 5" }}
        />
        <Tab.Screen
          name="search"
          component={SearchStack}
          options={{ title: "Buscar" }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{ title: "Cuenta" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//Iconos
function screenOptions(route, color) {
  let iconName;
  switch (route.name) {
    case "home":
      iconName = "home-outline";
      break;
    case "account":
      iconName = "account-outline";
      break;
    case "favorites":
      iconName = "heart-outline";
      break;
    case "search":
      iconName = "magnify";
      break;
    case "top-articles":
      iconName = "star-outline";
      break;
  }

  return (
    <Icon type="material-community" name={iconName} size={22} color={color} />
  );
}
