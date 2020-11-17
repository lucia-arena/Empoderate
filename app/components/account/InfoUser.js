import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Avatar, Accessory } from "react-native-elements";
import * as firebase from "firebase";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

export default function InfoUser(props) {
  const {
    userInfo: { uid, photoURL, displayName, email },
    toastRef,
    setloading,
    setloadingText,
  } = props;
  //el uid es para sacar el userid y ponerselo al avatar,
  //de forma que no se renombre cada vez que un usuario sube una imagen

  //función para editar la imagen de perfil
  const changeAvatar = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    const resultPermissionCamera =
      resultPermission.permissions.cameraRoll.status;
    //si ha denegado el permiso muestro una alerta
    if (resultPermissionCamera === "denied") {
      toastRef.current.show("Es necesario aceptar los permisos de la galeria");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      //el usuario ha cancelado la selccion de imagenes
      if (result.cancelled) {
        toastRef.current.show("Has cerrado la seleccion de imagenes");
      } else {
        uploadImage(result.uri)
          .then(() => {
            updatePhotoUrl();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  //recibe la uri de la imagen
  const uploadImage = async (uri) => {
    setloadingText("Actualizando imagen");
    setloading(true);

    const response = await fetch(uri);
    const blob = await response.blob();

    //guardo los datos en firebase, el nombre de la ruta tiene que ir con back sticks
    const ref = firebase.storage().ref().child(`avatar/${uid}`);
    return ref.put(blob);
  };

  const updatePhotoUrl = () => {
    firebase
      .storage()
      .ref(`avatar/${uid}`)
      .getDownloadURL()
      .then(async (response) => {
        const update = {
          photoURL: response,
        };
        await firebase.auth().currentUser.updateProfile(update);
        setloading(false);
      })
      .catch(() => {
        toastRef.current.show("Error al actualizar el avatar.");
      });
  };
  return (
    <View style={styles.viewUserInfo}>
      <Avatar
        rounded
        source={
          photoURL
            ? { uri: photoURL }
            : {
                uri:
                  "https://firebasestorage.googleapis.com/v0/b/empoderate-c259a.appspot.com/o/avatar%2Favatar-default.jpg?alt=media&token=91b6be09-f6b8-4cec-9a1e-67f67ffae127",
              }
        }
        size="large"
        /*      onPress={changeAvatar} */
      >
        <Accessory style={styles.accessory} onPress={changeAvatar} />
      </Avatar>
      <View style={styles.personalData}>
        <Text style={styles.displayName}>
          {displayName ? displayName : "Anónimo"}
        </Text>
        <Text>{email ? email : "Social login"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  personalData: {
    marginLeft: 10,
  },
  userInfoAvatar: {
    marginRight: 20,
  },
  displayName: {
    fontWeight: "bold",
  },
  viewUserInfo: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    paddingTop: 30,
    paddingBottom: 30,
  },
  accessory: {
    borderRadius: 50,
    width: "30%",
    height: "30%",
    backgroundColor: "#7C039C",
    /*     borderStyle: "solid",
    borderColor: "#7C039C",
    borderWidth: 1, */
  },
});
