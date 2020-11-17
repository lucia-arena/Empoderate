//formulario de registro
import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import Loading from "../Loading";
import { validateEmail } from "../../utils/validations";
import { size, isEmpty } from "lodash";
import { useNavigation } from "@react-navigation/native";
import * as firebase from "firebase";

export default function RegisterForm(props) {
  const { toastRef } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formData, setformData] = useState({ defaultFormValue });
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);

  const onSubmit = () => {
    //compruebo que email, password y repeatPassword no estén vacíos
    if (
      isEmpty(formData.email) ||
      isEmpty(formData.password) ||
      isEmpty(formData.repeatPassword)
    ) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else if (!validateEmail(formData.email)) {
      //valido el correo
      toastRef.current.show("el email no es correcto");
      //compruebo que ambas contraseñas tengan la misma longitud
    } else if (formData.password !== formData.repeatPassword) {
      toastRef.current.show("las contraseñas no coinciden");
      //compruebo que las contraseñas tengan mas de 6 caracteres
    } else if (size(formData.password) < 6) {
      toastRef.current.show("la contraseña debe ser mayor a 6 caracteres");
    } else {
      //validar usuario
      setloading(true);
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then((response) => {
          //vuelvo a poner el setloading a false
          setloading(false);
          navigation.navigate("account");
        })
        //por si da error pongo el catch
        .catch(() => {
          //toast de error
          setloading(false);
          toastRef.current.show("El email ya está registrado");
        });
    }
  };

  //Recibirá el evento y el tipo de dato que se está modificando (correo, password…)
  //El e devuelve varias cosas, entre ellas "nativeElement, object, text "valor del input".
  //La key la envuelvo entre corchetes porque es dinámica, sino devolvería un texto
  //e.nativeEvent.text recupera el contenido
  const onChange = (e, type) => {
    setformData({ ...formData, [type]: e.nativeEvent.text });
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
      <Input
        placeholder="Repetir Contraseña"
        containerStyle={styles.inputForm}
        password={true}
        secureTextEntry={showRepeatPassword ? false : true}
        onChange={(e) => onChange(e, "repeatPassword")}
        rightIcon={
          <Icon
            type="material-community"
            name={showPassword ? "eye-outline" : "eye-off-outline"}
            iconStyle={styles.iconRight}
            onPress={() => setShowRepeatPassword(!showRepeatPassword)}
          />
        }
      />
      <Button
        title="Unirse"
        containerStyle={styles.btnContainerRegister}
        buttonStyle={{ backgroundColor: "#7C039C" }}
        onPress={onSubmit}
      />
      <Loading isVisible={loading} text="Registrando usuario" />
    </View>
  );
}

//CSS
function defaultFormValue() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
  };
}
const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center", //centrado vertical
    marginTop: 30,
  },
  inputForm: {
    width: "100%",
    marginTop: 20,
  },
  btnContainerRegister: {
    marginTop: 20,
    width: "95%",
    margin: "auto",
  },
  /*   btnStyle: {
    backgroundColor: "#7C039C",
  }, */
  iconRight: {
    color: "#c1c1c1",
  },
});
