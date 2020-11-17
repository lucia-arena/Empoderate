import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Schedule from "../screens/schedule/Schedule";

const Stack = createStackNavigator();

export default function ScheduleStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="schedule"
        component={Schedule}
        options={{ title: "Eventos" }} //es el título que aparecerá encima de la página
      />
    </Stack.Navigator>
  );
}
