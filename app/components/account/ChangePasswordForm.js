import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { size } from "lodash";
import * as firebase from "firebase";
import { reauthenticate } from "../../utils/Api";

export default function ChangePasswordForm(props) {
  const { setshowModal, toastRef } = props;
  const [showPassword, setshowPassword] = useState(false);
  const [showNewPassword, setshowNewPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [formData, setformData] = useState(defaultValue());
  const [error, seterror] = useState({});
  const [isloading, setisloading] = useState(false);

  //actualización de datos:
  const onChange = (e, type) => {
    //actualizo el estado
    setformData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = async () => {
    //errorTemp se ejecuta después de cerrar sesión, así que para evitar conflictos hago la validación
    let isseterror = true;
    //creo un error temporal
    let errorTemp = {};
    //limpio el error por si el formulario ya se ha enviado previamente con error
    seterror({});
    if (
      !formData.password ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      errorTemp = {
        //!formData.password solo añade el texto en caso de que formData.password esté vacío
        password: !formData.password
          ? "La contraseña no puede estar vacía"
          : "",
        newPassword: !formData.newPassword
          ? "La contraseña no puede estar vacía"
          : "",
        confirmPassword: !formData.confirmPassword
          ? "La contraseña no puede estar vacía"
          : "",
      };
    } else if (formData.newPassword !== formData.confirmPassword) {
      errorTemp = {
        confirmPassword: "Las nuevas contraseñas no coinciden",
      };
    } else if (size(formData.newPassword) < 6) {
      errorTemp = {
        newPassword: "La contraseña tiene que ser mayor a 5 caracteres.",
        confirmPassword: "La contraseña tiene que ser mayor a 5 caracteres.",
      };
    } else {
      setisloading(true); //espero a que reauthenticate se comunique con firebase
      await reauthenticate(formData.password)
        .then(async () => {
          await firebase
            .auth() //cambio la contraseña
            .currentUser.updatePassword(formData.newPassword)
            .then(() => {
              //si entra en el then es porque la contraseña se ha cambiado correctamente
              isseterror = false;
              setisloading(false);
              setshowModal(false);
              //cierro las sesión
              firebase.auth().signOut();
            })
            .catch(() => {
              errorTemp = {
                other: "Error al actualizar la contraseña",
              };
              setisloading(false);
            });
        })
        .catch(() => {
          errorTemp = {
            password: "La contraseña no es correcta",
          };
          setisloading(false);
        });
    }
    //solo se ejecutará si isseterror es true
    isseterror && seterror(errorTemp);
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Contraseña actual"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setshowPassword(!showPassword),
        }}
        onChange={(e) => onChange(e, "password")}
        errorMessage={error.password}
      />
      <Input
        placeholder="Nueva contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showNewPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showNewPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setshowNewPassword(!showNewPassword),
        }}
        onChange={(e) => onChange(e, "newPassword")}
        errorMessage={error.newPassword}
      />
      <Input
        placeholder="Repetir contraseña"
        containerStyle={styles.input}
        password={true}
        secureTextEntry={showConfirmPassword ? false : true}
        rightIcon={{
          type: "material-community",
          name: showConfirmPassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setshowConfirmPassword(!showConfirmPassword),
        }}
        onChange={(e) => onChange(e, "confirmPassword")}
        errorMessage={error.confirmPassword}
      />
      <Button
        title="Cambiar contraseña"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isloading}
      />
      <Text>{error.other}</Text>
    </View>
  );
}

function defaultValue() {
  return {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };
}

const styles = StyleSheet.create({
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginBottom: 10,
  },
  btnContainer: {
    marginTop: 20,
    width: "95%",
  },
  btn: {
    backgroundColor: "#7C039C",
  },
});
