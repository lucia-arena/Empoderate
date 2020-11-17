import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Complaints from "../screens/complaints/Complaints";

const Stack = createStackNavigator();

export default function ComplaintsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="complaints"
        component={Complaints}
        options={{ title: "Denuncias" }} //es el título que aparecerá encima de la página
      />
    </Stack.Navigator>
  );
}
