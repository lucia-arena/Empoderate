import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Overlay } from "react-native-elements";

//Componente loading para implementar cada vez que el usuario tenga que esperar
export default function Loading(props) {
  const { isVisible, text } = props;

  return (
    //Dentro del modal Overlay meto el activityIndicator, dependiendo de la actividad cambia el comportamiento
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0, 0, 0, 0.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      <View style={styles.view}>
        <ActivityIndicator size="large" color="#7C039C" />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

//CSS
const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "#fff",
    borderColor: "#7C039C",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 210,
    marginLeft: 80,
    marginRight: 80,
    marginBottom: 210,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#7C039C",
    textTransform: "uppercase",
    marginTop: 10,
  },
});
