import {StyleSheet, Text, View} from "react-native";
import {FlatGrid, SimpleGrid} from 'react-native-super-grid';
import EventOverviewCard from "../components/event/EventOverviewCard";
import { LinearGradient } from 'expo-linear-gradient';


function EventScreen ({route}) {
    const {id, events, name} = route.params || {};

    const currentEvents = events.map((e) => (e));
    console.log(currentEvents)

    return (
        <View style={styles.Container}>
            <Text style={styles.Title}>The events of {name}</Text>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(26,29,46,1)', 'rgba(75,116,168,1)']}
                style={styles.background}
            >
            <FlatGrid style={styles.List}
                itemDimension={200}
                data={currentEvents}
                      renderItem={({ item }) => (<EventOverviewCard title={item.event} description={item.description} date={item.date} begin={item.begin_time} end={item.end_time} img={item.image_url}> </EventOverviewCard>)}
            />
            </LinearGradient>
        </View>
    )
}
const styles =  StyleSheet.create({
    Container: {
        flex:1,
        marginBottom:"5%",
        backgroundColor:"#2e517e",
        alignItems:"center"
    },

    Title:{
      fontSize:"24%",
        color:"white"
    }
})
export default EventScreen;
