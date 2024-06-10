import {StyleSheet, Text, View} from "react-native";

const OverviewScreen = ()=> {
    return (
        <View style={styles.Container}>
            <Text>Hello</Text>
        </View>
    )
}

export default OverviewScreen;

const styles = StyleSheet.create({
    Container: {
        flex:1,
        width:300,
        paddingBottom: 400,
        marginLeft:"auto",
        marginRight:"auto",
        backgroundColor: "white",
        justifyContent: "center",
        display: "flex"
    }
})