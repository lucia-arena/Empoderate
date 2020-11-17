import * as firebase from "firebase";

export function reauthenticate(password) {
  //obtengo el usuario actual logueado
  const user = firebase.auth().currentUser;
  //Pido las credenciales del usuario "user.email" con la contraseña actual
  const credentials = firebase.auth.EmailAuthProvider.credential(
    user.email,
    password
  );
  // le mando las credenciales devueltas a la funcion reauthenticate
  //si es correcto, dará un reauthenticate en la cuenta
  //sino dará error
  return user.reauthenticateWithCredential(credentials);
}
