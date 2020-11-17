import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import { validateEmail } from "../../utils/validations";
import { reauthenticate } from "../../utils/Api";
import * as firebase from "firebase";

export default function ChangeEmailForm(props) {
  const { email, setshowModal, toastRef, setreloadUserInfo } = props;
  const [formData, setformData] = useState(defaultValue());
  const [showPassword, setshowPassword] = useState(false);
  const [errors, seterrors] = useState({});
  const [isloading, setisloading] = useState(false);

  const onChange = (e, type) => {
    setformData({ ...formData, [type]: e.nativeEvent.text });
  };

  const onSubmit = () => {
    seterrors({});
    if (!formData.email || email === formData.email) {
      seterrors({
        email: "El email no se ha cambiado",
      });
    } else if (!validateEmail(formData.email)) {
      seterrors({
        email: "El email no es correcto",
      });
    } else if (!formData.password) {
      seterrors({
        password: "La contraseña no puede estar vacia.",
      });
    } else {
      setisloading(true);
      //si todo ha ido correctamente, reautentico al usuario para poder cambiarle la contraseña
      //debo pasar la que el usuario ha escrito al intentar cambiar el correo
      reauthenticate(formData.password)
        .then(() => {
          //si la autenticación ha sido correcta le paso a firebase el nuevo email
          firebase
            .auth()
            .currentUser.updateEmail(formData.email)
            .then(() => {
              setisloading(false);
              //refresco el usuario y lo cambio por pantalla
              setreloadUserInfo(true);
              toastRef.current.show("Correo actualizado correctamente");
              //cierro el modal
              setshowModal(false);
            })
            .catch(() => {
              seterrors({ email: "Error al actualizar el email." });
              setisloading(false);
            });
        })
        .catch(() => {
          setisloading(false);
          seterrors({ password: "La contraseña no es correcta." });
        });
    }
  };
  return (
    <View style={styles.view}>
      <Input
        placeholder="Correo electrónico"
        containerStyle={styles.input}
        defaultValue={email || ""}
        rightIcon={{
          type: "material-community",
          name: "at",
          color: "#c2c2c2",
        }}
        onChange={(e) => onChange(e, "email")}
        errorMessage={errors.email}
      />
      <Input
        placeholder="Contraseña"
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
        errorMessage={errors.password}
      />
      <Button
        title="Cambiar correo"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isloading}
      />
    </View>
  );
}

function defaultValue() {
  return {
    email: "",
    password: "",
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
