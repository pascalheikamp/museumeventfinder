import {FlatList, SafeAreaView, View, TouchableHighlight, StyleSheet, Pressable} from "react-native"
import useFetch from "../../hooks/useFetch";
import MusuemOviewCard from "./MusuemOviewCard";

const MuseumOverviewList = ({navigation}) => {
    const museums = useFetch('https://raw.githubusercontent.com/pascalheikamp/museumeventfinder/main/musuemeventfinder-app/dutch_museum_events.json');
    const museumEvents = museums.data

    return (
        <SafeAreaView>
            <View style={styles.Container}>
                <FlatList style={styles.List}
                          data={museumEvents}
                          numColumns={1}
                          horizontal={false}
                          renderItem={({item}) => <TouchableHighlight className={""}><MusuemOviewCard navigation={navigation}
                              title={item.museum} id={item._id} img={item.image_url} long={item.longitude} lat={item.latitude} events={item.events}/></TouchableHighlight>}
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
        height: "auto"
    }
})