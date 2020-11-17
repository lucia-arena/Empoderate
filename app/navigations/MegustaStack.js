import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Megusta from "../screens/megusta/Megusta";
import AddMegusta from "../screens/megusta/AddMegusta";

const Stack = createStackNavigator();

export default function MegustaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="megusta"
        component={Megusta}
        options={{ title: "Megusta" }} //es el título que aparecerá encima de la página
      />
      <Stack.Screen
        name="add-megusta"
        component={AddMegusta}
        options={{ title: "Añadir nuevo megusta" }}
      />
    </Stack.Navigator>
  );
}
