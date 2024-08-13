import {StyleSheet, Text, useColorScheme, View} from "react-native";
import MuseumOverviewList from "../components/musuem/MuseumOverviewList";
import {useTheme} from "@react-navigation/native";

const MuseumScreen = ({navigation}) => {
    //checking if it is dark or light mode and use the color pallet for this
    const {colors} = useTheme();
    return (
        <View style={styles.Body}>
            <View style={styles.Container}>
                <View style={styles.HeaderSection}>
                    <Text style={{
                        color: colors.text, fontSize: 25,
                        paddingLeft: 10,
                    }}>Museum events</Text>
                </View>
                <MuseumOverviewList navigation={navigation}/>
            </View>
        </View>
    )
}

export default MuseumScreen;

const styles = StyleSheet.create({

    Body: {
        flex: 1,
    },

    HeaderSection: {
        display: "relative",
        top: 60
    },

    Container: {
        paddingBottom: 40,
        justifyContent: "center",
        display: "flex",
    }
})