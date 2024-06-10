import BottomTabNavigator from "@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator";
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import OverviewScreen from "./src/screens/OverviewScreen";
import {NavigationContainer} from "@react-navigation/native";

export default function App() {
  const Tab = createBottomTabNavigator();
  return (
   <NavigationContainer>
     <StatusBar/>
      <Tab.Navigator>
        <Tab.Screen name={"Home"} component={HomeScreen}/>
        <Tab.Screen name={"Overview"} component={OverviewScreen}/>
      </Tab.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
