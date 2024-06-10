import {Pressable, StyleSheet, Text, View} from "react-native";

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.Container}>
            <View>
                <Text>dreh</Text>
            </View>
            <Text>This is the home page</Text>
            <Pressable><Text>See list of visited museums</Text></Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex:1,
        paddingBottom: 400,
        backgroundColor: "white",
        justifyContent: "center",
        display: "flex"
    }
})

export default HomeScreen