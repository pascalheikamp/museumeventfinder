import {StyleSheet, Text, View} from "react-native";
import MuseumOverviewList from "../components/musuem/MuseumOverviewList";

const OverviewScreen = ({navigation})=> {
    return (
        <View style={styles.Body}>
        <View style={styles.Container}>
            <View style={styles.HeaderSection}>
                <Text style={styles.Title}>Museum events</Text>
            </View>
            <MuseumOverviewList navigation={navigation}/>
        </View>
        </View>
    )
}

export default OverviewScreen;

const styles = StyleSheet.create({

    Body: {
        flex:1,
    },

    HeaderSection: {
      display:"relative",
        top:60
    },

    Title: {
        fontSize:25,
        paddingLeft:10
    },
    Container: {
        paddingBottom:40,
        backgroundColor: "white",
        justifyContent: "center",
        display: "flex",
    }
})