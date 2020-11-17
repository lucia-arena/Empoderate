import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import * as firebase from "firebase";
import UserGuest from "./UserGuest";
import UserLogged from "./UserLogged";
import Loading from "../../components/Loading";

export default function Account() {
  //inicializo el login, por defecto el usuario es null,
  //ni ha hecho el login ni ha devuelto un false
  const [login, setLogin] = useState(null);

  //Autenticación
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null)
    return (
      //Mientras el login no es ni true ni false (es null), aún
      //no se ha validado, y mientras se valida cargo el loading
      <Text>
        <Loading isVisible={true} text="Cargando..."></Loading>
      </Text>
    );
  //ternario, si el login es true, cargo el componente userLogged
  //sino cargo el componente UserGuest
  return login ? <UserLogged /> : <UserGuest />;
}
