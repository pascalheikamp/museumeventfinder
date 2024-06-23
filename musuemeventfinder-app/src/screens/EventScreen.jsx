import {StyleSheet, Text, View} from "react-native";
import {FlatGrid, SimpleGrid} from 'react-native-super-grid';


function EventScreen ({route}) {
    const {id, events, name} = route.params || {};

    const currentEvents = events.map((e) => (e.event));
    console.log(events)

    return (
        <View style={styles.Container}>
            <Text>The events of {name}</Text>
            <SimpleGrid
                itemDimension={160}
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
        backgroundColor:"white",
        height:"60%"
    }
})
export default EventScreen;
