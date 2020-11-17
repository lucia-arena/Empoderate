import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  Dimensions,
} from "react-native";
import {
  Icon,
  Avatar,
  Image,
  Input,
  Button,
  Accessory,
} from "react-native-elements";
import { map, size, filter } from "lodash";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import uuid from "random-uuid-v4";
import Modal from "../Modals";

import { firebaseApp } from "../../utils/firebase";
import firebase from "firebase/app";
import "firebase/storage";

const widthScreen = Dimensions.get("window").width;

export default function AddMegustaForm(props) {
  const { toastRef, navigation, setIsLoading } = props;
  const [megustaName, setMegustaName] = useState("");
  const [megustaAddress, setMegustaAddress] = useState("");
  const [megustaDescription, setmegustaDescription] = useState("");
  //estado para almacenar hasta 5 imagenes, inicializa como un array de imágenes vacío
  const [imageSelected, setImageSelected] = useState([]);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationMegusta, setLocationMegusta] = useState(null);

  const addMegusta = () => {
    if (!megustaName || !megustaAddress || !megustaDescription) {
      toastRef.current.show("Todos los campos del formulario son obligatorios");
      /* } else if (size(imagesSelected) === 0) {
      toastRef.current.show("Tiene que tener almenos una foto"); */
    } else if (!locationMegusta) {
      toastRef.current.show("Tienes que localizar el evento en el mapa");
    } else {
      console.log("ok");
      uploadImageStorage();
    }
  };

  //para subir las fotos del evento a firebase, recibe el imageSelected (el array de imágenes), se ejecuta cuando el formulario está correcto
  const uploadImageStorage = async () => {
    console.log(imageSelected);
    const imageBlob = [];
    map(imageSelected, async (image) => {
      const response = await fetch(image);
      const blob = await response.blob();
      const ref = firebase.storage().ref("megusta").child(uuid());
      await ref.put(blob).then(async (result) => {
        await firebase
          .storage()
          .ref(`restaurants/${result.metadata.name}`)
          .getDownloadURL()
          .then((photoUrl) => {
            imageBlob.push(photoUrl);
          });
      });
    });
  };

  return (
    <ScrollView style={styles.scrollView}>
      {imageSelected[0] ? (
        <ImageMegusta imagenMegusta={imageSelected[0]} />
      ) : (
        <Image
          source={require("../../../assets/img/no-image.png")}
          style={{
            opacity: 0.3,
            width: widthScreen,
            height: 200,
            marginTop: 10,
            marginBottom: 10,
          }}
        />
      )}

      <FormAdd
        setMegustaName={setMegustaName}
        setMegustaAddress={setMegustaAddress}
        setmegustaDescription={setmegustaDescription}
        setIsVisibleMap={setIsVisibleMap}
        locationMegusta={locationMegusta}
      />
      <UploadImage
        toastRef={toastRef}
        setImageSelected={setImageSelected}
        imageSelected={imageSelected}
      />
      <Button
        title="Aceptar"
        onPress={addMegusta}
        buttonStyle={styles.btnAddMegusta}
      />
      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        setLocationMegusta={setLocationMegusta}
        toastRef={toastRef}
      />
    </ScrollView>
  );
}

function ImageMegusta(props) {
  //recibe el index 0 del array de imágenes
  const { imagenMegusta } = props;

  return (
    <View style={styles.viewPhoto}>
      <Image
        source={{ uri: imagenMegusta }}
        style={{ width: widthScreen, height: 200 }}
      />
    </View>
  );
}

//componente para gestionar el mapa
function Map(props) {
  const { isVisibleMap, setIsVisibleMap, setLocationMegusta, toastRef } = props;
  const [location, setLocation] = useState(null);

  useEffect(() => {
    //debe esperar a que le devuelva la localización para continuar. Función anónima asíncrona autoejecutable
    (async () => {
      const resultPermissions = await Permissions.askAsync(
        Permissions.LOCATION
      );
      const statusPermissions = resultPermissions.permissions.location.status;
      //si el usuario deniega los permisos:

      if (statusPermissions !== "granted") {
        toastRef.current.show(
          "Tienes que aceptar los permisos de localizacion para crear un restaurante",
          3000
        );
      } else {
        //Hay que esperar a que la api devuelva la localización del equipo
        const loc = await Location.getCurrentPositionAsync({});
        console.log(loc);
        setLocation({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
      }
    })();
  }, []);
  const confirmLocation = () => {
    setLocationMegusta(location);
    toastRef.current.show("Localización guardada correctamente");
    setIsVisibleMap(false); //cierro el modal
  };
  return (
    <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
      <View>
        {location && (
          <MapView
            style={styles.mapStyle}
            initialRegion={location}
            showsUserLocation={true}
            onRegionChange={(region) => setLocation(region)} //para que el marker se mueva por el mapa
          >
            <MapView.Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              draggable //se puede mover el marcador
            />
          </MapView>
        )}
        <View style={styles.viewMapBtn}>
          <Button
            title="Guardar"
            containerStyle={styles.viewMapBtnContainerSave}
            buttonStyle={styles.viewMapBtnSave}
            onPress={confirmLocation}
          />
          <Button
            title="Cerrar"
            containerStyle={styles.viewMapBtnContainerCancel}
            buttonStyle={styles.viewMapBtnCancel}
            onPress={() => setIsVisibleMap(false)} //cierra el modal
          />
        </View>
      </View>
    </Modal>
  );
}

//componente para gestionar el formulario
function FormAdd(props) {
  const {
    setMegustaName,
    setMegustaAddress,
    setmegustaDescription,
    setIsVisibleMap,
    locationMegusta,
  } = props;
  return (
    <View style={styles.viewForm}>
      <Input
        placeholder="Agregar elemento"
        containerStyle={styles.input}
        onChange={(e) => setMegustaName(e.nativeEvent.text)}
      />
      <Input
        placeholder="Localización"
        containerStyle={styles.input}
        onChange={(e) => setMegustaAddress(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "google-maps",
          color: locationMegusta ? "#00a680" : "#c2c2c2",
          onPress: () => setIsVisibleMap(true),
        }}
      />
      <Input
        placeholder="Descripción"
        multiline={true}
        inputContainerStyle={styles.textArea}
        onChange={(e) => setmegustaDescription(e.nativeEvent.text)}
      />
    </View>
  );
}

function UploadImage(props) {
  const { toastRef, setImageSelected, imageSelected } = props;
  //es asincrona, el usuario va a tener que esperar a que se cargue la imagen
  const imageSelect = async () => {
    const resultPermissions = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    ); //Espera a que el usuario de permiso para continuar

    if (resultPermissions === "denied") {
      toastRef.current.show(
        "Es necesario aceptar los permisos de la galeria, si los has rechazado tienes que ir ha ajustes y activarlos manualmente.",
        3000 //estará 3 segundos visible
      );
    } else {
      //esperamos a que el usuario seleccione una imagen para poder continuar con la ejecución del código
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
      if (result.cancelled) {
        toastRef.current.show(
          "Has cerrado la galería sin seleccionar ninguna imagen",
          2000
        );
      } else {
        //cojo el estado actual del array de imagenes y le añado el nuevo valor.
        setImageSelected([...imageSelected, result.uri]);
      }
    }
  };

  //función para eliminar las imágenes cargadar por el usuario
  const removeImage = (image) => {
    //limpio la imagen que me llega de arrayImages, y luego seteo el resultado con setImageSelected
    const arrayImages = imageSelected;
    console.log("hola");
    Alert.alert(
      "Eliminar imagen",
      "¿Estas seguro de que quieres eliminar la imagen?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Aceptar",
          onPress: () => {
            setImageSelected(
              filter(arrayImages, (imageUrl) => imageUrl !== image)
            );
          },
        },
        //filter devuelve todas las imágenes del array arrayImages, menos la que le hemos pasado, image. Por cada iteracion me devuelve la imageUrl siempre y cuando sea diferente a la actual
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.viewImage}>
      {/*  devuelve cuantos elementos tiene imageSelected, solo si es menor a 4, 
      muestra el icono que permite seguir seleccionando*/}
      {size(imageSelected) < 3 ? (
        <Icon
          type="material-community"
          name="camera"
          color="#7a7a7a"
          containerStyle={styles.containerIcon}
          onPress={imageSelect}
        />
      ) : (
        <Icon
          type="material-community"
          name="camera"
          color="#d9d9d9"
          containerStyle={styles.containerIcon}
        />
      )}

      {/* Por cada iteracion me devuelve imageMegusta que devuelve un avatar*/}
      {map(imageSelected, (imagenMegusta, index) => (
        <Avatar
          key={index}
          style={styles.miniatureStyle}
          source={{ uri: imagenMegusta }}
        >
          <Accessory
            type="material-community"
            color="#848484"
            name="window-close"
            style={styles.accessory}
            onPress={() => removeImage(imagenMegusta)}
          />
        </Avatar>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    height: "100%",
  },
  viewForm: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    marginBottom: 10,
  },
  textArea: {
    height: 80,
    width: "100%",
    padding: 0,
    margin: 0,
  },
  btnAddMegusta: {
    backgroundColor: "#7C039C",
    margin: 20,
  },
  viewImage: {
    flexWrap: "wrap",
    flexDirection: "row",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  containerIcon: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    height: 70,
    width: 70,
    backgroundColor: "#e3e3e3",
  },
  miniatureStyle: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  accessory: {
    height: 25,
    width: 25,
    borderRadius: 50,
    backgroundColor: "#e3e3e3",
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20,
  },
  mapStyle: {
    width: "100%",
    height: 540,
  },
  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  viewMapBtnContainerCancel: {
    paddingLeft: 5,
  },
  viewMapBtnCancel: {
    backgroundColor: "#a60d0d",
    width: 100,
  },
  viewMapBtnContainerSave: {
    paddingRight: 5,
  },
  viewMapBtnSave: {
    backgroundColor: "#00a680",
    width: 100,
  },
});
