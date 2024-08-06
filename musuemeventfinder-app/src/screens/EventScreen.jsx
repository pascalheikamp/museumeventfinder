import {FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import { FlatGrid } from 'react-native-super-grid';
import EventOverviewCard from "../components/event/EventOverviewCard";
import { LinearGradient } from 'expo-linear-gradient';
import MusuemOviewCard from "../components/musuem/MusuemOviewCard";

function EventScreen({ route }) {
    const { id, events, name } = route.params || {};

    const currentEvents = events.map((e) => (e));
    console.log(currentEvents);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>The events of {name}</Text>
            <LinearGradient
                colors={['rgba(26,29,46,1)', 'rgba(75,116,168,1)']}
                style={styles.background}
            >
                {/*<FlatGrid*/}
                {/*    itemDimension={200}*/}
                {/*    style={styles.gridView}*/}
                {/*    horizontal={false}*/}
                {/*    spacing={10}*/}
                {/*    data={currentEvents}*/}
                {/*    renderItem={({ item }) => (*/}
                {/*        <EventOverviewCard*/}
                {/*            title={item.event}*/}
                {/*            description={item.description}*/}
                {/*            date={item.date}*/}
                {/*            begin={item.begin_time}*/}
                {/*            end={item.end_time}*/}
                {/*            img={item.image_url}*/}
                {/*        />*/}
                {/*    )}*/}
                {/*    style={styles.list}*/}
                {/*/>*/}
                <FlatList style={styles.List}
                          data={currentEvents}
                          horizontal={true}
                          renderItem={({item}) => <EventOverviewCard
                              title={item.event}
                              description={item.description}
                              date={item.date}
                              begin={item.begin_time}
                              end={item.end_time}
                              img={item.image_url}
                          />}
                />
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:"100%",
        backgroundColor: "#2e517e",
        alignItems: "center"
    },
    gridView: {
        marginTop: 10,
        backgroundColor:"red",
        flex: 1,
    },
    title: {
        fontSize: 24,
        color: "white",
        marginVertical: 10
    },
    background: {
        flex: 1,
        width: '100%',
    },
    list: {
        flex: 1,
        width: '100%',
    }
});

export default EventScreen;