import {FlatList, SafeAreaView, View, TouchableHighlight, StyleSheet, Pressable} from "react-native"
import useFetch from "../../hooks/useFetch";
import MusuemOviewCard from "./MusuemOviewCard";

const MuseumOverviewList = () => {
    const museums = useFetch('https://raw.githubusercontent.com/pascalheikamp/museumeventfinder/main/musuemeventfinder-app/dutch_museum_events.json');
    const museumEvents = museums.data
    console.log(museumEvents);

    return (
        <SafeAreaView>
            <View style={styles.Container}>
                <FlatList style={styles.List}
                          data={museumEvents}
                          numColumns={1}
                          horizontal={false}
                          renderItem={({item}) => <TouchableHighlight className={""}><MusuemOviewCard
                              title={item.museum} events={item.events}/></TouchableHighlight>}
                />
            </View>
        </SafeAreaView>
    )
}

export default MuseumOverviewList

const styles = StyleSheet.create({
    Container: {
        display: "flex",
        marginTop: 100,
        height: "auto",
        justifyContent: "center",
    },
    List: {
        backgroundColor: "white",
        height: "auto"
    }
})