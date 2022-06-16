import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();

// Componentes que se usaran en las rutas
import HomeScreen from "../screens/HomeScreen";
import HomeUser from "../screens/User/HomeUser";
import AddUser from "../screens/User/AddUser";
import UpdateUser from "../screens/User/UpdateUser";
import HomeCar from "../screens/Car/HomeCar";
import AddCar from "../screens/Car/AddCar";
import UpdateCar from "../screens/Car/UpdateCar";
import HomeTreatment from "../screens/Treatment/HomeTreatment";
import AddTreatment from "../screens/Treatment/HomeTreatment";
import UpdateTreatment from "../screens/Treatment/Treatment";
import HomeSupply from "../screens/Supply/HomeSupply";
import AddSupply from "../screens/Supply/AddSupply";
import UpdateSupply from "../screens/Supply/UpdateSupply";
import HomeReplacement from "../screens/Replacement/HomeReplacement";
import AddReplacement from "../screens/Replacement/AddReplacement";
import UpdateReplacement from "../screens/Replacement/UpdateReplacement";
import DetailedList from "../screens/DetailedList/DetailedList";

// Componentes de rutas que especifica qué nombre de ruta referenciará a cada componente
const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: "Home",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="HomeUser"
          component={HomeUser}
          options={{
            title: "HomeUser",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddUser"
          component={AddUser}
          options={{
            title: "AddUser",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateUser"
          component={UpdateUser}
          options={{
            title: "UpdateUser",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="HomeCar"
          component={HomeCar}
          options={{
            title: "HomeCar",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddCar"
          component={AddCar}
          options={{
            title: "AddCar",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateCar"
          component={UpdateCar}
          options={{
            title: "UpdateCar",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="HomeTreatment"
          component={HomeTreatment}
          options={{
            title: "HomeTreatment",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddTreatment"
          component={AddTreatment}
          options={{
            title: "AddTreatment",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateTreatment"
          component={UpdateTreatment}
          options={{
            title: "UpdateTreatment",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="HomeReplacement"
          component={HomeReplacement}
          options={{
            title: "HomeReplacement",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddReplacement"
          component={AddReplacement}
          options={{
            title: "AddReplacement",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateReplacement"
          component={UpdateReplacement}
          options={{
            title: "UpdateReplacement",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="HomeSupply"
          component={HomeSupply}
          options={{
            title: "HomeSupply",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="AddSupply"
          component={AddSupply}
          options={{
            title: "AddSupply",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="UpdateSupply"
          component={UpdateSupply}
          options={{
            title: "UpdateSupply",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="DetailedList"
          component={DetailedList}
          options={{
            title: "DetailedList",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};
// exportar componente
export default RootStack;
