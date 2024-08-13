import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    Touchable,
    TouchableHighlight,
    TouchableOpacity,
    useColorScheme,
    View
} from "react-native";
import {useState, useEffect, useRef} from "react";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import * as Location from 'expo-location';
import {Accuracy} from "expo-location";
import {useTheme} from "@react-navigation/native";
import DarkLightMode from '../../assets/darklighmode-icon.png'

const HomeScreen = ({navigation, route}) => {
    const {longitude, latitude} = route.params || {};
    const mapRef = useRef(null);
    const [initialRegion, setInitialRegion] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const {dark} = useTheme();

    //Ask permission for user location and retrieve the information of the coordinates
        useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            } else {
                await Location.watchPositionAsync({accuracy: Accuracy.Balanced}, (loc) => {
                    setUserLocation({
                        longitude:longitude,
                        latitude:latitude
                    })
                })
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            });
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

        if (latitude && longitude) {
        // the longitude and latitude are used to show the location of the museum
            if(mapRef.current) {
                console.log("latitude" + latitude + "longitude " + longitude)
                mapRef.current.animateToRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }, 1000)
            }
        }

    //
    return (
        <View style={styles.container}>
            {location ? (
                <MapView
                    showsUserLocation={true}
                    ref={mapRef}
                    style={styles.map}
                    userInterfaceStyle={dark? "dark" : "light"}
                    initialRegion={initialRegion}
                >
                    <Marker coordinate={{
                        latitude: userLocation.latitude,
                        longitude: userLocation.longitude
                    }}></Marker>
                    <Marker
                        coordinate={{
                            latitude: longitude && latitude === undefined ?location.coords.latitude : latitude,
                            longitude: longitude && latitude === undefined ?location.coords.latitude : longitude,
                        }}
                        title="Your Location"
                    />
                </MapView>
            ) : (
                <Text>{text}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '100%',
        height: "100%"
    }
})

export default HomeScreen