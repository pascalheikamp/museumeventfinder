import {Button, Image, Pressable, StyleSheet, Text, View} from "react-native";
import Calendar from '../../../assets/calendar.png';
import Time from '../../../assets/time.png';
import Bookmark from '../../../assets/bookmark.png';
import Heart from '../../../assets/heart.png';
import BookmarkedFilled from '../../../assets/bookmark-filled.png'
import useFetch from "../../hooks/useFetch";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function EventOverviewCard({title, img, description, date, begin, end}) {

    const event = {
        title: title,
        description: description,
        date: date,
        begin: begin,
        end: end
    }

    const [isBookmarked, setIsBookmarked] = useState(false);

    async function addToBookmarkAsync() {
        try {
            let storage = await AsyncStorage.getItem("events")
            let parsedList = JSON.parse(storage)
            if (storage == null) {
                parsedList = []
            }
            parsedList.push(event);
            let stringifiedList = JSON.stringify(parsedList);
            await AsyncStorage.setItem("events", stringifiedList)
        } catch (e) {
            console.log(e)
        }

    }

    return (
        <View style={[styles.EventCard, styles.shadowProp]}>
            <Text style={styles.EventTitle}>{title}</Text>
            <Image style={styles.EventImage} source={{uri: img}}/>
            <View style={styles.InfoContainer}>
                <View style={styles.Wrapper}>
                    <Image source={Calendar}/>
                    <Text style={styles.InfoItem}>{date}</Text>
                </View>
                <View style={styles.Wrapper}>
                    <Image source={Time}/>
                    <Text style={styles.InfoItem}>{begin} - {end}</Text>
                </View>
            </View>
            <View style={styles.InfoContainer}>
            </View>
            <Text style={styles.EventDescription}>{description}</Text>
            <View style={styles.BottomSection}>
                <Pressable onPress={addToBookmarkAsync}><Image
                    source={isBookmarked ? BookmarkedFilled : Bookmark}/></Pressable>
                <Image source={Heart}/>
                <Text>0</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    EventCard: {
        paddingBottom: "5%",
        paddingLeft: "5%",
        paddingRight: "5%",
        justifyContent: "center",
        backgroundColor: "white",
    },
    BottomSection: {
        display: "flex",

        justifyContent: "flex-end"
    },
    Wrapper: {
        display: "flex",
        flexDirection: "row",
    },
    InfoContainer: {
        marginTop: "5%",
        justifyContent: "space-around",
        display: "flex",
        flexDirection: "row"
    },
    InfoItem: {
        paddingLeft: "5%"
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    EventImage: {
        width: "auto",
        marginTop: "5%",
        height: "50%"
    },
    EventTitle: {
        fontSize: "20%",
        marginTop: "7%",
        textAlign: "center"
    },
    EventDescription: {
        marginTop: "5%"
    }
})


export default EventOverviewCard;