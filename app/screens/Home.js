//página principal
import React from "react";
/* import { NavigationContainer } from "@react-navigation/native"; */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Icon } from "react-native-elements";
/* import { createDrawerNavigator } from "@react-navigation/drawer"; */
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";

const heightScreen = Dimensions.get("window").width;
const heightCarrousel = heightScreen / 2;

const Tab = createBottomTabNavigator();
/* const Drawer = createDrawerNavigator(); */

export default function Home() {
  const navigation = useNavigation();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.carrousel}>
        <Text style={styles.carrouselText}>
          TU VALÍA NO DEPENDE DE TU FÍSICO, DEJA DE COMPRAR EL MENSAJE.{" "}
          {/* carrousel con frases motivadoras, aún por desarrollar */}
        </Text>
      </View>
      <View style={styles.columnas}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("landmarks")}
          >
            <Text style={styles.buttonText}>REFERENTES</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("assistance")}
          >
            <Text style={styles.buttonText}>AYUDAS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("media")}
          >
            <Text style={styles.buttonText}>@MEDIA</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("megusta")}
          >
            <Text style={styles.buttonText}>MEGUSTA</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            backgroundColor="white"
            style={styles.button}
            onPress={() => navigation.navigate("schedule")}
          >
            <Text style={styles.buttonText}>EVENTOS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            backgroundColor="white"
            style={styles.button}
            onPress={() => navigation.navigate("initiatives")}
          >
            <Text style={styles.buttonText}>INICIATIVAS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            backgroundColor="white"
            style={styles.button}
            onPress={() => navigation.navigate("complaints")}
          >
            <Text style={styles.buttonText}>DENUNCIAS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            backgroundColor="white"
            style={styles.button}
            onPress={() => navigation.navigate("news")}
          >
            <Text style={styles.buttonText}>NOTICIAS </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

//CSS
const styles = StyleSheet.create({
  carrousel: {
    flex: 1,
    /* alignItems: "baseline", */
    backgroundColor: "#995DB5",
    height: heightCarrousel,
    width: "88%",
    marginLeft: "6%",
    marginTop: "10%",
  },
  carrouselText: {
    flex: 1,
    marginTop: 100,
    textAlign: "center",
    color: "#fff",
    margin: "auto",
    paddingRight: 10,
    paddingLeft: 10,
  },
  buttonText: {
    color: "#fff",
    margin: "auto",
  },
  button: {
    backgroundColor: "#7C039C",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "5%",
    padding: 10,
    width: 180,
    height: 70,
    marginBottom: 10,
    borderRadius: 10,
  },
  columnas: {
    flex: 1,
    marginTop: "10%",
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "column",
  },
});

//iconos navigation
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
