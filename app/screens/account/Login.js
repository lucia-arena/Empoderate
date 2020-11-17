import React, { useRef } from "react";
import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-easy-toast";
import LoginForm from "../../components/account/LoginForm";

//componente de login
export default function Login() {
  const toastRef = useRef();
  return (
    <ScrollView>
      <Image
        source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
        resizeMode="contain"
        style={style.logo}
      />
      <View style={style.ViewContainer}>
        {/* le paso el toastRef por props */}
        <LoginForm toastRef={toastRef} />
        <CreateAccount />
      </View>
      <Divider style={style.divider} />
      <Text>Social Login</Text>
      <Toast ref={toastRef} position="center" opacity={0.9} />
    </ScrollView>
  );
}

//función que pondré debajo del login form
function CreateAccount() {
  const navigation = useNavigation();
  return (
    <Text style={style.textRegister}>
      ¿Aún no tienes una cuenta?{" "}
      <Text
        style={style.btnRegister}
        onPress={() => navigation.navigate("register")}
      >
        Regístrate
      </Text>
    </Text>
  );
}

//CSS
const style = StyleSheet.create({
  logo: {
    width: "100%",
    height: 150,
    marginTop: 70,
  },
  ViewContainer: {
    marginRight: 40,
    marginLeft: 40,
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  btnRegister: {
    color: "#7C039C",
    fontWeight: "bold",
  },
  divider: {
    backgroundColor: "#7C039C",
    margin: 40,
  },
});
