import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Button } from "react-native-elements";
import * as firebase from "firebase";

export default function ChangeDisplayNameForm(props) {
  const { displayName, setshowModal, toastRef, setreloadUserInfo } = props;
  const [newDisplayName, setnewDisplayName] = useState(null);
  const [error, seterror] = useState(null);
  const [isloading, setisloading] = useState(false);

  //el submit enviará el formulario con el nombre nuevo
  const onSubmit = () => {
    //limpio el error
    seterror(null);
    if (!newDisplayName) {
      seterror("El nombre no puede estar vacío");
    } else if (displayName === newDisplayName) {
      seterror("El nombre no puede ser igual al actual");
    } else {
      //muestro el loading mientras se cambia el nombre
      setisloading(true);
      //creo el objeto que le pasaré luego a updateProfile para que se actualice
      const update = {
        displayName: newDisplayName,
      };
      firebase
        .auth()
        .currentUser.updateProfile(update)
        .then(() => {
          console.log("ok");
          setisloading(false);
          setreloadUserInfo(true);
          setshowModal(false);
        })
        .catch(() => {
          seterror("Error al actualizar el nombre");
          setisloading(false);
        });
    }
  };

  return (
    <View style={styles.view}>
      <Input
        placeholder="Nombre y apellido"
        containerStyle={styles.input}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        //cambio los valores del input:
        //si display viene con algo lo pinta, y sino pinta un string vacío
        defaultValue={displayName || ""}
        //el onchange va a devolver el evento
        onChange={(e) => setnewDisplayName(e.nativeEvent.text)}
        errorMessage={error}
      />
      <Button
        title="Cambiar nombre"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={onSubmit}
        loading={isloading}
      />
    </View>
  );
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
    backgroundColor: "#7C039C",
  },
  btn: {
    backgroundColor: "#7C039C",
  },
});
