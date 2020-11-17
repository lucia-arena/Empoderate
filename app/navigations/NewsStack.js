import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import News from "../screens/news/News";

const Stack = createStackNavigator();

export default function NewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="news"
        component={News}
        options={{ title: "Noticias" }} //es el título que aparecerá encima de la página
      />
    </Stack.Navigator>
  );
}
