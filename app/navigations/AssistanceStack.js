import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Assistance from "../screens/assistance/Assistance";

const Stack = createStackNavigator();

export default function AssistanceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="assistance"
        component={Assistance}
        options={{ title: "Ayudas" }} //es el título que aparecerá encima de la página
      />
    </Stack.Navigator>
  );
}
