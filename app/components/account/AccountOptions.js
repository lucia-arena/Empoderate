import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ListItem } from "react-native-elements";
import { map } from "lodash";
import Modal from "../Modals";
import ChangeDisplayNameForm from "./ChangeDisplayNameForm";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";

export default function AccountOptions(props) {
  const { userInfo, toastRef, setreloadUserInfo } = props;
  const [showModal, setshowModal] = useState(false);
  const [renderComponent, setrenderComponent] = useState(null);

  const selectComponent = (key) => {
    switch (key) {
      case "displayName":
        setrenderComponent(
          <ChangeDisplayNameForm
            email={userInfo.email}
            displayName={userInfo.displayName}
            //para poder cerrar el modal desde dentro
            setshowModal={setshowModal}
            toastRef={toastRef}
            setreloadUserInfo={setreloadUserInfo}
          />
        );
        setshowModal(true);
        break;
      case "email":
        setrenderComponent(
          <ChangeEmailForm
            email={userInfo.email}
            //para poder cerrar el modal desde dentro
            setshowModal={setshowModal}
            toastRef={toastRef}
            setreloadUserInfo={setreloadUserInfo}
          />
        );
        setshowModal(true);
        break;
      case "password":
        setrenderComponent(
          <ChangePasswordForm
            setshowModal={setshowModal}
            toastRef={toastRef}
            //el reloaduser no hace falta porque no la mostramos por pantalla
          />
        );
        setshowModal(true);
        break;
      default:
        setrenderComponent(null);
        break;
    }
  };

  const menuOptions = generateOptions(selectComponent);

  return (
    <View>
      {map(menuOptions, (menu, index) => (
        <ListItem
          key={index}
          title={menu.title}
          leftIcon={{
            type: menu.iconType,
            name: menu.iconNameLeft,
            color: menu.iconColorLeft,
          }}
          rightIcon={{
            type: menu.iconType,
            name: menu.iconNameRight,
            color: menu.iconColorRight,
          }}
          containerStyle={styles.menuItem}
          onPress={menu.onPress}
        />
      ))}

      {/* si render no es nulo renderizamos el modal */}
      {renderComponent && (
        <Modal isVisible={showModal} setIsVisible={setshowModal}>
          {renderComponent}
        </Modal>
      )}
    </View>
  );
}

function generateOptions(selectComponent) {
  return [
    {
      title: "Cambiar nombre y apellidos",
      iconType: "material-community",
      iconNameLeft: "account-circle",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectComponent("displayName"),
    },
    {
      title: "Cambiar email",
      iconType: "material-community",
      iconNameLeft: "at",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectComponent("email"),
    },
    {
      title: "Cambiar contraseña",
      iconType: "material-community",
      iconNameLeft: "lock-reset",
      iconColorLeft: "#ccc",
      iconNameRight: "chevron-right",
      iconColorRight: "#ccc",
      onPress: () => selectComponent("password"),
    },
  ];
}
const styles = StyleSheet.create({
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
});
