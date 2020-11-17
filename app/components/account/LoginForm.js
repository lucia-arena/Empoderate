import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Input, Icon } from "react-native-elements";
import { isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";
import { validateEmail } from "../../utils/validations";
import Loading from "../Loading";

export default function LoginForm(props) {
  const { toastRef } = props;
  //Creo el estado para mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setformData] = useState(defaultFormValue());
  const [loading, setloading] = useState(false);
  const navigation = useNavigation();

  //la función se encargará de actualizar el estado
  const onChange = (e, type) => {
    setformData({ ...formData, [type]: e.nativeEvent.text });
  };
  //esta función se ejecutará cuando envíe el formulario
  const onSubmit = () => {
    if (isEmpty(formData.email) || isEmpty(formData.password)) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      toastRef.current.show("El email no es correcto");
    } else {
      setloading(true);
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(() => {
          setloading(false);
          navigation.navigate("account");
        })
        .catch(() => {
          setloading(false);
          toastRef.current.show("Email o contraseña incorrectos");
        });
    }
  };
  return (
    <View style={styles.formContainer}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.inputForm}
        onChange={(e) => onChange(e, "email")}
        rightIcon={
          <Icon
            type="material-community"
            name="at"
            iconStyle={styles.iconRight}
          />
        }
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showPassword ? false : true}
        onChange={(e) => onChange(e, "password")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.btnContainerLogin}
        buttonStyle={styles.btnLogin}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Iniciando sesión" />
    </View>
  );
}

function defaultFormValue() {
  return { email: "", password: "" };
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%",
  },
  btnLogin: {
    backgroundColor: "#7C039C",
  },
  iconRight: {
    color: "#c1c1c1",
  },
});
