//componente para el registro de usuarios
import React, { useRef } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-easy-toast";
import RegisterForm from "../../components/account/RegisterForm";

export default function Register() {
  const toastRef = useRef();
  return (
    //keyboard aware para que el teclado no se superponga con el input
    <KeyboardAwareScrollView>
      <Image
        source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
        resizeMode="contain"
        style={styles.logo}
      />
      <View style={styles.container}>
        <View style={StyleSheet.viewForm}>
          <Text style={StyleSheet.textForm}>
            <RegisterForm toastRef={toastRef} />
          </Text>
        </View>
      </View>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </KeyboardAwareScrollView>
  );
}

//CSS
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 40,
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: 150,
    marginTop: 20,
  },
  textForm: {
    width: "100%",
  },
  viewForm: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
  },
});
