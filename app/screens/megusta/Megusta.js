//Pensar un nombre para el componente. Cosas positivas para poner en valor
//sobre el feminismo. El usuario logueado puede agregar tarjetas, con una
//imagen (opcional), un título, una descripción y respoonsable de la acción
//que quiere poner en valor. Tanto usuarios registrados como visitantes
//pueden reportar contenido inapropiado.
import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";

export default function Megusta(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);

  //si el usuario está logueado recibe toda la info de userInfo, sino recibe un null
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);
  return (
    <View style={styles.viewBody}>
      <Text>Megusta</Text>

      {/* si user existe renderiza icon, sino nada */}
      {user && (
        <Icon
          reverse
          type="material-community"
          name="plus"
          color="#7C039C"
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("add-megusta")}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
  },
  btnContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
  },
});
