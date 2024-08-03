import {ScrollView, StyleSheet, Text, View} from "react-native";
import { FlatGrid } from 'react-native-super-grid';
import EventOverviewCard from "../components/event/EventOverviewCard";
import { LinearGradient } from 'expo-linear-gradient';

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
                <ScrollView style={styles.scrollView}>
                <FlatGrid
                    itemDimension={150}
                    data={currentEvents}
                    renderItem={({ item }) => (
                        <EventOverviewCard
                            title={item.event}
                            description={item.description}
                            date={item.date}
                            begin={item.begin_time}
                            end={item.end_time}
                            img={item.image_url}
                        />
                    )}
                    style={styles.list}
                />
                </ScrollView>
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2e517e",
        alignItems: "center"
    },
    title: {
        fontSize: 24,
        color: "white",
        marginVertical: 10
    },
    scrollView: {
        flex: 1,
        width: '100%',
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