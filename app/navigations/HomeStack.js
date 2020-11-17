import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import LandmarksStack from "./LandmarksStack";
import ScheduleStack from "./ScheduleStack";
import AssistanceStack from "./AssistanceStack";
import InitiativesStack from "./InitiativesStack";
import MediaStack from "./MediaStack";
import ComplaintsStack from "./ComplaintsStack";
import MegustaStack from "./MegustaStack";
import NewsStack from "./NewsStack";

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="home"
        component={Home}
        options={{ title: "Home" }} //es el título que aparecerá encima de la página
      />
      <Stack.Screen
        name="landmarks"
        component={LandmarksStack}
        options={{ title: "Referentes" }} //es el título que aparecerá encima de la página
      />
      <Stack.Screen
        name="schedule"
        component={ScheduleStack}
        options={{ title: "Eventos" }} //es el título que aparecerá encima de la página
      />
      <Stack.Screen
        name="assistance"
        component={AssistanceStack}
        options={{ title: "Ayudas" }} //es el título que aparecerá encima de la página
      />
      <Stack.Screen
        name="initiatives"
        component={InitiativesStack}
        options={{ title: "Iniciativas" }} //es el título que aparecerá encima de la página
      />
      <Stack.Screen
        name="media"
        component={MediaStack}
        options={{ title: "@Media" }} //es el título que aparecerá encima de la página
      />
      <Stack.Screen
        name="complaints"
        component={ComplaintsStack}
        options={{ title: "Denuncias" }} //es el título que aparecerá encima de la página
      />
      <Stack.Screen
        name="megusta"
        component={MegustaStack}
        options={{ title: "Megusta" }} //es el título que aparecerá encima de la página
      />
      <Stack.Screen
        name="news"
        component={NewsStack}
        options={{ title: "Noticias" }} //es el título que aparecerá encima de la página
      />
    </Stack.Navigator>
  );
}
