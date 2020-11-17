import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TopArticles from "../screens/TopArticles";

const Stack = createStackNavigator();

export default function TopArticlesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="top-articles"
        component={TopArticles}
        options={{ title: "Top 5" }} //es el título que aparecerá encima de la página
      />
    </Stack.Navigator>
  );
}
