import BottomTabNavigator from "@react-navigation/bottom-tabs/src/navigators/createBottomTabNavigator";
import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/HomeScreen";
import MuseumScreen from "./src/screens/MuseumScreen";
import {DarkTheme, DefaultTheme, NavigationContainer} from "@react-navigation/native";
import EventScreen from "./src/screens/EventScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
    const [colorTheme, setColorTheme] = useState(useColorScheme() == "light" ? DefaultTheme : DarkTheme)
    useEffect(() => {

        // retrieving the theme setting in the async storage so the settings will be applied in the applications
        async function getThemeOptions() {
            const mode = JSON.parse(await AsyncStorage.getItem("colorTheme"));
            if (typeof mode !== "undefined") {
                setColorTheme(mode ? DarkTheme : DefaultTheme)
            }
        }
        getThemeOptions();
    }, []);
    const Tab = createBottomTabNavigator();
    return (
        <NavigationContainer theme={colorTheme}>
            <StatusBar/>
            <Tab.Navigator>
                <Tab.Screen name={"Home"} component={HomeScreen}/>
                <Tab.Screen name={"Events"} component={EventScreen}/>
                <Tab.Screen name={"Museums"} component={MuseumScreen}/>
                <Tab.Screen name="Profile">
                    {(props) => <ProfileScreen  {...props} setColorTheme={setColorTheme} />}
                </Tab.Screen>
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
