import {StyleSheet, Text, View} from "react-native";
import {FlatGrid, SimpleGrid} from 'react-native-super-grid';


function EventScreen ({route}) {
    const {id, events, name} = route.params || {};

    const currentEvents = events.map((e) => (e.event));
    console.log(currentEvents)

    return (
        <View style={styles.Container}>
            <Text>The events of {name}</Text>
            <FlatGrid
                itemDimension={200}
                data={currentEvents}
                renderItem={({ item }) => (<View style={styles.EventCard}><Text>{item}</Text></View>)}
            />
        </View>
    )
}
const styles =  StyleSheet.create({
    Container: {
        flex:1,
        marginTop:"10%",
        alignItems:"center"
    },
    EventCard: {
        paddingTop: "10%",
        backgroundColor:"white",
        height:"80%"
    }
})
export default EventScreen;
