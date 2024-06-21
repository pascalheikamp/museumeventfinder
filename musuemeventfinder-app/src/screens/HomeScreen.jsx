import {Pressable, StyleSheet, Text, View} from "react-native";
import {useState, useEffect, useRef} from "react";
import MapView, {Marker} from "react-native-maps";
import * as Location from 'expo-location';

const HomeScreen = ({navigation, route}) => {
    const {longitude, latitude} = route.params || {};
    const mapRef = useRef(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            const newData = {latitude:latitude}
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }
    useEffect(() => {
        if (latitude && longitude) {
            setLocation((prevRegion) => ({
                ...prevRegion,
                latitude,
                longitude,
            }));
        }

        if(mapRef.current) {
            mapRef.current.animateToRegion(location, 1000)
        }
    }, [latitude, longitude]);
    //
    return (
        <View style={styles.container}>
            {location ? (
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    // onRegionChangeComplete={(location) => setLocation(location)}
                    Region={{
                        latitude: longitude && latitude === undefined ?location.coords.latitude : latitude,
                        longitude: longitude && latitude === undefined ?location.coords.latitude : longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >
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