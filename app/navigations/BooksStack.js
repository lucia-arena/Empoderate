import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Books from "../screens/media/Books";

const Stack = createStackNavigator();

export default function BooksStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="books"
        component={Books}
        options={{ title: "Libros" }} //es el título que aparecerá encima de la página
      />
    </Stack.Navigator>
  );
}
