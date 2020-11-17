import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Landmarks from "../screens/landmarks/Landmarks";

const Stack = createStackNavigator();

export default function LandmarksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="landmarks"
        component={Landmarks}
        options={{ title: "Referentes" }} //es el título que aparecerá encima de la página
      />
    </Stack.Navigator>
  );
}
