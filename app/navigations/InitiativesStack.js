import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Initiatives from "../screens/initiatives/Initiatives";

const Stack = createStackNavigator();

export default function InitiativesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="initiatives"
        component={Initiatives}
        options={{ title: "Iniciativas" }} //es el título que aparecerá encima de la página
      />
    </Stack.Navigator>
  );
}
