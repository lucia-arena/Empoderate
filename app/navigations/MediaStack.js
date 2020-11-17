import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Media from "../screens/media/Media";
import BooksStack from "./BooksStack";
import Documentaries from "../screens/media/Documentaries";
import Movies from "../screens/media/Movies";
import Series from "../screens/media/Series";
import Shorts from "../screens/media/Shorts";

const Stack = createStackNavigator();

export default function MediaStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="media"
        component={Media}
        options={{ title: "@Media" }} //es el título que aparecerá encima de la página
      />
      <Stack.Screen
        name="books"
        component={BooksStack}
        options={{ title: "Libros" }} //es el título que aparecerá encima de la página
      />
      <Stack.Screen
        name="documentaries"
        component={Documentaries}
        options={{ title: "Documentales" }} //es el título que aparecerá encima de la página
      />
      <Stack.Screen
        name="movies"
        component={Movies}
        options={{ title: "Películas" }} //es el título que aparecerá encima de la página
      />
      <Stack.Screen
        name="series"
        component={Series}
        options={{ title: "Series" }} //es el título que aparecerá encima de la página
      />
      <Stack.Screen
        name="shorts"
        component={Shorts}
        options={{ title: "Cortos" }} //es el título que aparecerá encima de la página
      />
    </Stack.Navigator>
  );
}
