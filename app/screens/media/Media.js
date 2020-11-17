//componente para recomendar contenido audiovisual con mensaje feminista
//auna los links para ir a cada uno de los apartados audiovisuales
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function Media() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("books")}
      >
        <Text style={styles.buttonText}>LIBROS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("documentaries")}
      >
        <Text style={styles.buttonText}>DOCUMENTALES</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("movies")}
      >
        <Text style={styles.buttonText}>PELÍCULAS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("series")}
      >
        <Text style={styles.buttonText}>SERIES</Text>
      </TouchableOpacity>

      <TouchableOpacity
        backgroundColor="white"
        style={styles.button}
        onPress={() => navigation.navigate("shorts")}
      >
        <Text style={styles.buttonText}>CORTOS</Text>
      </TouchableOpacity>
    </View>
  );
}

//CSS
const styles = StyleSheet.create({
  buttonText: {
    color: "#fff",
    margin: "auto",
  },
  button: {
    backgroundColor: "#7C039C",
    alignItems: "center",
    paddingTop: "5%",
    padding: 10,
    width: 180,
    height: 70,
    marginBottom: 10,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

//iconos tabNavigator
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
